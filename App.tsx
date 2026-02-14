import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, TouchableOpacity } from "react-native";
import { colors } from "./src/theme/colors";

import ProfileScreen from "./src/screens/ProfileScreen";
import DashboardScreen from "./src/screens/DashBoardScreen";
import AddTransactionScreen from "./src/screens/AddTransactionScreen";
import MembersScreen from "./src/screens/MembersScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          // headerStyle: {
          //   backgroundColor: colors.background,
          // },
          headerShadowVisible: false,
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 18,
            color: colors.textPrimary,
          },
          headerTintColor: colors.primary,
        }}
      >
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={({ navigation }) => ({
            title: "Dashboard",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Profile")}
                style={{ marginRight: 15 }}
              >
                <Image
                  source={{ uri: "https://i.pravatar.cc/150?img=12" }}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                  }}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
        <Stack.Screen name="Members" component={MembersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
