const API_BASE_URL = "http://10.116.131.241:3000";

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

export const submitData = async (data, token) => {
  const res = await fetch("https://deine-domain/api/cards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // <- Token korrekt übergeben
    },
    body: JSON.stringify(data), // <- einzelnes Objekt, kein Array!
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Fehler beim Speichern");
  }

  return await res.json();
};
