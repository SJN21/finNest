import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";
import { typography } from "../theme/typography";

interface Member {
  id: string;
  name: string;
  relation: string;
  avatar: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export default function MembersScreen() {
  const [email, setEmail] = useState("");
  const [searched, setSearched] = useState(false);
  const [foundUser, setFoundUser] = useState<User | null>(null);

  const [members, setMembers] = useState<Member[]>([
    {
      id: "1",
      name: "Jainam",
      relation: "Self",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
  ]);

  // Mock system users
  const mockUsers: User[] = [
    {
      id: "2",
      name: "Priyam",
      email: "priyam@email.com",
      avatar: "https://i.pravatar.cc/150?img=67",
    },
  ];

  const handleSearch = () => {
    if (!email.trim()) return;

    // 1️⃣ Check if already in family
    const alreadyExists = members.some(
      (m) =>
        m.name.toLowerCase() ===
        email.split("@")[0]?.toLowerCase()
    );

    if (alreadyExists) {
      Alert.alert(
        "Already Added",
        "This user is already in your family."
      );
      return;
    }

    // 2️⃣ Continue normal search
    setSearched(true);

    const user = mockUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    setFoundUser(user || null);
  };


  const handleAddMember = () => {
    if (!foundUser) return;

    const alreadyExists = members.some(
      (m) => m.id === foundUser.id
    );

    if (alreadyExists) {
      Alert.alert("Already Added", "This member is already in your family.");
      return;
    }

    const newMember: Member = {
      id: foundUser.id,
      name: foundUser.name,
      relation: "Family",
      avatar: foundUser.avatar,
    };

    setMembers([...members, newMember]);
    setEmail("");
    setSearched(false);
    setFoundUser(null);
  };

  const handleInvite = () => {
    Alert.alert("Invite Sent", "Invitation email sent.");
  };

  const removeMember = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Search Section */}
      {/* Add Member Section */}
      <Text style={styles.sectionTitle}>Add Family Member</Text>

      <View style={styles.searchBar}>
        <Ionicons
          name="search"
          size={18}
          color={colors.textSecondary}
        />

        <TextInput
          placeholder="Enter email address"
          value={email}
          onChangeText={setEmail}
          style={styles.searchInput}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity onPress={handleSearch}>
          <Ionicons
            name="arrow-forward-circle"
            size={26}
            color={colors.primary}
          />
        </TouchableOpacity>

      </View>
        {/* Search Result */}
        {searched && foundUser && (
          <View style={styles.resultCard}>
            <View style={styles.memberLeft}>
              <Image
                source={{ uri: foundUser.avatar }}
                style={styles.avatar}
              />
              <Text style={styles.memberName}>{foundUser.name}</Text>
            </View>

            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddMember}
            >
              <Text style={{ color: "white", fontWeight: "600" }}>
                Add
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {searched && !foundUser && (
          <TouchableOpacity
            style={styles.inviteButton}
            onPress={handleInvite}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>
              Invite Member
            </Text>
          </TouchableOpacity>
        )}

      {/* Divider */}
      <View style={styles.divider} />

      {/* Members List */}
      <Text style={styles.sectionTitle}>Your Family</Text>

      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.memberCard}>
            <View style={styles.memberLeft}>
              <Image
                source={{ uri: item.avatar }}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.memberName}>{item.name}</Text>
                <Text style={styles.memberRelation}>
                  {item.relation}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => removeMember(item.id)}
            >
              <Ionicons
                name="trash-outline"
                size={20}
                color={colors.danger}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.lg,
    elevation: 2,
  },

  searchInput: {
    flex: 1,
    marginHorizontal: spacing.sm,
  },

  sectionTitle: {
    ...typography.sectionTitle,
    marginBottom: spacing.sm,
  },

  searchContainer: {
    flexDirection: "row",
    marginBottom: spacing.md,
  },

  input: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
  },

  searchButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: spacing.lg,
  },

  memberCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  memberLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22,
    marginRight: spacing.md,
  },

  memberName: {
    fontWeight: "600",
    color: colors.textPrimary,
  },

  memberRelation: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 12,
  },
  resultCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
    elevation: 2,
  },

  inviteButton: {
    backgroundColor: colors.primaryDark,
    padding: spacing.md,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: spacing.md,
  },
});
