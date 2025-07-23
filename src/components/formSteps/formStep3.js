// components/formSteps/formStep3.js
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
} from "react-native";
import Colors from "../../../assets/colors/Colors";
import Typography from "../../../assets/fonts/Typography";
import { selectionOptions } from "../../utils/selectionOptions";

export default function Step3({ data, onChange }) {
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

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Gewässerzustand:</Text>

      {/* Strecke + Wassertemperatur */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Gewässerabschnitt</Text>
        <TextInput
          style={styles.input}
          value={data.stretch || ""}
          onChangeText={(v) => onChange({ stretch: v })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Wassertemperatur</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(data.watertemp || "")}
          onChangeText={(v) =>
            onChange({ watertemp: Number(v.replace(",", ".")) })
          }
          placeholder="°C"
        />
      </View>

      {/* Wasserfarbe */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Wasserfarbe</Text>
        <Pressable
          style={styles.selectInput}
          onPress={() => openModal("watercolor")}
        >
          <Text style={styles.selectText}>
            {data.watercolor || "Wasserfarbe auswählen"}
          </Text>
        </Pressable>
      </View>

      {/* Wasserstand */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Wasserstand</Text>
        <Pressable
          style={styles.selectInput}
          onPress={() => openModal("waterlevel")}
        >
          <Text style={styles.selectText}>
            {data.waterlevel || "Wasserstand auswählen"}
          </Text>
        </Pressable>
      </View>

      {/* Modal */}
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
    marginBottom: 16,
  },
  label: {
    ...Typography.body,
    color: Colors.primary,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    color: "#333",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 14,
  },
  selectInput: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
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
});
