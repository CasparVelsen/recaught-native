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
} from "react-native";
import Colors from "../../../assets/colors/Colors";
import Typography from "../../../assets/fonts/Typography";
import { selectionOptions } from "../../utils/selectionOptions";

const speciesOptions = [
  "Hecht",
  "Zander",
  "Barsch",
  "Karpfen",
  "Forelle",
  "Wels",
  "Aal",
];

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
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setModalOpen(false);
    });
  };

  const addCatch = () => {
    if (!catchForm.species || !catchForm.length) return;

    const newCatch = {
      ...catchForm,
      _id: Date.now(),
      length: parseFloat(catchForm.length),
      weight: parseFloat(catchForm.weight),
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

      {/* Art und Länge */}
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
          <Text style={styles.label}>Länge (cm)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={catchForm.length}
            onChangeText={(v) =>
              setCatchForm((prev) => ({ ...prev, length: v }))
            }
          />
        </View>
      </View>

      {/* Gewicht & Bait */}
      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gewicht (kg)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={catchForm.weight}
            onChangeText={(v) =>
              setCatchForm((prev) => ({ ...prev, weight: v }))
            }
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Köder</Text>
          <TextInput
            style={styles.input}
            value={catchForm.bait}
            onChangeText={(v) => setCatchForm((prev) => ({ ...prev, bait: v }))}
          />
        </View>
      </View>

      {/* Location */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Ort</Text>
        <TextInput
          style={styles.input}
          value={catchForm.location}
          onChangeText={(v) =>
            setCatchForm((prev) => ({ ...prev, location: v }))
          }
        />
      </View>

      {/* Notes */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Notizen</Text>
        <TextInput
          style={[styles.input, { minHeight: 50 }]}
          multiline
          value={catchForm.notes}
          onChangeText={(v) => setCatchForm((prev) => ({ ...prev, notes: v }))}
        />
      </View>

      {/* Taken Switch */}
      <Pressable
        style={[
          styles.toggleTaken,
          catchForm.taken && { backgroundColor: Colors.accent },
        ]}
        onPress={() =>
          setCatchForm((prev) => ({ ...prev, taken: !prev.taken }))
        }
      >
        <Text style={styles.toggleText}>
          {catchForm.taken ? "✓ Entnommen" : "✗ Zurückgesetzt"}
        </Text>
      </Pressable>

      {/* Add Catch Button */}
      <Pressable style={styles.addButton} onPress={addCatch}>
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
            <Text style={styles.catchText}>
              {item.species} – {item.length} cm
              {item.weight ? `, ${item.weight} kg` : ""} –{" "}
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
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  inputGroup: {
    flex: 1,
    marginBottom: 12,
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
    color: "#333",
  },
  selectInput: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },
  selectText: {
    color: "#333",
  },
  toggleTaken: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: Colors.accent,
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
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  catchItem: {
    padding: 12,
    backgroundColor: "#f4f4f4",
    borderRadius: 8,
    marginBottom: 10,
  },
  catchText: {
    color: Colors.primary,
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
