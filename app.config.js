import * as dotenv from "dotenv";
dotenv.config(); // Lade die .env-Datei

export default {
  expo: {
    name: "recaught-native",
    slug: "recaught-native",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/recaught-logo.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/images/recaught-logo.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/logo512.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      favicon: "./assets/images/logo192.png",
    },
    assetBundlePatterns: ["**/*"],
    plugins: ["expo-font"],
    extra: {
      openWeatherApiKey: process.env.OPENWEATHER_API_KEY,
      apiBaseUrl: process.env.API_BASE_URL,
    },
    eas: {
      projectId: "b68ae2f0-aeb2-4461-bca7-aec6920ab091", // Füge dies hinzu
    },
  },
};
