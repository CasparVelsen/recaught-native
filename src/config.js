import Constants from "expo-constants";

const API_BASE_URL =
  Constants?.expoConfig?.extra?.apiBaseUrl || "http://10.116.131.241:3000";

export { API_BASE_URL };
