import React from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import Colors from "../../../assets/colors/Colors"; // Importiere deine Farben
import Typography from "../../../assets/fonts/Typography"; // Importiere deine Typografie
import { selectionOptions } from "../../utils/selectionOptions"; // Dein Auswahloptionen-Modul
import InputPicker from "../InputPicker";

const API_BASE_URL = "http://10.116.131.241:3000"; // Stelle sicher, dass dies die richtige IP-Adresse des Servers ist

export default function Step2({ data, onChange }) {

  // Funktion, um Wetterdaten vom Server zu holen
  const fetchWeatherData = async () => {
    try {
      // Berechtigungen für Geolocation anfordern
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Fehler", "Standortberechtigungen wurden nicht gewährt.");
        return;
      }

      // Geolocation abrufen
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      console.log("Standortdaten:", { latitude, longitude });

      // API-Anfrage an den Backend-Server
      const response = await fetch(`${API_BASE_URL}/api/external-weather`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude,
          longitude,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Fehler beim Abrufen der Wetterdaten");
      }

      // Die zurückgegebenen Wetterdaten an das Eltern-Component weitergeben
      onChange(data);
    } catch (error) {
      console.error("Fehler beim Abrufen der Wetterdaten:", error);
      Alert.alert("Fehler", `Fehler: ${error.message}`);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Wetterbedingungen:</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Wetter</Text>
        <InputPicker
          value={data.weather}
          onChange={(v) => onChange({ weather: v })}
          options={selectionOptions.weather}
          placeholder="Wetter auswählen"
        />
      </View>

      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Temperatur</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(data.temperature || "")}
            placeholder="°C"
            onChangeText={(v) =>
              onChange({ temperature: Number(v.replace(",", ".")) })
            }
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Luftdruck</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(data.airpressure || "")}
            placeholder="hPa"
            onChangeText={(v) =>
              onChange({ airpressure: Number(v.replace(",", ".")) })
            }
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Windrichtung</Text>
          <InputPicker
            value={data.wind}
            onChange={(v) => onChange({ wind: v })}
            options={selectionOptions.wind}
            placeholder="Windrichtung auswählen"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Windgeschwindigkeit</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(data.windspeed || "")}
            placeholder="km/h"
            onChangeText={(v) =>
              onChange({ windspeed: Number(v.replace(",", ".")) })
            }
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Mondphase</Text>
        <InputPicker
          value={data.moon}
          onChange={(v) => onChange({ moon: v })}
          options={selectionOptions.moon}
          placeholder="Mondphase auswählen"
        />
      </View>

      {/* Button zum Abrufen der Wetterdaten */}
      <Pressable style={styles.weatherButton} onPress={fetchWeatherData}>
        <Text style={styles.weatherButtonText}>
          Aktuelle Wetterdaten abrufen
        </Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
  },
  title: {
    ...Typography.h2,
    color: Colors.primary,
    marginBottom: 26,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  inputGroup: {
    flex: 1,
  },

  label: {
    ...Typography.body,
    color: Colors.primary,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    color: "#bbb",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  weatherButton: {
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  weatherButtonText: {
    color: Colors.accent,
    textAlign: "center",
    ...Typography.button,
  },
});
