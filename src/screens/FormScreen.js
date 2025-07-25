import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Deine Steps
import Step1 from "../components/formSteps/formStep1";
import Step2 from "../components/formSteps/formStep2";
import Step3 from "../components/formSteps/formStep3";
import Step4 from "../components/formSteps/formStep4";
import Step5 from "../components/formSteps/formStep5";
import Colors from "../../assets/colors/Colors";
import Typography from "../../assets/fonts/Typography";
import { submitCardToBackend } from "../components/backendHandling/backendHandling";

export default function FormScreen({ token }) {
  const navigation = useNavigation();
  const [step, setStep] = useState(1); // Current step in the form
  const totalSteps = 5; // Total steps in the form

  const [form, setForm] = useState({
    water: "",
    date: "",
    target: "",
    weather: "",
    temperature: "",
    airpressure: "",
    moon: "",
    wind: "",
    windspeed: "",
    stretch: "",
    watertemp: null,
    watercolor: "",
    waterlevel: "",
    catches: [],
    bites: null,
    lost: null,
    author: "demoUser",
  });

  // Function to go back
  const cancel = () => navigation.goBack();

  // Function to handle changes in the form fields
  const handleChange = (data) => {
    const numericKeys = [
      "temperature",
      "airpressure",
      "watertemp",
      "windspeed",
      "bites",
      "lost",
    ];

    const parsedData = Object.entries(data).reduce((acc, [key, value]) => {
      acc[key] =
        numericKeys.includes(key) && value !== "" && value !== null
          ? Number(value)
          : value;
      return acc;
    }, {});

    setForm((prev) => ({ ...prev, ...parsedData }));
  };

  // Validation function to check if required fields are filled
  const validateForm = () => {
    return form.date && form.water && form.target;
  };

  // Function to render each step based on the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            data={form}
            onChange={handleChange}
            isFormValid={validateForm()} // Pass the validation status to Step1
          />
        );
      case 2:
        return <Step2 data={form} onChange={handleChange} />;
      case 3:
        return <Step3 data={form} onChange={handleChange} />;
      case 4:
        return <Step4 data={form} onChange={handleChange} />;
      case 5:
        return (
          <Step5
            data={form}
            onChange={handleChange}
            isFormValid={validateForm()}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Pressable onPress={cancel} style={styles.backButton}>
            <Ionicons name="close-outline" size={24} color={Colors.primary} />
          </Pressable>
          <Text style={styles.headerTitle}>Erfahrungsbericht erstellen</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.stepIndicator}>
          {Array.from({ length: totalSteps }, (_, i) => (
            <React.Fragment key={i}>
              {i > 0 && <View style={styles.line} />}
              <View
                style={[
                  styles.stepCircle,
                  step === i + 1
                    ? styles.stepCircleActive
                    : styles.stepCircleInactive,
                  step === i + 1 && styles.stepCircleBorder,
                ]}
              />
            </React.Fragment>
          ))}
        </View>
      </View>

      {/* Content */}
      <View style={styles.contentWrapper}>
        <ScrollView contentContainerStyle={styles.stepContent}>
          {renderStep()}
        </ScrollView>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {step > 1 && (
          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={() => setStep(step - 1)}
          >
            <Text style={styles.buttonSecondaryText}>Zurück</Text>
          </TouchableOpacity>
        )}
        {step < totalSteps && (
          <TouchableOpacity
            style={[
              styles.button,
              styles.buttonPrimary,
              !validateForm() && styles.buttonDisabled, // Disable button if form is not valid
            ]}
            disabled={!validateForm()}
            onPress={async () => {
              if (!validateForm()) {
                alert("Bitte füllen Sie Datum, Gewässer und Zielfisch aus!");
                return;
              }

              setStep(step + 1);
            }}
          >
            <Text style={styles.buttonPrimaryText}>Weiter</Text>
          </TouchableOpacity>
        )}
        {step === totalSteps && (
          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary]}
            onPress={async () => {
              const result = await submitCardToBackend(token, form);
              if (result) {
                navigation.goBack();
              }
            }}
          >
            <Text style={styles.buttonPrimaryText}>Erstellen</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  header: {
    backgroundColor: "#eee",
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 20,
    gap: 20,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  backButton: {
    padding: 4,
    color: Colors.primary,
  },
  headerTitle: {
    ...Typography.subtitle,
    color: Colors.primary,
  },

  stepIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    marginBottom: 12,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: "#ddd",
  },
  stepCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  stepCircleInactive: {
    backgroundColor: "#ddd",
  },
  stepCircleActive: {
    backgroundColor: Colors.primary,
  },
  stepCircleBorder: {
    borderWidth: 1,
    borderColor: Colors.accent,
    backgroundColor: Colors.accent,
  },

  contentWrapper: {
    flex: 1,
  },
  stepContent: {
    padding: 20,
    paddingBottom: 40,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#eee",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonPrimary: {
    backgroundColor: Colors.primary,
  },
  buttonPrimaryText: {
    color: Colors.white,
    ...Typography.button,
  },
  buttonSecondary: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  buttonSecondaryText: {
    color: Colors.primary,
    ...Typography.button,
  },
  buttonDisabled: {
    backgroundColor: "#ddd", // Disabled button color
  },
});
