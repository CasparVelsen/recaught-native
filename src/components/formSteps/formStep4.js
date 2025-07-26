import React, { useState, useRef, useEffect } from "react";
import { fetchCards } from "../../utils/fetchCards";
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
import TimePickerInput from "../TimePickerInput";
import Colors from "../../../assets/colors/Colors";
import Typography from "../../../assets/fonts/Typography";
import { selectionOptions } from "../../utils/selectionOptions";
import { getUniqueBaits } from "../../utils/stats";

export default function Step4({ data, onChange, token }) {
  const [catchForm, setCatchForm] = useState({
    species: "",
    length: "",
    weight: "",
    time: "",
    bait: "",
    location: "",
    notes: "",
    taken: false,
  });
  const [customSpecies, setCustomSpecies] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;
  const [baitModalOpen, setBaitModalOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [baits, setBaits] = useState([]);
  const [customBait, setCustomBait] = useState("");
  const [showCustomBaitInput, setShowCustomBaitInput] = useState(false);

  useEffect(() => {
    const load = async () => {
      const loaded = await fetchCards(token);
      setCards(loaded);
      setBaits(getUniqueBaits(loaded));
    };
    load();
  }, [token]);

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
    }).start(() => setModalOpen(false));
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
      time: "",
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
        onPress: () =>
          onChange({ catches: data.catches.filter((c) => c._id !== id) }),
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
          <Pressable
            style={styles.selectInput}
            onPress={() => {
              setBaitModalOpen(true);
              Animated.timing(slideAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
              }).start();
            }}
          >
            <Text style={styles.selectText}>
              {catchForm.bait || "Fliege auswählen"}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Länge, Gewicht & Uhrzeit */}
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
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Uhrzeit</Text>
          <TimePickerInput
            value={catchForm.time}
            onChange={(v) => setCatchForm((prev) => ({ ...prev, time: v }))}
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
        <Text
          style={[
            styles.addButtonText,
            !catchForm.species && styles.addButtonTextDisabled,
          ]}
        >
          + Fang hinzufügen
        </Text>
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

      {/* Species Selection Modal */}
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

      {/* Bait Selection Modal */}
      {baitModalOpen && (
        <Modal transparent animationType="none" visible={baitModalOpen}>
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setBaitModalOpen(false)}
          />
          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            {baits.length === 0 ? (
              <Text style={[styles.modalItemText, { textAlign: "center" }]}>
                Lade Köder...
              </Text>
            ) : (
              <FlatList
                data={baits}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.modalItem}
                    onPress={() => {
                      setCatchForm((prev) => ({ ...prev, bait: item }));
                      setBaitModalOpen(false);
                    }}
                  >
                    <Text style={styles.modalItemText}>{item}</Text>
                  </Pressable>
                )}
              />
            )}
            <Pressable
              style={styles.modalItem}
              onPress={() => setShowCustomBaitInput(true)}
            >
              <Text style={[styles.modalItemText, { color: Colors.accent }]}>
                + Neue Fliege hinzufügen
              </Text>
            </Pressable>
            {showCustomBaitInput && (
              <View style={{ padding: 16 }}>
                <TextInput
                  placeholder="Neue Fliege eingeben"
                  value={customBait}
                  onChangeText={setCustomBait}
                  style={styles.input}
                />
                <Pressable
                  style={[styles.addButton, { marginTop: 10 }]}
                  onPress={() => {
                    if (!customBait.trim()) return;
                    setCatchForm((prev) => ({
                      ...prev,
                      bait: customBait.trim(),
                    }));
                    setCustomBait("");
                    setShowCustomBaitInput(false);
                    setBaitModalOpen(false);
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
  wrapper: { paddingVertical: 10 },
  title: { ...Typography.h2, color: Colors.primary, marginBottom: 26 },
  row: { flexDirection: "row", gap: 16 },
  inputGroup: { flex: 1, marginBottom: 16 },
  label: { ...Typography.body, color: Colors.primary, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    color: "#bbb",
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
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  toggleText: { color: Colors.primary, fontWeight: "500" },
  addButton: {
    borderWidth: 1,
    borderColor: Colors.accent,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 32,
    marginBottom: 10,
  },
  addButtonDisabled: { borderColor: Colors.gray },
  addButtonText: { ...Typography.button, color: Colors.accent },
  addButtonTextDisabled: { ...Typography.button, color: Colors.gray },
  catchItem: {
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  catchText: { color: Colors.secondary, fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)" },
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
  modalItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: "#eee" },
  modalItemText: { fontSize: 16, color: Colors.primary, textAlign: "center" },
});
