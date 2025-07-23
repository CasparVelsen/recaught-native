import React, { useState, useRef, useEffect } from "react";
import {
  Alert,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  FlatList,
  Pressable,
  Animated,
  Easing,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../../assets/colors/Colors";
import Typography from "../../assets/fonts/Typography";
import { translateValue } from "../../assets/language/translatedValue";
import {
  saveCardToBackend,
  deleteCardFromBackend,
} from "../components/backendHandling/backendHandling";

const selectionOptions = {
  weather: ["sonnig", "bewölkt", "regnerisch", "windig", "stürmisch", "Schnee"],
  watercolor: ["klar", "trüb", "leicht trüb"],
  moon: ["Neumond", "zunehmend", "Vollmond", "abnehmend"],
  wind: [
    "Nord",
    "Nordost",
    "Ost",
    "Südost",
    "Süd",
    "Südwest",
    "West",
    "Nordwest",
  ],
  waterlevel: ["niedrig", "normal", "hoch"],
};

const API_BASE_URL = "http://10.116.131.241:3000";

const CardDetailsScreen = ({
  route,
  navigation,
  token,
  onUpdate,
  onDelete,
}) => {
  const { card } = route.params;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...card });
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [modalState, setModalState] = useState({
    key: null,
    visible: false,
    catchIndex: null,
  });
  const [catchForm, setCatchForm] = useState(null);

  const slideAnim = useRef(new Animated.Value(300)).current;

  const toggleExpand = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toNumber = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? null : num;
  };

  const sanitizeFormData = (data) => {
    return {
      ...data,
      watertemp: toNumber(data.watertemp),
      airpressure: toNumber(data.airpressure),
      temperature: toNumber(data.temperature),
      windspeed: toNumber(data.windspeed),
      bites: toNumber(data.bites),
      lost: toNumber(data.lost),
      catches: data.catches?.map((c) => ({
        ...c,
        length: toNumber(c.length),
        weight: toNumber(c.weight),
      })),
    };
  };

  const handleSave = async () => {
    try {
      const cleanedData = sanitizeFormData(formData);
      const updatedCard = await saveCardToBackend(token, cleanedData);
      onUpdate && onUpdate(updatedCard);
      Alert.alert("Gespeichert", "Dein Eintrag wurde aktualisiert.");
    } catch (error) {
      console.error("Netzwerkfehler beim Speichern:", error);
      Alert.alert("Fehler", error.message || "Netzwerkfehler beim Speichern.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCardFromBackend(token, formData._id);
      onDelete && onDelete(formData._id);
      Alert.alert("Gelöscht", "Dein Eintrag wurde entfernt.");
      navigation.goBack();
    } catch (error) {
      console.error("Löschen fehlgeschlagen:", error);
      Alert.alert("Fehler", error.message);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("de-DE", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  useEffect(() => {
    if (modalState.visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(300);
    }
  }, [modalState.visible]);

  const renderTile = (label, value, key) => {
    if (!value && value !== 0 && !isEditing) return null;
    const translatedValue = key ? translateValue(key, value) : value;
    const options = selectionOptions[key];
    const isSelectable = isEditing && options;
    const isEditableText = isEditing && !options;

    return (
      <TouchableOpacity
        onPress={() =>
          isSelectable ? setModalState({ key, visible: true }) : null
        }
        activeOpacity={isSelectable ? 0.8 : 1}
        style={[styles.tile, isEditing && styles.tileActive]}
      >
        {isEditableText ? (
          <TextInput
            style={styles.tileValue}
            value={formData[key]?.toString() || ""}
            onChangeText={(text) => handleChange(key, text)}
          />
        ) : (
          <Text style={styles.tileValue}>{translatedValue}</Text>
        )}
        <Text style={styles.tileLabel}>{label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.accent} />
        </TouchableOpacity>
        <View style={styles.dayWrapper}>
          <View>
            <Text style={styles.info}>Erfahrungsbericht vom:</Text>
            <Text style={styles.header}>{formatDate(formData.date)}</Text>
          </View>
          <View style={styles.waterWrapper}>
            {isEditing ? (
              <>
                <Ionicons
                  name="location-outline"
                  size={24}
                  color={Colors.accent}
                />
                <TextInput
                  style={[styles.waterInfo, { color: Colors.accent }]}
                  value={formData.stretch}
                  onChangeText={(text) => handleChange("stretch", text)}
                />
                <TextInput
                  style={[styles.waterInfo, { color: Colors.accent }]}
                  value={formData.water}
                  onChangeText={(text) => handleChange("water", text)}
                />
              </>
            ) : (
              <>
                <Ionicons
                  name="location-outline"
                  size={24}
                  color={Colors.secondary}
                />
                <Text style={styles.waterInfo}>{formData.stretch}</Text>
                <Text style={styles.waterInfo}>{formData.water}</Text>
              </>
            )}
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tilesContainer}>
          {(formData.watertemp ||
            formData.watercolor ||
            formData.waterlevel) && (
            <View style={styles.tileGroup}>
              <Text style={styles.tileGroupTitle}>Gewässerdaten</Text>
              <View style={styles.tilesRow}>
                {renderTile("Wassertemp.", formData.watertemp, "watertemp")}
                {renderTile("Wasserfarbe", formData.watercolor, "watercolor")}
                {renderTile("Wasserstand", formData.waterlevel, "waterlevel")}
              </View>
            </View>
          )}
          {(formData.weather ||
            formData.airpressure ||
            formData.temperature ||
            formData.moon ||
            formData.wind ||
            formData.windspeed) && (
            <View style={styles.tileGroup}>
              <Text style={styles.tileGroupTitle}>Wetterdaten</Text>
              <View style={styles.tilesRow}>
                {renderTile("Wetter", formData.weather, "weather")}
                {renderTile("Luftdruck", formData.airpressure, "airpressure")}
                {renderTile("Temperatur", formData.temperature, "temperature")}
                {renderTile("Mondphase", formData.moon, "moon")}
                {renderTile("Windrichtung", formData.wind, "wind")}
                {renderTile("Windgeschw.", formData.windspeed, "windspeed")}
              </View>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.tileGroupTitle}>Fangstatistik</Text>
          {formData.catches?.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setCatchForm({ ...item });
                setModalState({ key: null, visible: true, catchIndex: index });
              }}
              style={[styles.catchBox, isEditing && styles.catchBoxActive]}
            >
              <View style={styles.catchWrapper}>
                <Text style={styles.catchTitle}>
                  {index + 1}. {item.species}
                </Text>
                <Text style={styles.catchLength}>{item.length} cm</Text>
                <Text style={styles.catchStatus}>
                  {item.taken ? "entnommen" : "released"}
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          <Field label="gefangen" value={formData.catches?.length} />
          <Field
            label="verloren"
            value={formData.lost}
            editableKey="lost"
            isEditing={isEditing}
            onChange={handleChange}
          />
          <Field
            label="Bisse"
            value={formData.bites}
            editableKey="bites"
            isEditing={isEditing}
            onChange={handleChange}
          />
        </View>
      </ScrollView>

      <View style={styles.editButtonContainer}>
        <TouchableOpacity
          style={[
            styles.editButton,
            { borderColor: isEditing ? Colors.accent : Colors.primary },
          ]}
          onPress={async () => {
            if (isEditing) {
              await handleSave();
            }
            setIsEditing((prev) => !prev);
          }}
        >
          <Text
            style={[
              styles.editButtonText,
              { color: isEditing ? Colors.accent : Colors.primary },
            ]}
          >
            {isEditing ? "Speichern" : "Bearbeiten"}
          </Text>
        </TouchableOpacity>

        {isEditing ? (
          <TouchableOpacity
            style={[styles.deleteButton, { backgroundColor: Colors.primary }]}
            onPress={() => setIsEditing(false)}
          >
            <Text style={styles.deleteButtonText}>Abbrechen</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() =>
              Alert.alert("Eintrag löschen?", "Bist du sicher?", [
                { text: "Abbrechen", style: "cancel" },
                {
                  text: "Löschen",
                  style: "destructive",
                  onPress: handleDelete,
                },
              ])
            }
          >
            <Text style={styles.deleteButtonText}>Löschen</Text>
          </TouchableOpacity>
        )}
      </View>

      {modalState.visible && (
        <Modal transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <Animated.View
              style={[
                styles.modalContent,
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              {modalState.catchIndex !== null && catchForm ? (
                <>
                  {[
                    "species",
                    "length",
                    "weight",
                    "bait",
                    "location",
                    "notes",
                  ].map((field) => (
                    <TextInput
                      key={field}
                      style={styles.modalInput}
                      placeholder={field}
                      value={catchForm?.[field]?.toString() || ""}
                      onChangeText={(text) =>
                        setCatchForm((prev) => ({ ...prev, [field]: text }))
                      }
                    />
                  ))}
                  <TouchableOpacity
                    style={styles.toggleTaken}
                    onPress={() =>
                      setCatchForm((prev) => ({ ...prev, taken: !prev.taken }))
                    }
                  >
                    <Text style={styles.modalText}>
                      {catchForm.taken ? "✓ Entnommen" : "✗ Zurückgesetzt"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => {
                      const updated = [...formData.catches];
                      updated[modalState.catchIndex] = { ...catchForm };
                      setFormData((prev) => ({ ...prev, catches: updated }));
                      setModalState({
                        key: null,
                        visible: false,
                        catchIndex: null,
                      });
                      setCatchForm(null);
                    }}
                  >
                    <Text style={styles.modalText}>Speichern</Text>
                  </TouchableOpacity>
                </>
              ) : modalState.key !== null ? (
                <FlatList
                  data={selectionOptions[modalState.key]}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <Pressable
                      style={styles.modalItem}
                      onPress={() => {
                        handleChange(modalState.key, item);
                        setModalState({
                          key: null,
                          visible: false,
                          catchIndex: null,
                        });
                      }}
                    >
                      <Text style={styles.modalText}>{item}</Text>
                    </Pressable>
                  )}
                />
              ) : null}

              <Pressable
                onPress={() => {
                  setModalState({
                    key: null,
                    visible: false,
                    catchIndex: null,
                  });
                  setCatchForm(null);
                }}
                style={styles.modalCancel}
              >
                <Text style={styles.modalText}>Abbrechen</Text>
              </Pressable>
            </Animated.View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

export default CardDetailsScreen;

const Field = ({ label, value, editableKey, isEditing, onChange }) => {
  if (!value && value !== 0 && !isEditing) return null;

  return (
    <View style={styles.dataRow}>
      <Text style={styles.label}>{label}:</Text>
      {isEditing && editableKey ? (
        <TextInput
          style={[styles.value, styles.input]}
          value={value?.toString() || ""}
          onChangeText={(text) => onChange(editableKey, text)}
          keyboardType="numeric"
        />
      ) : (
        <Text style={styles.value}>{value}</Text>
      )}
    </View>
  );
};

// ---------- STYLES ----------

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  backButton: {
    marginBottom: 8,
  },
  info: {
    ...Typography.subtitle,
    color: Colors.primary,
  },
  header: {
    ...Typography.h1,
    color: Colors.primary,
  },
  dayWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 5,
  },
  waterWrapper: {
    alignItems: "flex-end",
    gap: 5,
  },
  waterInfo: {
    ...Typography.body,
    color: Colors.secondary,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  tilesContainer: {
    marginBottom: 24,
    gap: 24,
  },
  tileGroupTitle: {
    ...Typography.subtitle,
    color: Colors.primary,
    marginBottom: 8,
  },
  tilesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tile: {
    width: "30%",
    borderColor: Colors.gray,
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
    marginBottom: 12,
  },
  tileActive: {
    borderColor: Colors.accent,
  },
  tileValue: {
    ...Typography.body,
    color: Colors.primary,
    marginBottom: 4,
  },
  tileLabel: {
    ...Typography.caption,
    color: Colors.secondary,
  },
  section: {
    marginBottom: 24,
  },
  dataRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  label: {
    width: "30%",
    ...Typography.body,
    color: Colors.primary,
  },
  value: {
    color: Colors.secondary,
    ...Typography.body,
  },
  input: {
    color: Colors.accent,
    minWidth: 60,
  },
  catchBox: {
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  catchWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  catchTitle: {
    color: Colors.primary,
    ...Typography.body,
    width: "30%",
  },
  catchLength: {
    color: Colors.secondary,
    ...Typography.body,
  },
  catchStatus: {
    ...Typography.caption,
    color: Colors.gray,
    width: "30%",
    textAlign: "right",
  },
  catchExpanded: {
    marginTop: 10,
  },
  editButtonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.gray,
    backgroundColor: Colors.white,
  },
  editButton: {
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  editButtonText: {
    color: Colors.white,
    ...Typography.body,
    fontWeight: "bold",
  },
  selectable: {
    textDecorationLine: "underline",
    color: Colors.accent,
  },
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
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  modalCancel: {
    paddingVertical: 14,
    alignItems: "center",
  },
  modalText: {
    ...Typography.body,
    textAlign: "center",
    color: Colors.primary,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    ...Typography.body,
    color: Colors.primary,
    backgroundColor: Colors.white,
  },

  toggleTaken: {
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 12,
    borderRadius: 6,
    backgroundColor: Colors.grayLight,
  },
  saveButtonText: {
    color: Colors.accent,
    ...Typography.body,
    textAlign: "center",
  },
  catchBoxActive: {
    borderColor: Colors.accent,
  },
  deleteButton: {
    backgroundColor: Colors.accent, // definiere `danger` in deiner Farbpalette z. B. als "#D9534F"
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  deleteButtonText: {
    color: Colors.white,
    ...Typography.body,
    fontWeight: "bold",
  },
});
