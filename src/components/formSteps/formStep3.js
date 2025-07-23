import React from "react";
import { View, TextInput, Text } from "react-native";

export default function Step3({ data, onChange }) {
  return (
    <View>
      <Text>Strecke</Text>
      <TextInput
        value={data.stretch}
        onChangeText={(v) => onChange({ stretch: v })}
      />
      <Text>Wassertemperatur</Text>
      <TextInput
        value={String(data.watertemp)}
        onChangeText={(v) => onChange({ watertemp: Number(v) })}
      />
      <Text>Wasserfarbe</Text>
      <TextInput
        value={data.watercolor}
        onChangeText={(v) => onChange({ watercolor: v })}
      />
      <Text>Wasserstand</Text>
      <TextInput
        value={data.waterlevel}
        onChangeText={(v) => onChange({ waterlevel: v })}
      />
    </View>
  );
}
