import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";

interface Transaction {
  id: string;
  member: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  date: string;
}

export default function TransactionsScreen({ navigation }: any) {
  const [periodFilter, setPeriodFilter] = useState("All");
  const [memberFilter, setMemberFilter] = useState("All");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<
    "member" | "period" | null
  >(null);

  const members = ["All", "Jainam", "Mom"];
  const periods = ["All", "Today", "Last 7 Days", "This Month"];

  const transactions: Transaction[] = [
    {
      id: "1",
      member: "Jainam",
      category: "Food",
      amount: 500,
      type: "expense",
      date: "2026-09-12",
    },
    {
      id: "2",
      member: "Jainam",
      category: "Transport",
      amount: 200,
      type: "expense",
      date: "2026-09-11",
    },
    {
      id: "3",
      member: "Mom",
      category: "Grocery",
      amount: 1200,
      type: "expense",
      date: "2026-09-12",
    },
  ];

  // 🔎 Filtering logic
  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    if (memberFilter !== "All") {
      filtered = filtered.filter((t) => t.member === memberFilter);
    }

    return filtered;
  }, [memberFilter, periodFilter]);

  // 📅 Group by Date
  const groupedByDate = Object.values(
    filteredTransactions.reduce((acc: any, tx) => {
      if (!acc[tx.date]) {
        acc[tx.date] = {
          title: tx.date,
          data: [],
        };
      }
      acc[tx.date].data.push(tx);
      return acc;
    }, {})
  ).sort((a: any, b: any) =>
    new Date(b.title).getTime() - new Date(a.title).getTime()
  );

  return (
    <View style={styles.container}>
      {/* Filters */}
      <View style={styles.filterRow}>
        <View style={styles.filterBox}>
          <Text style={styles.filterLabel}>Period</Text>
          <TouchableOpacity
            onPress={() => {
              setActiveFilter("period");
              setShowFilterModal(true);
            }}
          >
            <Text style={styles.filterValue}>{periodFilter}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterBox}>
          <Text style={styles.filterLabel}>Member</Text>
          <TouchableOpacity
            onPress={() => {
              setActiveFilter("member");
              setShowFilterModal(true);
            }}
          >
            <Text style={styles.filterValue}>{memberFilter}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Transactions */}
      <SectionList
        sections={groupedByDate}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.transactionCard}
            onPress={() =>
              navigation.navigate("AddTransaction", {
                transaction: item,
              })
            }
          >
            <View>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.member}>{item.member}</Text>
            </View>

            <Text
              style={[
                styles.amount,
                {
                  color:
                    item.type === "expense"
                      ? colors.danger
                      : colors.success,
                },
              ]}
            >
              {item.type === "expense" ? "-" : "+"} ₹{item.amount}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddTransaction")}
      >
        <Ionicons name="add" size={26} color="white" />
      </TouchableOpacity>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent
        animationType="fade"
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowFilterModal(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalContent}
            onPress={() => {}}
          >
            {(activeFilter === "member"
              ? members
              : periods
            ).map((option) => {
              const selected =
                (activeFilter === "member"
                  ? memberFilter
                  : periodFilter) === option;

              return (
                <TouchableOpacity
                  key={option}
                  style={styles.modalOption}
                  onPress={() => {
                    if (activeFilter === "member") {
                      setMemberFilter(option);
                    } else {
                      setPeriodFilter(option);
                    }
                    setShowFilterModal(false);
                  }}
                >
                  <Text
                    style={[
                      styles.modalOptionText,
                      selected && {
                        color: colors.primary,
                        fontWeight: "700",
                      },
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setShowFilterModal(false)}
            >
              <Text style={{ color: colors.danger }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },

  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },

  filterBox: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: spacing.md,
    width: "48%",
    elevation: 2,
  },

  filterLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  filterValue: {
    fontWeight: "600",
    marginTop: 4,
  },

  sectionHeader: {
    ...typography.sectionTitle,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },

  transactionCard: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: 16,
    marginBottom: spacing.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  category: {
    fontWeight: "600",
    color: colors.textPrimary,
  },

  member: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },

  amount: {
    fontWeight: "bold",
    fontSize: 16,
  },

  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },

  modalOption: {
    paddingVertical: spacing.md,
  },

  modalOptionText: {
    fontSize: 16,
    color: colors.textPrimary,
  },

  modalCancel: {
    marginTop: spacing.md,
    alignItems: "center",
  },
});
