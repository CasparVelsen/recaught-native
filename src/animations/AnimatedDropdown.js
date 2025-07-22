import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Modal,
  Easing,
} from "react-native";
import Colors from "../../assets/colors/Colors";
import Typography from "../../assets/fonts/Typography";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export function AnimatedDropdown({
  visible,
  onClose,
  options = [],
  onSelect,
  selectedValue,
  labelFallback = "Alle",
}) {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [modalVisible, setModalVisible] = useState(visible);

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 200,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start(() => setModalVisible(false));
    }
  }, [visible]);

  if (!modalVisible) return null;

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.dropdownContainer,
                { transform: [{ translateY }] },
              ]}
            >
              <FlatList
                data={options}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => {
                      onSelect(item);
                      onClose();
                    }}
                  >
                    <Text style={styles.optionText}>
                      {item || labelFallback}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 20,
    maxHeight: SCREEN_HEIGHT * 0.6,
  },
  option: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: Colors.gray,
  },
  optionText: {
    ...Typography.h3,
    textAlign: "center",
    color: Colors.primary,
  },
});
