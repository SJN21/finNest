import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";

export default function ProfileScreen({ navigation }: any) {
    const [avatar, setAvatar] = useState(
    "https://i.pravatar.cc/150?img=12"
  );

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Allow access to gallery.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* User Info */}
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={{ uri: avatar }} style={styles.avatar} />

          {/* Camera Overlay */}
          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={16} color="white" />
          </View>
        </TouchableOpacity>

        <Text style={styles.name}>Jainam Shah</Text>
        <Text style={styles.email}>jainam@email.com</Text>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="cash-outline" size={20} color={colors.primary} />
            <Text style={styles.rowText}>Currency</Text>
          </View>
          <Text style={styles.rowValue}>INR</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="moon-outline" size={20} color={colors.primary} />
            <Text style={styles.rowText}>Dark Mode</Text>
          </View>
          <Switch value={false} />
        </View>

        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.navigate("Members")}
        >
          <View style={styles.rowLeft}>
            <Ionicons name="people-outline" size={20} color={colors.primary} />
            <Text style={styles.rowText}>Family Members</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Data Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data</Text>

        <TouchableOpacity style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="download-outline" size={20} color={colors.primary} />
            <Text style={styles.rowText}>Export Data</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <View style={styles.rowLeft}>
            <Ionicons name="trash-outline" size={20} color={colors.danger} />
            <Text style={[styles.rowText, { color: colors.danger }]}>
              Reset Data
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },

  profileHeader: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: spacing.md,
  },

  name: {
    ...typography.title,
    color: colors.textPrimary,
  },

  email: {
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },

  editButton: {
    marginTop: spacing.md,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },

  editText: {
    color: colors.white,
    fontWeight: "600",
  },

  section: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    elevation: 3,
  },

  sectionTitle: {
    ...typography.sectionTitle,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },

  rowText: {
    marginLeft: spacing.sm,
    color: colors.textPrimary,
  },

  rowValue: {
    color: colors.textSecondary,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    padding: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.white,
    },
});
