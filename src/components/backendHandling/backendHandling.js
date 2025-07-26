import { API_BASE_URL } from "../../config";

export const saveCardToBackend = async (token, formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/cards`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const updatedCard = await response.json();

    if (!response.ok) {
      throw new Error(updatedCard.message || "Speichern fehlgeschlagen");
    }

    return updatedCard;
  } catch (error) {
    throw error;
  }
};

export const deleteCardFromBackend = async (token, cardId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/cards`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ _id: cardId }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Löschen fehlgeschlagen");
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export const submitCardToBackend = async (token, formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData), // EIN Objekt, kein Array
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Speichern fehlgeschlagen");
    }

    return result;
  } catch (error) {
    throw error;
  }
};
