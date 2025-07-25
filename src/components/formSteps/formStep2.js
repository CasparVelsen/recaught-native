import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
  FlatList,
  Animated,
  StyleSheet,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import Colors from "../../../assets/colors/Colors"; // Importiere deine Farben
import Typography from "../../../assets/fonts/Typography"; // Importiere deine Typografie
import { selectionOptions } from "../../utils/selectionOptions"; // Dein Auswahloptionen-Modul

const API_BASE_URL = "http://10.116.131.241:3000"; // Stelle sicher, dass dies die richtige IP-Adresse des Servers ist

export default function Step2({ data, onChange }) {
  const [modalState, setModalState] = useState({ key: null, visible: false });
  const slideAnim = useRef(new Animated.Value(300)).current;

  const openModal = (key) => {
    setModalState({ key, visible: true });
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setModalState({ key: null, visible: false });
    });
  };

  const handleSelection = (value) => {
    onChange({ [modalState.key]: value });
    closeModal();
  };

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
        <Pressable
          style={styles.selectInput}
          onPress={() => openModal("weather")}
        >
          <Text style={styles.selectText}>
            {data.weather || "Wetter auswählen"}
          </Text>
        </Pressable>
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
          <Pressable
            style={styles.selectInput}
            onPress={() => openModal("wind")}
          >
            <Text style={styles.selectText}>
              {data.wind || "Windrichtung auswählen"}
            </Text>
          </Pressable>
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
        <Pressable style={styles.selectInput} onPress={() => openModal("moon")}>
          <Text style={styles.selectText}>
            {data.moon || "Mondphase auswählen"}
          </Text>
        </Pressable>
      </View>

      {/* Button zum Abrufen der Wetterdaten */}
      <Pressable style={styles.weatherButton} onPress={fetchWeatherData}>
        <Text style={styles.weatherButtonText}>
          Aktuelle Wetterdaten abrufen
        </Text>
      </Pressable>

      {modalState.visible && (
        <Modal transparent animationType="none" visible={modalState.visible}>
          <Pressable style={styles.modalOverlay} onPress={closeModal} />
          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <FlatList
              data={selectionOptions[modalState.key]}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.modalItem}
                  onPress={() => handleSelection(item)}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </Pressable>
              )}
            />
          </Animated.View>
        </Modal>
      )}
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
  selectInput: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  selectText: {
    color: "#bbb",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    maxHeight: "50%",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingBottom: 30,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalItemText: {
    fontSize: 16,
    color: Colors.primary,
    textAlign: "center",
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
