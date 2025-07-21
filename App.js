import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginPage from "./src/screens/LoginPage";
import SignupPage from "./src/screens/SignupPage";
import BottomNav from "./src/navigation/BottomNav";

const Stack = createNativeStackNavigator();

export default function App() {
  const [token, setToken] = useState(123);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token !== null ? (
          <Stack.Screen name="HomeTabs" options={{ headerShown: false }}>
            {() => <BottomNav token={token} />}
          </Stack.Screen>
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
