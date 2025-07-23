// components/DatePickerInput.js
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

export default function DatePickerInput({ value, onChange }) {
  const [isVisible, setIsVisible] = useState(false);

  const selectedDate = value ? new Date(value) : new Date();

  const handleSelect = (event, date) => {
    if (Platform.OS === "android") {
      setIsVisible(false);
    }

    if (date) {
      const iso = date.toISOString().split("T")[0]; // YYYY-MM-DD
      onChange(iso);
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.input} onPress={() => setIsVisible(true)}>
        <Text style={styles.inputText}>{value || "Datum wählen"}</Text>
      </TouchableOpacity>

      {isVisible && Platform.OS === "ios" && (
        <Modal transparent animationType="none" visible={isVisible}>
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setIsVisible(false)}
          />
          <View style={styles.modalContent}>
            <DateTimePicker
              mode="date"
              display="inline"
              value={selectedDate}
              onChange={(e, d) => {
                handleSelect(e, d);
                setIsVisible(false);
              }}
              maximumDate={new Date()}
              themeVariant="light"
              locale="de-DE"
              accentColor={Colors.primary}
            />
          </View>
        </Modal>
      )}

      {isVisible && Platform.OS === "android" && (
        <DateTimePicker
          mode="date"
          display="default"
          value={selectedDate}
          onChange={(e, d) => {
            handleSelect(e, d);
          }}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.accent,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  inputText: {
    color: "#333",
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
});
