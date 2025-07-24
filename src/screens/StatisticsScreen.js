import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
  Animated,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Colors from "../../assets/colors/Colors";
import Typography from "../../assets/fonts/Typography";
import { TimeFilter, WaterFilter } from "../components/filter/CardsFilters";
import LineStats from "../components/stats/LineStats";
import BarStats from "../components/stats/BarStats";
import { getEnvironmentStats } from "../utils/stats";

const API_BASE_URL = "http://10.116.131.241:3000";

const StatsScreen = ({ token, profile }) => {
  const [cards, setCards] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedWater, setSelectedWater] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);

  const [overlayVisible, setOverlayVisible] = useState(false);
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  // Overlay einblenden mit Fade
  const showOverlay = () => {
    setOverlayVisible(true);
    Animated.timing(overlayOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Overlay ausblenden mit Fade
  const hideOverlay = () => {
    Animated.timing(overlayOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setOverlayVisible(false);
    });
  };

  useFocusEffect(
    useCallback(() => {
      const fetchCards = async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/api/cards`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          if (res.ok) {
            setCards(data);
          } else {
            console.error("Fehler beim Laden:", data);
          }
        } catch (err) {
          console.error("Netzwerkfehler:", err);
        }
      };

      fetchCards();
    }, [token])
  );

  const filteredCards = useMemo(() => {
    return cards.filter((entry) => {
      const yearMatch =
        !selectedYear ||
        new Date(entry.date).getFullYear().toString() === selectedYear;
      const waterMatch = !selectedWater || entry.water === selectedWater;
      return yearMatch && waterMatch;
    });
  }, [cards, selectedYear, selectedWater]);

  const stats = useMemo(() => {
    return getEnvironmentStats(filteredCards);
  }, [filteredCards]);

  const allCatches = useMemo(() => {
    return filteredCards.flatMap((card) => card.catches || []);
  }, [filteredCards]);

  const speciesStats = useMemo(() => {
    const map = {};
    allCatches.forEach((c) => {
      if (!c.species) return;
      map[c.species] = (map[c.species] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [allCatches]);

  const baitStats = useMemo(() => {
    const map = {};
    allCatches.forEach((c) => {
      if (!c.bait) return;
      map[c.bait] = (map[c.bait] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [allCatches]);

  const openModal = (type) => {
    setModalType(type);
    setModalVisible(true);
    showOverlay();
  };

  const closeModal = () => {
    hideOverlay();
    setModalVisible(false);
    setModalType(null);
  };

  // Vorschau: Top 6 Items
  const topSpecies = speciesStats.slice(0, 6);
  const topBaits = baitStats.slice(0, 6);

  const renderListItem = ({ item }) => {
    const [name, count] = item;
    return (
      <View style={styles.modalListItem}>
        <Text style={styles.modalListCount}>{count}</Text>
        <Text style={styles.modalListName}>{name}</Text>
      </View>
    );
  };

  const modalTitle = modalType === "species" ? "Fangstatistik" : "Fliegendose";
  const modalData = modalType === "species" ? speciesStats : baitStats;

  // Zusätzliche Werte für die drei Tiles über Fangstatistik
  const tripsCount = filteredCards.length; // Anzahl Wasserbesuche
  const totalFishCount = allCatches.length; // Gesamtanzahl Fänge
  const fishPerTrip =
    tripsCount > 0 ? (totalFishCount / tripsCount).toFixed(2) : "0";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerBlock}>
        <View>
          <Text style={styles.welcome}>Tight lines,</Text>
          <Text style={styles.header}>
            {profile?.firstname || profile?.username || "User"}
          </Text>
        </View>
        <View style={styles.filterGroup}>
          <TimeFilter
            profileCards={cards}
            selectedYear={selectedYear}
            onChangeYear={setSelectedYear}
          />
          <WaterFilter
            filteredCardsByTime={filteredCards}
            selectedWater={selectedWater}
            onChangeWater={setSelectedWater}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Drei kleine Tiles über Fangstatistik */}
        <View style={styles.statsTilesContainer}>
          <View style={styles.statsTile}>
            <Text style={styles.tileValue}>{tripsCount}</Text>
            <Text style={styles.tileLabel}>Trips</Text>
          </View>
          <View style={styles.statsTile}>
            <Text style={styles.tileValue}>{totalFishCount}</Text>
            <Text style={styles.tileLabel}>Fänge</Text>
          </View>
          <View style={styles.statsTile}>
            <Text style={styles.tileValue}>{fishPerTrip}</Text>
            <Text style={styles.tileLabel}>Fänge pro Trip</Text>
          </View>
        </View>

        {/* Kacheln Container */}
        <View style={styles.tilesContainer}>
          {/* Fangstatistik Kachel */}
          <TouchableOpacity
            style={styles.tile}
            onPress={() => openModal("species")}
            activeOpacity={0.7}
          >
            <Text style={styles.tileTitle}>Fangstatistik</Text>
            <View>
              {topSpecies.length > 0 ? (
                topSpecies.map(([species, count]) => (
                  <View key={species} style={styles.tileItem}>
                    <Text style={styles.tileCount}>{count}</Text>
                    <Text
                      style={styles.tileName}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {species}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.empty}>Keine Daten verfügbar.</Text>
              )}
            </View>
          </TouchableOpacity>

          {/* Fliegendose Kachel */}
          <TouchableOpacity
            style={styles.tile}
            onPress={() => openModal("bait")}
            activeOpacity={0.7}
          >
            <Text style={styles.tileTitle}>Fliegendose</Text>
            <View>
              {topBaits.length > 0 ? (
                topBaits.map(([bait, count]) => (
                  <View key={bait} style={styles.tileItem}>
                    <Text style={styles.tileCount}>{count}</Text>
                    <Text
                      style={styles.tileName}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {bait}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.empty}>Keine Daten verfügbar.</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>

        {stats && <LineStats stats={stats} />}
        {stats && <BarStats stats={stats} />}
      </ScrollView>

      {overlayVisible && (
        <Animated.View
          style={[styles.modalOverlay, { opacity: overlayOpacity }]}
        >
          <Pressable style={{ flex: 1 }} onPress={closeModal} />
        </Animated.View>
      )}

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <Pressable style={styles.modalOverlay} onPress={closeModal} />
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {modalType === "species" ? "Fangstatistik" : "Fliegendose"}
            </Text>
            <FlatList
              data={modalType === "species" ? speciesStats : baitStats}
              keyExtractor={(item) => item[0]}
              renderItem={renderListItem}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default StatsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerBlock: {
    padding: 16,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    alignItems: "flex-end",
  },
  welcome: {
    ...Typography.subtitle,
    color: Colors.primary,
  },
  header: {
    ...Typography.h1,
    color: Colors.primary,
    flexShrink: 1,
  },
  filterGroup: {
    flexDirection: "row",
    flexShrink: 1,
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  content: {
    paddingBottom: 60,
  },

  statsTilesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 16,
  },
  statsTile: {
    width: "30%",
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  tileValue: {
    ...Typography.body,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 4,
  },
  tileLabel: {
    ...Typography.caption,
    color: Colors.secondary,
  },

  tilesContainer: {
    flexDirection: "row",
    gap: 16,
    margin: 16,
    justifyContent: "space-between",
  },
  tile: {
    flex: 1,
    aspectRatio: 1, // Quadrat
    backgroundColor: "#f8f8f8",
    borderRadius: 16,
    padding: 16,
    justifyContent: "flex-start",
  },
  tileTitle: {
    ...Typography.h3,
    color: Colors.primary,
    marginBottom: 12,
  },
  tileItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  tileCount: {
    ...Typography.caption,
    color: Colors.secondary,
    fontWeight: "700",
    minWidth: 15,
    textAlign: "right",
  },
  tileName: {
    ...Typography.caption,
    color: Colors.primary,
    flexShrink: 1,
    width: "85%",
    textAlign: "left",
  },
  empty: {
    fontStyle: "italic",
    color: "#888",
  },
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
    width: "80%", // Breite begrenzt und zentriert
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    zIndex: 20,
    elevation: 5, // Für Android Schatten
    shadowColor: "#000", // Für iOS Schatten
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
