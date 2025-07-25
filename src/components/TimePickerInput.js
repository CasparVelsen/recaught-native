import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  Animated,
  StyleSheet,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Colors from "../../assets/colors/Colors";
import Typography from "../../assets/fonts/Typography";

export default function TimePickerInput({ value, onChange }) {
  const [show, setShow] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  // derive initial hours/minutes
  const [selectedHour, setSelectedHour] = useState("12");
  const [selectedMinute, setSelectedMinute] = useState("00");

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(":");
      setSelectedHour(h);
      setSelectedMinute(m);
    }
  }, [value]);

  const open = () => {
    setShow(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const close = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setShow(false));
  };

  const accept = () => {
    const time = `${selectedHour}:${selectedMinute}`;
    onChange(time);
    close();
  };

  // picker data
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  return (
    <>
      <Pressable style={styles.input} onPress={open}>
        <Text style={[Typography.body, { color: "#ccc" }]}>
          {value || "12:00"}
        </Text>
      </Pressable>
      {show && (
        <Modal transparent animationType="none">
          <Pressable style={styles.overlay} onPress={close} />
          <Animated.View
            style={[
              styles.pickerWrap,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedHour}
                style={styles.pickerWheel}
                itemStyle={styles.pickerItemStyle}
                onValueChange={(itemValue) => setSelectedHour(itemValue)}
              >
                {hours.map((h) => (
                  <Picker.Item key={h} label={h} value={h} />
                ))}
              </Picker>
              <Picker
                selectedValue={selectedMinute}
                style={styles.pickerWheel}
                itemStyle={styles.pickerItemStyle}
                onValueChange={(itemValue) => setSelectedMinute(itemValue)}
              >
                {minutes.map((m) => (
                  <Picker.Item key={m} label={m} value={m} />
                ))}
              </Picker>
            </View>
            <Pressable style={styles.acceptButton} onPress={accept}>
              <Text style={styles.acceptText}>Übernehmen</Text>
            </Pressable>
          </Animated.View>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    color: "#ccc",
  },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)" },
  pickerWrap: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerWheel: {
    width: 150,
    height: 200,
  },
  pickerItemStyle: {
    ...Typography.subtitle,
    color: Colors.primary,
  },
  acceptButton: {
    marginVertical: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    width: "85%",
  },
  acceptText: {
    ...Typography.button,
    color: Colors.primary,
    textAlign: "center",
  },
});
