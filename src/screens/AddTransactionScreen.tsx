import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";

export default function AddTransactionScreen({
  route,
  navigation,
}: any) {
  const existingTransaction = route?.params?.transaction;

  const isEditMode = !!existingTransaction;

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [member, setMember] = useState("");
  const [type, setType] = useState<"income" | "expense">(
    "expense"
  );

  useEffect(() => {
    if (existingTransaction) {
      setAmount(existingTransaction.amount.toString());
      setCategory(existingTransaction.category);
      setMember(existingTransaction.member);
      setType(existingTransaction.type);
    }
  }, [existingTransaction]);

  const handleSave = () => {
    const newTransaction = {
      id: isEditMode
        ? existingTransaction.id
        : Date.now().toString(),
      amount: Number(amount),
      category,
      member,
      type,
      date: new Date().toISOString().split("T")[0],
    };

    console.log("Saved:", newTransaction);

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {isEditMode ? "Edit Transaction" : "Add Transaction"}
      </Text>

      {/* Amount */}
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter amount"
      />

      {/* Category */}
      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Enter category"
      />

      {/* Member */}
      <Text style={styles.label}>Member</Text>
      <TextInput
        style={styles.input}
        value={member}
        onChangeText={setMember}
        placeholder="Enter member name"
      />

      {/* Type Toggle */}
      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            type === "expense" && styles.activeExpense,
          ]}
          onPress={() => setType("expense")}
        >
          <Text
            style={[
              styles.toggleText,
              type === "expense" && { color: "white" },
            ]}
          >
            Expense
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            type === "income" && styles.activeIncome,
          ]}
          onPress={() => setType("income")}
        >
          <Text
            style={[
              styles.toggleText,
              type === "income" && { color: "white" },
            ]}
          >
            Income
          </Text>
        </TouchableOpacity>
      </View>

      {/* Save */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveText}>
          {isEditMode ? "Update Transaction" : "Save Transaction"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },

  title: {
    ...typography.title,
    marginBottom: spacing.lg,
  },

  label: {
    marginBottom: spacing.sm,
    fontWeight: "600",
  },

  input: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },

  toggleRow: {
    flexDirection: "row",
    marginBottom: spacing.lg,
  },

  toggleButton: {
    flex: 1,
    padding: spacing.md,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: colors.card,
    marginRight: spacing.sm,
  },

  activeExpense: {
    backgroundColor: colors.danger,
  },

  activeIncome: {
    backgroundColor: colors.success,
  },

  toggleText: {
    fontWeight: "600",
  },

  saveButton: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: 16,
    alignItems: "center",
  },

  saveText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
