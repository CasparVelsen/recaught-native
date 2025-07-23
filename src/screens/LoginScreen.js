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
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../assets/colors/Colors";
import Typography from "../../assets/fonts/Typography";

const API_BASE_URL = "http://10.116.131.241:3000";

export default function LoginScreen({ onLoginSuccess }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

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
          Bitte logge Dich ein, damit du deine Daten siehst.
        </Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dein Benutzername</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your user name"
              onChangeText={(value) => handleOnChange("username", value)}
              value={credentials.username}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dein Passwort</Text>
            <View style={styles.passwordInputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                onChangeText={(value) => handleOnChange("password", value)}
                value={credentials.password}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword((prev) => !prev)}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            </View>
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
                {loading ? "Einloggen..." : "Login"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.signUp}>
          <Text style={styles.signUpText}>Du hast noch keinen Account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <View style={styles.signUpButton}>
              <Text style={styles.signUpButtonText}>
                Jetzt Account erstellen
              </Text>
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
    backgroundColor: Colors.white,
  },
  container: {
    padding: 20,
    paddingBottom: 100,
    backgroundColor: Colors.white,
    flexGrow: 1,
  },
  title: {
    ...Typography.h1,
    color: Colors.primary,
  },
  subtitle: {
    ...Typography.subtitle,
    color: Colors.secondary,
    marginTop: 10,
  },
  form: {
    marginTop: 30,
    padding: 20,
    borderRadius: 16,
    backgroundColor: Colors.grayLight, // wie bei Steps
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    ...Typography.body,
    color: Colors.primary,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    paddingRight: 40, // für das Icon
    fontSize: 16,
    color: Colors.primary,
    backgroundColor: Colors.white,
  },

  buttonContainer: {
    alignItems: "flex-end",
  },
  loginButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  disabledButton: {
    backgroundColor: Colors.gray,
  },
  loginText: {
    ...Typography.button,
    color: Colors.white,
  },
  signUp: {
    marginTop: 30,
    alignItems: "center",
  },
  signUpText: {
    ...Typography.body,
    color: Colors.secondary,
  },
  signUpButton: {
    marginTop: 10,
    backgroundColor: Colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  signUpButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
  passwordInputWrapper: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    top: 7,
    padding: 4,
    zIndex: 1,
  },
});
