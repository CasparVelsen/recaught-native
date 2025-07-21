import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const initialCredentials = {
  username: "",
  password: "",
};

export default function LoginPage({ onLogin }) {
  const [credentials, setCredentials] = useState(initialCredentials);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleOnChange = (name, value) => {
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onLogin(credentials);
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
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
    backgroundColor: "#FFFCF8",
    flexGrow: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#A2C36C",
  },
  subtitle: {
    fontSize: 18,
    color: "#A2C36C",
    marginTop: 10,
  },
  form: {
    marginTop: 20,
    borderWidth: 0.5,
    borderColor: "#A2C36C",
    borderRadius: 10,
    padding: 16,
    backgroundColor: "#FFFCF8",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#FF9C27",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: "#333",
    backgroundColor: "white",
  },
  buttonContainer: {
    alignItems: "flex-end",
  },
  loginButton: {
    backgroundColor: "#A2C36C",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  signUp: {
    marginTop: 20,
    alignItems: "center",
  },
  signUpText: {
    color: "#A2C36C",
    fontSize: 16,
  },
  signUpButton: {
    marginTop: 10,
    backgroundColor: "#FF9C27",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  signUpButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
