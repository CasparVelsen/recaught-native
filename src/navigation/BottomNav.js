import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../assets/colors/Colors";

// Screens
import HomeScreen from "../screens/HomeScreen";
import StatisticsScreen from "../screens/StatisticsScreen";

const Tab = createBottomTabNavigator();

const BottomNav = ({ token, cards, profile }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          height: 70,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 10,
        },
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "fish";
          } else if (route.name === "Statistics") {
            iconName = "stats-chart";
          }

          return iconName ? (
            <Ionicons name={iconName} size={30} color={color} />
          ) : null;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray,
      })}
    >
      <Tab.Screen name="Home">
        {() => <HomeScreen token={token} profile={profile} />}
      </Tab.Screen>

      <Tab.Screen
        name="Form"
        options={{
          tabBarButton: () => <CustomTabBarButton />,
        }}
      >
        {() => null}
      </Tab.Screen>

      <Tab.Screen name="Statistics">
        {() => (
          <StatisticsScreen token={token} profile={profile} cards={cards} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const CustomTabBarButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.customButtonContainer}
      onPress={() => navigation.navigate("FormScreen")}
      activeOpacity={0.7}
    >
      <View style={styles.customPlusButton}>
        <Ionicons name="add-outline" size={30} color="#fff" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  customButtonContainer: {
    top: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  customPlusButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.accent,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default BottomNav;
