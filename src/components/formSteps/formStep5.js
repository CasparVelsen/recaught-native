import React from "react";
import { View, TextInput, Text } from "react-native";

export default function Step5({ data, onChange }) {
  return (
    <View>
      <Text>Anzahl Bisse</Text>
      <TextInput
        value={String(data.bites)}
        onChangeText={(v) => onChange({ bites: Number(v) })}
      />
      <Text>Fische verloren</Text>
      <TextInput
        value={String(data.lost)}
        onChangeText={(v) => onChange({ lost: Number(v) })}
      />
      <Button title="Absenden" onPress={onSubmit} />
    </View>
  );
}
