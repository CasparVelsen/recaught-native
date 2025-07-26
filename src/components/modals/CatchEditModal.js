import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Modal,
  Animated,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Easing,
  FlatList,
  Keyboard,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../../../assets/colors/Colors";
import Typography from "../../../assets/fonts/Typography";
import TimePickerInput from "../TimePickerInput";
import { selectionOptions } from "../../utils/selectionOptions";

const fieldLabels = {
  species: "Art",
  bait: "Fliege",
  length: "Länge",
  weight: "Gewicht",
  time: "Uhrzeit",
  location: "Ort",
  notes: "Notizen",
};

export default function CatchEditModal({
  visible,
  catchForm,
  onChange,
  onClose,
  onDelete,
  onSave,
}) {
  const slideAnim = useRef(new Animated.Value(300)).current;
  const speciesSlideAnim = useRef(new Animated.Value(300)).current;
  const [speciesModalOpen, setSpeciesModalOpen] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customSpecies, setCustomSpecies] = useState("");

  const openSpeciesModal = () => {
    setSpeciesModalOpen(true);
    Animated.timing(speciesSlideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const closeSpeciesModal = () => {
    Keyboard.dismiss();
    Animated.timing(speciesSlideAnim, {
      toValue: 300,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setSpeciesModalOpen(false));
  };

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalContent,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={styles.modalHeader}>
            <Pressable onPress={onClose} style={styles.modalClose}>
              <Ionicons name="close" size={24} color={Colors.gray} />
            </Pressable>
            <Text style={styles.modalTitle}>Fang bearbeiten</Text>
            <View style={styles.modalSpacer} />
          </View>

          <ScrollView>
            {/* Species and Bait */}
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Art</Text>
                <Pressable
                  style={styles.selectInput}
                  onPress={openSpeciesModal}
                >
                  <Text style={styles.selectText}>
                    {catchForm.species || "Art auswählen"}
                  </Text>
                </Pressable>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Fliege</Text>
                <TextInput
                  style={styles.input}
                  value={catchForm.bait?.toString() || ""}
                  onChangeText={(text) => onChange("bait", text)}
                />
              </View>
            </View>

            {/* Length, Weight & Time */}
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Länge</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={catchForm.length?.toString() || ""}
                  onChangeText={(text) => onChange("length", text)}
                  placeholder="cm"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Gewicht</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={catchForm.weight?.toString() || ""}
                  onChangeText={(text) => onChange("weight", text)}
                  placeholder="kg"
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Uhrzeit</Text>
                <TimePickerInput
                  value={catchForm.time}
                  onChange={(val) => onChange("time", val)}
                />
              </View>
            </View>

            {/* Location and Taken */}
            <View style={styles.row}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Fangplatz</Text>
                <TextInput
                  style={styles.input}
                  value={catchForm.location?.toString() || ""}
                  onChangeText={(text) => onChange("location", text)}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{""}</Text>
                <Pressable
                  style={[
                    styles.toggleTaken,
                    catchForm.taken && { borderColor: Colors.accent },
                  ]}
                  onPress={() => onChange("taken", !catchForm.taken)}
                >
                  <Text
                    style={[
                      styles.toggleText,
                      catchForm.taken && { color: Colors.accent },
                    ]}
                  >
                    {catchForm.taken ? "✓ Entnommen" : "✗ Zurückgesetzt"}
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* Notes */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Notizen</Text>
              <TextInput
                style={styles.input}
                multiline
                value={catchForm.notes?.toString() || ""}
                onChangeText={(text) => onChange("notes", text)}
              />
            </View>

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  { borderWidth: 1, borderColor: Colors.accent },
                ]}
                onPress={onDelete}
              >
                <Text
                  style={[styles.modalButtonText, { color: Colors.accent }]}
                >
                  Löschen
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  { borderWidth: 1, borderColor: Colors.primary },
                ]}
                onPress={onSave}
              >
                <Text
                  style={[styles.modalButtonText, { color: Colors.primary }]}
                >
                  Speichern
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          {speciesModalOpen && (
            <Modal transparent animationType="none" visible={speciesModalOpen}>
              <Pressable
                style={styles.selectOverlay}
                onPress={closeSpeciesModal}
              />
              <Animated.View
                style={[
                  styles.selectContent,
                  { transform: [{ translateY: speciesSlideAnim }] },
                ]}
              >
                <FlatList
                  data={selectionOptions.germanFishSpecies}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <Pressable
                      style={styles.modalItem}
                      onPress={() => {
                        onChange("species", item);
                        closeSpeciesModal();
                      }}
                    >
                      <Text style={styles.modalItemText}>{item}</Text>
                    </Pressable>
                  )}
                />
                <Pressable
                  style={styles.modalItem}
                  onPress={() => setShowCustomInput(true)}
                >
                  <Text
                    style={[styles.modalItemText, { color: Colors.accent }]}
                  >
                    + Eigene Art hinzufügen
                  </Text>
                </Pressable>
                {showCustomInput && (
                  <View style={{ padding: 16 }}>
                    <TextInput
                      placeholder="Eigene Art eingeben"
                      value={customSpecies}
                      onChangeText={setCustomSpecies}
                      style={styles.input}
                    />
                    <Pressable
                      style={[
                        styles.modalButton,
                        {
                          marginTop: 10,
                          borderWidth: 1,
                          borderColor: Colors.accent,
                        },
                      ]}
                      onPress={() => {
                        if (!customSpecies.trim()) return;
                        onChange("species", customSpecies.trim());
                        setCustomSpecies("");
                        setShowCustomInput(false);
                        closeSpeciesModal();
                      }}
                    >
                      <Text
                        style={[
                          styles.modalButtonText,
                          { color: Colors.accent },
                        ]}
                      >
                        Hinzufügen
                      </Text>
                    </Pressable>
                  </View>
                )}
              </Animated.View>
            </Modal>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 20,
    maxHeight: "60%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  modalClose: {
    padding: 4,
  },
  modalTitle: {
    ...Typography.h3,
    color: Colors.primary,
  },
  modalSpacer: {
    width: 24,
  },
  row: { flexDirection: "row", gap: 16 },
  inputGroup: { flex: 1, marginBottom: 16 },
  label: { ...Typography.body, color: Colors.primary, marginBottom: 6 },
  modalInput: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    ...Typography.body,
    color: "#ccc",
    backgroundColor: Colors.white,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    color: "#ccc",
  },
  selectInput: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  selectText: { color: "#ccc" },
  toggleTaken: {
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  toggleText: { color: Colors.primary, fontWeight: "500" },
  modalText: {
    ...Typography.body,
    textAlign: "center",
    color: "#ccc",
  },
  modalButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
  },
  modalButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  modalButtonText: {
    ...Typography.button,
  },
  selectOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)" },
  selectContent: {
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
  modalItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: "#eee" },
  modalItemText: { fontSize: 16, color: Colors.primary, textAlign: "center" },
});
