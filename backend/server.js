import dotenv from "dotenv";
dotenv.config({ path: ".env" }); // <-- Load env vars FIRST

import express from "express";
import cors from "cors";

import cardsHandler from "../src/utils/api/cards/index.js";
import usersHandler from "../src/utils/api/users/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");
app.use(cors());
app.use(express.json());

app.use("/api/cards", async (req, res) => {
  try {
    await cardsHandler(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use("/api/users", async (req, res) => {
  try {
    await usersHandler(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
