import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import BottomNav from "./src/navigation/BottomNav";
import CardDetailsScreen from "./src/screens/CardDetailsScreen";
import CatchesDetailsScreen from "./src/screens/CatchesDetailsScreen";
import FormScreen from "./src/screens/FormScreen";
import Colors from "./assets/colors/Colors";

const Stack = createNativeStackNavigator();
const API_BASE_URL = "http://10.116.131.241:3000";

export default function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!token) return;

    const loadProfile = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/users/profile`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (!res.ok || !data._id) {
          console.error("Fehler beim Laden des Profils:", data);
          return;
        }

        setProfile(data);
      } catch (error) {
        console.error("Netzwerkfehler beim Laden des Profils:", error);
      }
    };

    loadProfile();
  }, [token]);

  const theme = {
    colors: {
      primary: Colors.primary,
      accent: Colors.accent,
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {token ? (
              <>
                <Stack.Screen name="HomeTabs">
                  {() => <BottomNav token={token} profile={profile} />}
                </Stack.Screen>

                <Stack.Screen
                  name="FormScreen"
                  options={{
                    presentation: "modal",
                    headerShown: false,
                  }}
                >
                  {() => <FormScreen token={token} />}
                </Stack.Screen>

                <Stack.Screen name="CardDetails">
                  {({ route, navigation }) => (
                    <CardDetailsScreen
                      route={route}
                      navigation={navigation}
                      token={token}
                    />
                  )}
                </Stack.Screen>

                <Stack.Screen
                  name="CatchesDetails"
                  component={CatchesDetailsScreen}
                />
              </>
            ) : (
              <>
                <Stack.Screen name="Login">
                  {() => <LoginScreen onLoginSuccess={setToken} />}
                </Stack.Screen>
                <Stack.Screen name="Signup">
                  {() => <SignupScreen onLoginSuccess={setToken} />}
                </Stack.Screen>
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
