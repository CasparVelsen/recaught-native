import React, { useEffect, useRef } from "react";
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
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../../../assets/colors/Colors";
import Typography from "../../../assets/fonts/Typography";

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
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.modalHeader}>
            <Pressable onPress={onClose} style={styles.modalClose}>
              <Ionicons name="close" size={24} color={Colors.gray} />
            </Pressable>
            <Text style={styles.modalTitle}>Fang bearbeiten</Text>
            <View style={styles.modalSpacer} />
          </View>

          <ScrollView>
            {[['species', 'bait'], ['length', 'weight'], ['time', 'location']].map((pair, row) => (
              <View key={row} style={styles.modalRow}>
                {pair.map((field, idx) =>
                  field ? (
                    <View key={field} style={styles.modalInputWrapper}>
                      <Text style={styles.inputTitle}>{fieldLabels[field]}</Text>
                      <TextInput
                        style={[styles.modalInput, styles.modalInputHalf]}
                        placeholder={fieldLabels[field]}
                        value={catchForm[field]?.toString() || ''}
                        onChangeText={(text) => onChange(field, text)}
                      />
                    </View>
                  ) : (
                    <View key={idx} style={styles.modalInputHalf} />
                  )
                )}
              </View>
            ))}

            <View>
              <Text style={styles.inputTitle}>Notizen</Text>
              <TextInput
                key={fieldLabels.notes}
                style={styles.modalInput}
                placeholder={fieldLabels.notes}
                value={catchForm.notes?.toString() || ''}
                onChangeText={(text) => onChange('notes', text)}
              />
            </View>

            <TouchableOpacity style={styles.toggleTaken} onPress={() => onChange('taken', !catchForm.taken)}>
              <Text style={styles.modalText}>{catchForm.taken ? '✓ Entnommen' : '✗ Zurückgesetzt'}</Text>
            </TouchableOpacity>

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={[styles.modalButton, { borderWidth: 1, borderColor: Colors.accent }]}
                onPress={onDelete}
              >
                <Text style={[styles.modalButtonText, { color: Colors.accent }]}>Löschen</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { borderWidth: 1, borderColor: Colors.primary }]}
                onPress={onSave}
              >
                <Text style={[styles.modalButtonText, { color: Colors.primary }]}>Speichern</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 20,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  modalRow: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 16,
  },
  modalInputWrapper: {
    flex: 1,
  },
  inputTitle: {
    ...Typography.body,
    marginBottom: 4,
    color: Colors.primary,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    ...Typography.body,
    color: '#ccc',
    backgroundColor: Colors.white,
  },
  modalInputHalf: {
    width: '100%',
  },
  toggleTaken: {
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 12,
    borderRadius: 6,
    backgroundColor: Colors.grayLight,
  },
  modalText: {
    ...Typography.body,
    textAlign: 'center',
    color: '#ccc',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  modalButtonText: {
    ...Typography.button,
  },
});
