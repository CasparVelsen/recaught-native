import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../assets/colors/Colors";

// Screens
import HomePage from "../screens/HomePage";
import FormPage from "../screens/FormPage";
import ProfilePage from "../screens/ProfilePage";

const Tab = createBottomTabNavigator();

const BottomNav = ({ token }) => {
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
          } else if (route.name === "Form") {
            return (
              <View style={styles.customPlusButtonIcon}>
                <Ionicons name="add-outline" size={30} color="#fff" />
              </View>
            );
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
      <Tab.Screen name="Home">{() => <HomePage profile="test" />}</Tab.Screen>

      <Tab.Screen
        name="Form"
        component={FormPage}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />

      <Tab.Screen name="Statistics">
        {() => <ProfilePage token={token} profile="test" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={styles.customButtonContainer}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.customPlusButton}>{children}</View>
  </TouchableOpacity>
);

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
  customPlusButtonIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BottomNav;
