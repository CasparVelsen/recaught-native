import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "../../assets/colors/Colors";
import Typography from "../../assets/fonts/Typography";

export default function DatePickerInput({ value, onChange }) {
  const [isVisible, setIsVisible] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const selectedDate = value ? new Date(value) : new Date();

  const confirmDate = (date) => {
    const iso = date.toISOString().split("T")[0];
    onChange(iso);
    setIsVisible(false);
  };

  const handleSelect = (event, date) => {
    const isConfirmed = event?.type === "set";

    if (Platform.OS === "android") {
      setIsVisible(false);
      if (isConfirmed && date) {
        confirmDate(date);
      }
    }

    if (Platform.OS === "ios" && date) {
      setTempDate(date); // nur setzen, kein confirm hier
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.input}
        onPress={() => {
          setTempDate(selectedDate); // vorher gewähltes Datum setzen
          setIsVisible(true);
        }}
      >
        <Text style={styles.inputText}>
          {value ? new Date(value).toLocaleDateString("de-DE") : "Datum wählen"}
        </Text>
      </TouchableOpacity>

      {/* iOS Modal mit inline Picker und "Datum übernehmen" */}
      {isVisible && Platform.OS === "ios" && (
        <Modal transparent animationType="fade" visible={isVisible}>
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setIsVisible(false)}
          />
          <View style={styles.modalContent}>
            <DateTimePicker
              mode="date"
              display="inline"
              value={tempDate}
              onChange={handleSelect}
              maximumDate={new Date()}
              themeVariant="light"
              locale="de-DE"
              accentColor={Colors.primary}
            />
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => confirmDate(tempDate)}
            >
              <Text style={styles.confirmText}>Datum übernehmen</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      {/* Android Date Picker */}
      {isVisible && Platform.OS === "android" && (
        <DateTimePicker
          mode="date"
          display="default"
          value={selectedDate}
          onChange={handleSelect}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 10,
  },
  inputText: {
    color: "#bbb",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  confirmButton: {
    marginVertical: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    width: "85%",
  },
  confirmText: {
    ...Typography.button,
    color: Colors.primary,
    textAlign: "center",
  },
});
