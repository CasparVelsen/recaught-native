import React from "react";
import { View, TextInput, Text } from "react-native";

export default function Step2({ data, onChange }) {
  return (
    <View>
      <Text>Wetter</Text>
      <TextInput
        value={data.weather}
        onChangeText={(v) => onChange({ weather: v })}
      />
      <Text>Temperatur</Text>
      <TextInput
        value={String(data.temperature)}
        onChangeText={(v) => onChange({ temperature: Number(v) })}
      />
      <Text>Luftdruck</Text>
      <TextInput
        value={String(data.airpressure)}
        onChangeText={(v) => onChange({ airpressure: Number(v) })}
      />
      <Text>Mond</Text>
      <TextInput
        value={data.moon}
        onChangeText={(v) => onChange({ moon: v })}
      />
      <Text>Wind</Text>
      <TextInput
        value={data.wind}
        onChangeText={(v) => onChange({ wind: v })}
      />
      <Text>Windgeschwindigkeit</Text>
      <TextInput
        value={String(data.windspeed)}
        onChangeText={(v) => onChange({ windspeed: Number(v) })}
      />
    </View>
  );
}
