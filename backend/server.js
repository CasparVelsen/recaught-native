import express from "express";
import cors from "cors";
import axios from "axios";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "./models/User.js";

import cardsHandler from "./api/cards/index.js";
import usersHandler from "./api/users/index.js";
import profileHandler from "./api/users/profile.js";
import { translateValue } from "../assets/language/translatedValue.js"; // Importiere die translateValue-Funktion

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");
app.use(cors());
app.use(express.json());

// Mondphase berechnen
const getMoonPhase = (date) => {
  const newMoon = new Date(2001, 0, 24); // Der erste bekannte Neumond
  const daysInCycle = 29.53058867; // Der Mondzyklus dauert 29,53 Tage

  const diffInTime = date - newMoon;
  const diffInDays = diffInTime / (1000 * 3600 * 24);

  const cycle = diffInDays / daysInCycle;
  const phase = cycle - Math.floor(cycle);

  if (phase < 0.03) {
    return "new moon";
  } else if (phase < 0.25) {
    return "increasing moon";
  } else if (phase < 0.75) {
    return "full moon";
  } else if (phase < 1) {
    return "waning moon";
  }
};

// ⬇️ Wetterdaten API
app.post("/api/external-weather", async (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Latitude und Longitude sind erforderlich" });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
    );

    if (!response.data || response.data.cod !== 200) {
      throw new Error("Fehler beim Abrufen der Wetterdaten");
    }

    const weatherDescription =
      response.data.weather[0].description.toLowerCase();
    let parsedWeather = "";

    if (weatherDescription.includes("clear sky")) parsedWeather = "clear";
    else if (weatherDescription.includes("few clouds")) parsedWeather = "clear";
    else if (weatherDescription.includes("scattered clouds"))
      parsedWeather = "clear";
    else if (weatherDescription.includes("broken clouds"))
      parsedWeather = "cloudy";
    else if (weatherDescription.includes("overcast clouds"))
      parsedWeather = "cloudy";
    else if (weatherDescription.includes("rain")) parsedWeather = "rainy";
    else if (weatherDescription.includes("snow")) parsedWeather = "snowy";
    else if (
      weatherDescription.includes("mist") ||
      weatherDescription.includes("fog") ||
      weatherDescription.includes("haze")
    )
      parsedWeather = "foggy";
    else parsedWeather = "stormy";

    const windDeg = response.data.wind.deg;
    let windDir = "";
    if (windDeg >= 0 && windDeg <= 22.5) windDir = "north";
    else if (windDeg > 22.5 && windDeg <= 67.5) windDir = "northeast";
    else if (windDeg > 67.5 && windDeg <= 112.5) windDir = "east";
    else if (windDeg > 112.5 && windDeg <= 157.5) windDir = "southeast";
    else if (windDeg > 157.5 && windDeg <= 202.5) windDir = "south";
    else if (windDeg > 202.5 && windDeg <= 247.5) windDir = "southwest";
    else if (windDeg > 247.5 && windDeg <= 292.5) windDir = "west";
    else if (windDeg > 292.5 && windDeg <= 337.5) windDir = "northwest";
    else windDir = "north";

    const currentDate = new Date();
    const moonPhase = getMoonPhase(currentDate);

    const newWeather = {
      weather: translateValue("weather", parsedWeather),
      temperature: Math.round(response.data.main.temp) || "",
      airpressure: response.data.main.pressure || "",
      wind: translateValue("wind", windDir),
      moon: translateValue("moon", moonPhase),
      windspeed: Math.round(response.data.wind.speed) || "",
    };

    res.json(newWeather);
  } catch (error) {
    console.error("Fehler beim Abrufen der Wetterdaten:", error);
    res
      .status(500)
      .json({ error: "Interner Fehler beim Abrufen der Wetterdaten" });
  }
});

// ⬇️ Registrierung der spezifischen Route für Profile
app.use("/api/users/profile", async (req, res) => {
  try {
    await profileHandler(req, res);
  } catch (err) {
    console.error("Fehler in /profile:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ⬇️ Registrierung der Login-Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Email und Passwort sind erforderlich" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Benutzer nicht gefunden" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ error: "Falsches Passwort" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Erfolgreich eingeloggt", token });
  } catch (error) {
    console.error("Fehler beim Login:", error);
    res.status(500).json({ error: "Interner Fehler beim Login" });
  }
});

// ⬇️ Registrierung der Registrierungs-Route
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Email und Passwort sind erforderlich" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email bereits registriert" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Benutzer erfolgreich registriert" });
  } catch (error) {
    console.error("Fehler bei der Registrierung:", error);
    res.status(500).json({ error: "Interner Fehler bei der Registrierung" });
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

// ⬇️ Kartenrouten
app.use("/api/cards", async (req, res) => {
  try {
    await cardsHandler(req, res);
  } catch (err) {
    console.error("Fehler in /cards:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 404 Fehler-Handling
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`✅ Server läuft auf Port ${PORT}`);
});
