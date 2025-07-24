import * as Font from "expo-font";
import { useEffect, useState } from "react";

export default function useLoadFonts() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      Inter: require("../../assets/fonts/Inter-Regular.ttf"),
    }).then(() => setLoaded(true));
  }, []);

  return loaded;
}
