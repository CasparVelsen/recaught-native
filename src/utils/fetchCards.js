// src/utils/fetchCards.js
import { API_BASE_URL } from "../config";

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
