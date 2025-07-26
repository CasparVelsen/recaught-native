// src/utils/fetchCards.js
const API_BASE_URL = "http://10.116.131.241:3000";

export const fetchCards = async (token) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/cards`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("Fehler beim Laden der Karten:", data);
      return [];
    }
    return data;
  } catch (err) {
    console.error("Netzwerkfehler:", err);
    return [];
  }
};
