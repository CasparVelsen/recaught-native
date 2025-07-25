import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Alert,
  Modal,
  Animated,
  StyleSheet,
  Keyboard,
} from "react-native";
import Colors from "../../../assets/colors/Colors";
import Typography from "../../../assets/fonts/Typography";
import { selectionOptions } from "../../utils/selectionOptions";

export default function Step4({ data, onChange }) {
  const [catchForm, setCatchForm] = useState({
    species: "",
    length: "",
    weight: "",
    bait: "",
    location: "",
    notes: "",
    taken: false,
  });

  const [customSpecies, setCustomSpecies] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  const openModal = () => {
    setModalOpen(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Keyboard.dismiss();
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setModalOpen(false);
    });
  };

  const addCatch = () => {
    if (!catchForm.species) return;

    const newCatch = {
      ...catchForm,
      _id: Date.now(),
      length:
        catchForm.length.trim() === "" ? null : parseFloat(catchForm.length),
      weight:
        catchForm.weight.trim() === "" ? null : parseFloat(catchForm.weight),
    };

    onChange({ catches: [...(data.catches || []), newCatch] });

    setCatchForm({
      species: "",
      length: "",
      weight: "",
      bait: "",
      location: "",
      notes: "",
      taken: false,
    });
  };

  const removeCatch = (id) => {
    Alert.alert("Fang löschen", "Fang wirklich entfernen?", [
      { text: "Abbrechen", style: "cancel" },
      {
        text: "Löschen",
        style: "destructive",
        onPress: () => {
          const updated = data.catches.filter((c) => c._id !== id);
          onChange({ catches: updated });
        },
      },
    ]);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Fänge hinzufügen</Text>

      {/* Art und Bait */}
      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Art</Text>
          <Pressable style={styles.selectInput} onPress={openModal}>
            <Text style={styles.selectText}>
              {catchForm.species || "Art auswählen"}
            </Text>
          </Pressable>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Fliege</Text>
          <TextInput
            style={styles.input}
            value={catchForm.bait}
            onChangeText={(v) => setCatchForm((prev) => ({ ...prev, bait: v }))}
          />
        </View>
      </View>

      {/* Länge & Gewicht */}
      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Länge</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={catchForm.length}
            onChangeText={(v) =>
              setCatchForm((prev) => ({ ...prev, length: v }))
            }
            placeholder="cm"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gewicht</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={catchForm.weight}
            onChangeText={(v) =>
              setCatchForm((prev) => ({ ...prev, weight: v }))
            }
            placeholder="kg"
          />
        </View>
      </View>

      {/* Location und Taken */}
      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Fangplatz</Text>
          <TextInput
            style={styles.input}
            value={catchForm.location}
            onChangeText={(v) =>
              setCatchForm((prev) => ({ ...prev, location: v }))
            }
          />
        </View>
        <View>
          <Text style={styles.label}>{""}</Text>
          <Pressable
            style={[
              styles.toggleTaken,
              catchForm.taken && {
                borderColor: Colors.accent,
              },
            ]}
            onPress={() =>
              setCatchForm((prev) => ({ ...prev, taken: !prev.taken }))
            }
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
          value={catchForm.notes}
          onChangeText={(v) => setCatchForm((prev) => ({ ...prev, notes: v }))}
        />
      </View>

      {/* Add Catch Button */}
      <Pressable
        style={[
          styles.addButton,
          !catchForm.species && styles.addButtonDisabled,
        ]}
        onPress={addCatch}
        disabled={!catchForm.species}
      >
        <Text style={styles.addButtonText}>+ Fang hinzufügen</Text>
      </Pressable>

      {/* Catch List */}
      <FlatList
        data={data.catches}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={{ paddingTop: 20 }}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <Pressable
            style={styles.catchItem}
            onPress={() => removeCatch(item._id)}
          >
            <Text style={styles.catchText}>{item.species}</Text>
            {item.length != null && (
              <Text style={styles.catchText}>{item.length} cm</Text>
            )}
            <Text style={styles.catchText}>
              {item.taken ? "Entnommen" : "Zurückgesetzt"}
            </Text>
          </Pressable>
        )}
      />

      {/* Modal */}
      {modalOpen && (
        <Modal transparent animationType="none" visible={modalOpen}>
          <Pressable style={styles.modalOverlay} onPress={closeModal} />
          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            <FlatList
              data={selectionOptions.germanFishSpecies}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.modalItem}
                  onPress={() => {
                    setCatchForm((prev) => ({ ...prev, species: item }));
                    closeModal();
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
              <Text style={[styles.modalItemText, { color: Colors.accent }]}>
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
                  style={[styles.addButton, { marginTop: 10 }]}
                  onPress={() => {
                    if (!customSpecies.trim()) return;
                    setCatchForm((prev) => ({
                      ...prev,
                      species: customSpecies.trim(),
                    }));
                    setCustomSpecies("");
                    setShowCustomInput(false);
                    closeModal();
                  }}
                >
                  <Text style={styles.addButtonText}>Hinzufügen</Text>
                </Pressable>
              </View>
            )}
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
    gap: 16,
  },
  inputGroup: {
    flex: 1,
    marginBottom: 16,
  },
  label: {
    ...Typography.body,
    color: Colors.primary,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 14,
    color: "#ccc",
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
  toggleTaken: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  toggleText: {
    color: Colors.primary,
    fontWeight: "500",
  },
  addButton: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 10,
  },
  addButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
  addButtonDisabled: {
    backgroundColor: Colors.gray,
  },
  catchItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  catchText: {
    color: Colors.secondary,
    fontSize: 16,
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
