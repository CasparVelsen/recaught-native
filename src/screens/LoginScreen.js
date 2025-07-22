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

const API_BASE_URL = "http://10.116.131.241:3000";

export default function LoginScreen({ onLoginSuccess }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleOnChange = (name, value) => {
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
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

      onLoginSuccess(data.token);
    } catch (error) {
      Alert.alert(
        "Login fehlgeschlagen",
        error.message || "Fehler beim Login."
      );
    } finally {
      setLoading(false);
    }
  };

  const disabled =
    credentials.username.trim() === "" || credentials.password.trim() === "";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>
          You have to login first to see your data
        </Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Your user name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your user name"
              onChangeText={(value) => handleOnChange("username", value)}
              value={credentials.username}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
              onChangeText={(value) => handleOnChange("password", value)}
              value={credentials.password}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.loginButton,
                (disabled || loading) && styles.disabledButton,
              ]}
              onPress={handleSubmit}
              disabled={disabled || loading}
            >
              <Text style={styles.loginText}>
                {loading ? "Logging in..." : "Login"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.signUp}>
          <Text style={styles.signUpText}>You don't have an account yet?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <View style={styles.signUpButton}>
              <Text style={styles.signUpButtonText}>Sign up now</Text>
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
