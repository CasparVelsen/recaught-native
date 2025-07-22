import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import BottomNav from "./src/navigation/BottomNav";
import CardDetailsScreen from "./src/screens/CardDetailsScreen";

const Stack = createNativeStackNavigator();
const API_BASE_URL = "http://10.116.131.241:3000";

export default function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (!token) return;

    const loadUserData = async () => {
      try {
        // 1. Profil laden
        const profileRes = await fetch(`${API_BASE_URL}/api/users/profile`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const profileData = await profileRes.json();
        if (!profileRes.ok || !profileData._id) {
          console.error("Fehler beim Laden des Profils:", profileData);
          return;
        }

        setProfile(profileData);

        // 2. Karten des Users laden (über Token autorisiert)
        const cardsRes = await fetch(`${API_BASE_URL}/api/cards`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const cardsData = await cardsRes.json();
        if (!cardsRes.ok) {
          console.error("Fehler beim Laden der Karten:", cardsData);
          return;
        }

        setCards(cardsData);
      } catch (error) {
        console.error("Netzwerkfehler beim Laden:", error);
      }
    };

    loadUserData();
  }, [token]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <>
            <Stack.Screen name="HomeTabs">
              {() => (
                <BottomNav token={token} profile={profile} cards={cards} />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="CardDetails"
              component={CardDetailsScreen}
              options={{ title: "Details", headerBackTitleVisible: false }}
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
  );
}
