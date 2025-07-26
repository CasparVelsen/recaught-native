import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Modal,
  Pressable,
  Animated,
  StyleSheet,
} from "react-native";
import Colors from "../../../assets/colors/Colors";
import Typography from "../../../assets/fonts/Typography";

export default function StatsListModal({ visible, title, data, onClose }) {
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const [show, setShow] = useState(false);
  const [renderedTitle, setRenderedTitle] = useState("");
  const [renderedData, setRenderedData] = useState([]);

  useEffect(() => {
    if (visible) {
      setRenderedTitle(title);
      setRenderedData(data);
      setShow(true);
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShow(false);
        setRenderedTitle("");
        setRenderedData([]);
      });
    }
  }, [visible, title, data]);

  if (!show) return null;

  const renderItem = ({ item }) => {
    const [name, count] = item;
    return (
      <View style={styles.modalListItem}>
        <Text style={styles.modalListCount}>{count}</Text>
        <Text style={styles.modalListName}>{name}</Text>
      </View>
    );
  };

  return (
    <Modal
      visible={show}
      transparent
      animationType="none" // wir animieren selbst
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Animated.View
          style={[styles.modalOverlay, { opacity: overlayOpacity }]}
        >
          <Pressable style={{ flex: 1 }} onPress={onClose} />
        </Animated.View>
        <Animated.View
          style={[
            styles.modalContent,
            {
              opacity: overlayOpacity,
              transform: [
                {
                  scale: overlayOpacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.modalTitle}>{renderedTitle}</Text>
          <FlatList
            data={renderedData}
            keyExtractor={(item) => item[0]}
            renderItem={renderItem}
          />
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 10,
  },
  modalContent: {
    maxHeight: "60%",
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    zIndex: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    ...Typography.h3,
    color: Colors.primary,
    marginBottom: 12,
    textAlign: "center",
  },
  modalListItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
    gap: 12,
  },
  modalListCount: {
    ...Typography.body,
    color: Colors.secondary,
    minWidth: 30,
    textAlign: "right",
  },
  modalListName: {
    ...Typography.body,
    color: Colors.primary,
    flexShrink: 1,
  },
});
