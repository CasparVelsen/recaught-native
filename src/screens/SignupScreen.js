// SignupPage.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../assets/colors/Colors";

const initialForm = {
  firstname: "",
  lastname: "",
  username: "",
  password: "",
};

const API_BASE_URL = "http://10.116.131.241:3000";

export default function SignupPage({ onLoginSuccess }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleOnChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // 1. Signup
      const res = await fetch(`${API_BASE_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registrierung fehlgeschlagen");
      }

      // 2. Direct Login after Signup
      const loginRes = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });

      const loginData = await loginRes.json();

      if (!loginRes.ok || !loginData.token) {
        throw new Error(
          loginData.message || "Automatischer Login fehlgeschlagen"
        );
      }

      // 3. Token setzen
      onLoginSuccess(loginData.token);
    } catch (err) {
      Alert.alert("Fehler", err.message);
    } finally {
      setLoading(false);
    }
  };

  const disabled = Object.values(form).some((v) => v.trim() === "") || loading;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Registrieren</Text>
        <Text style={styles.subtitle}>Jetzt kostenlos registrieren</Text>

        <View style={styles.form}>
          {["firstname", "lastname", "username", "password"].map((field, i) => (
            <View style={styles.inputGroup} key={field}>
              <Text style={styles.label}>
                {field === "firstname"
                  ? "Vorname"
                  : field === "lastname"
                  ? "Nachname"
                  : field === "username"
                  ? "Benutzername"
                  : "Passwort"}
              </Text>
              <TextInput
                style={styles.input}
                placeholder={`${
                  field === "password" ? "Passwort" : "Dein " + field
                }`}
                value={form[field]}
                onChangeText={(value) => handleOnChange(field, value)}
                secureTextEntry={field === "password"}
                autoCapitalize={field === "username" ? "none" : "words"}
              />
            </View>
          ))}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.loginButton, disabled && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={disabled}
            >
              <Text style={styles.loginText}>
                {loading ? "Wird erstellt..." : "Konto erstellen"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.signUp}>
          <Text style={styles.signUpText}>Schon registriert?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <View style={styles.signUpButton}>
              <Text style={styles.signUpButtonText}>Zum Login</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 16,
    paddingBottom: 100,
    backgroundColor: Colors.white,
    flexGrow: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.primary,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.secondary,
    marginTop: 10,
  },
  form: {
    marginTop: 20,
    borderWidth: 0.5,
    borderColor: Colors.secondary,
    borderRadius: 10,
    padding: 16,
    backgroundColor: Colors.background,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: Colors.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.secondary,
    color: Colors.primary,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: Colors.white,
  },
  buttonContainer: {
    alignItems: "flex-end",
  },
  loginButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  disabledButton: {
    backgroundColor: Colors.gray,
  },
  loginText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  signUp: {
    marginTop: 20,
    alignItems: "center",
  },
  signUpText: {
    color: Colors.secondary,
    fontSize: 16,
  },
  signUpButton: {
    marginTop: 10,
    backgroundColor: Colors.accent,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  signUpButtonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
});
