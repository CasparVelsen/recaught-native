import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Beispielbildschirm-Komponenten (Platzhalter)
import HomePage from "./src/screens/HomePage";
import FormPage from "./src/screens/FormPage";
import ProfilePage from "./src/screens/ProfilePage";
import LoginPage from "./src/screens/LoginPage";
import SignupPage from "./src/screens/SignupPage";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); // Bottom Tab Navigator erstellen

export default function App() {
  const [token, setToken] = useState(123);

  // Funktion, die den Tab-Navigator für eingeloggte Benutzer zurückgibt
  function HomeTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" options={{ headerShown: false }}>
          {() => <HomePage profile="test" />}
        </Tab.Screen>
        <Tab.Screen
          name="Form"
          options={{ headerShown: false }}
          component={FormPage}
        />
        <Tab.Screen name="Profile" options={{ headerShown: false }}>
          {() => <ProfilePage token={token} profile="test" />}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token !== null ? (
          <Stack.Screen
            name="HomeTabs"
            component={HomeTabs}
            options={{ headerShown: false }}
          />
        ) : token === 0 ? (
          <>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Signup" component={SignupPage} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Signup" component={SignupPage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
