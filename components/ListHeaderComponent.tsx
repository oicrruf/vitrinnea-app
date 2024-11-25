import { View, Text, Dimensions, StyleSheet } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";

type SearchProps = {
  search: (value: string) => void;
};

const ListHeaderComponent = ({ search }: SearchProps) => (
  <View style={styles.view}>
    <TextInput
      onChangeText={(value) => search(value)}
      mode="outlined"
      placeholder="Buscar"
      contentStyle={styles.input}
    />
  </View>
);

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 16,
    marginBottom: 16,
    borderBottomColor: "#c9c9c9",
    borderBottomWidth: 1,
    paddingBottom: 16,
    backgroundColor: "#fff",
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#c2c2c2",
    borderWidth: 1,
    borderRadius: 4,
  },
});

export default ListHeaderComponent;
