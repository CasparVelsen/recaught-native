import React from "react";
import { View, TextInput, Button, Text } from "react-native";

export default function Step4({ data, onChange }) {
  const addCatch = () => {
    const newCatch = {
      species: "",
      time: "",
      length: 0,
      weight: 0,
      bait: "",
      location: "",
      taken: false,
      notes: "",
      _id: Date.now(),
    };
    onChange({ catches: [...data.catches, newCatch] });
  };

  const updateCatch = (index, field, value) => {
    const updated = [...data.catches];
    updated[index][field] = value;
    onChange({ catches: updated });
  };

  const removeCatch = (index) => {
    const updated = [...data.catches];
    updated.splice(index, 1);
    onChange({ catches: updated });
  };

  return (
    <View>
      {data.catches.map((item, index) => (
        <View key={item._id} style={{ marginBottom: 16 }}>
          <Text>Fang {index + 1}</Text>
          <TextInput
            placeholder="Art"
            value={item.species}
            onChangeText={(v) => updateCatch(index, "species", v)}
          />
          <TextInput
            placeholder="Zeit"
            value={item.time}
            onChangeText={(v) => updateCatch(index, "time", v)}
          />
          <Button title="Löschen" onPress={() => removeCatch(index)} />
        </View>
      ))}
      <Button title="Fang hinzufügen" onPress={addCatch} />
    </View>
  );
}
