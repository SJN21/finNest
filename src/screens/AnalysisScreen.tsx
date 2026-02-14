import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  LineChart,
  PieChart,
  BarChart,
} from "react-native-chart-kit";

import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";

const screenWidth = Dimensions.get("window").width;

export default function AnalysisScreen() {
  // 📊 Monthly Expense Trend
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        data: [12000, 15000, 10000, 18000, 14000],
      },
    ],
  };

  // 🥧 Category Distribution
  const pieData = [
    {
      name: "Food",
      amount: 8000,
      color: "#3B82F6",
      legendFontColor: "#334155",
      legendFontSize: 12,
    },
    {
      name: "Transport",
      amount: 4000,
      color: "#10B981",
      legendFontColor: "#334155",
      legendFontSize: 12,
    },
    {
      name: "Shopping",
      amount: 6000,
      color: "#F59E0B",
      legendFontColor: "#334155",
      legendFontSize: 12,
    },
  ];

  // 📊 Income vs Expense
  const barData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [60000, 45000],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: colors.card,
    backgroundGradientTo: colors.card,
    decimalPlaces: 0,
    color: (opacity = 1) =>
      `rgba(59,130,246, ${opacity})`,
    labelColor: () => colors.textPrimary,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Financial Analysis</Text>

      {/* Line Chart */}
      <Text style={styles.sectionTitle}>
        Monthly Expense Trend
      </Text>
      <LineChart
        data={lineData}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />

      {/* Pie Chart */}
      <Text style={styles.sectionTitle}>
        Expense by Category
      </Text>
      <PieChart
        data={pieData}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      {/* Bar Chart */}
      <Text style={styles.sectionTitle}>
        Income vs Expense
      </Text>
      <BarChart
        data={barData}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        style={styles.chart}
      />
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

  sectionTitle: {
    fontWeight: "600",
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
    color: colors.textPrimary,
  },

  chart: {
    borderRadius: 16,
  },
});
