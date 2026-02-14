import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";

export default function DashboardScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.appName}>Spendly</Text>
            <Text style={styles.subtitle}>Your financial companion</Text>
          </View>
        </View>

        {/* Balance Card */}
        <LinearGradient
          colors={[colors.primary, colors.primaryDark]}
          style={styles.balanceCard}
        >
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>₹ 45,200</Text>

          <View style={styles.balanceRow}>
            <View>
              <Text style={styles.incomeLabel}>Income</Text>
              <Text style={styles.incomeValue}>₹ 80,000</Text>
            </View>

            <View>
              <Text style={styles.expenseLabel}>Expense</Text>
              <Text style={styles.expenseValue}>₹ 34,800</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("AddTransaction")}
          >
            <Ionicons
              name="add-circle-outline"
              size={22}
              color={colors.primary}
            />
            <Text style={styles.actionText}>Add</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("Members")}
          >
            <Ionicons
              name="people-outline"
              size={22}
              color={colors.primary}
            />
            <Text style={styles.actionText}>Members</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons
              name="analytics-outline"
              size={22}
              color={colors.primary}
            />
            <Text style={styles.actionText}>Analytics</Text>
          </TouchableOpacity>
        </View>

        {/* Expenses Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Expenses Overview</Text>

          {[
            { name: "Food & Grocery", amount: 12500 },
            { name: "Transport", amount: 4800 },
            { name: "Shopping", amount: 7200 },
          ].map((item, index) => (
            <View key={index} style={styles.expenseRow}>
              <Text style={styles.expenseCategory}>{item.name}</Text>
              <Text style={styles.expenseAmount}>
                ₹ {item.amount.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: 60,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },

  appName: {
    ...typography.title,
    color: colors.textPrimary,
  },

  subtitle: {
    ...typography.subtitle,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22,
  },

  balanceCard: {
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },

  balanceLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
  },

  balanceAmount: {
    ...typography.largeAmount,
    color: colors.white,
    marginVertical: spacing.sm,
  },

  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.sm,
  },

  incomeLabel: {
    color: "rgba(255,255,255,0.8)",
  },

  incomeValue: {
    color: colors.incomeLight,
    fontWeight: "bold",
  },

  expenseLabel: {
    color: "rgba(255,255,255,0.8)",
  },

  expenseValue: {
    color: colors.expenseLight,
    fontWeight: "bold",
  },

  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },

  actionButton: {
    backgroundColor: colors.card,
    padding: spacing.md,
    borderRadius: 16,
    alignItems: "center",
    width: "30%",
    elevation: 3,
  },

  actionText: {
    marginTop: spacing.xs,
    fontSize: 12,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    elevation: 3,
  },

  cardTitle: {
    ...typography.sectionTitle,
    marginBottom: spacing.md,
    color: colors.textPrimary,
  },

  expenseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },

  expenseCategory: {
    color: colors.textSecondary,
  },

  expenseAmount: {
    fontWeight: "600",
    color: colors.textPrimary,
  },
});
