import express from "express";
import cors from "cors";

import cardsHandler from "./api/cards/index.js";
import usersHandler from "./api/users/index.js";
import profileHandler from "./api/users/profile.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");
app.use(cors());
app.use(express.json());

// ⬇️ Registrierung der spezifischen Route zuerst
app.use("/api/users/profile", async (req, res) => {
  try {
    await profileHandler(req, res);
  } catch (err) {
    console.error("Fehler in /profile:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ⬇️ Dann allgemeine User-Routen
app.use("/api/users", async (req, res) => {
  try {
    await usersHandler(req, res);
  } catch (err) {
    console.error("Fehler in /users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Kartenrouten
app.use("/api/cards", async (req, res) => {
  try {
    await cardsHandler(req, res);
  } catch (err) {
    console.error("Fehler in /cards:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`✅ Server läuft auf Port ${PORT}`);
});
