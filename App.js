import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import BottomNav from "./src/navigation/BottomNav";

const Stack = createNativeStackNavigator();

const API_BASE_URL = "http://10.116.131.241:3000";

export default function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [cards, setCards] = useState([]);

  const handleLogin = async (credentials) => {
    console.log(credentials);
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok || !data.token) {
        throw new Error(data.message || "Login fehlgeschlagen");
      }

      setToken(data.token);
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    if (!token) return;

    const fetchProfileAndCards = async () => {
      try {
        const profileRes = await fetch(`${API_BASE_URL}/api/users/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const profileData = await profileRes.json();

        if (!profileRes.ok || !profileData._id) {
          console.error("Fehler beim Laden des Profils:", profileData);
          return;
        }

        setProfile(profileData);

        const cardsRes = await fetch(
          `${API_BASE_URL}/api/cards?author=${profileData._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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

    fetchProfileAndCards();
  }, [token]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token ? (
          <Stack.Screen name="HomeTabs">
            {() => <BottomNav token={token} profile={profile} cards={cards} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login">
              {() => <LoginScreen onLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
