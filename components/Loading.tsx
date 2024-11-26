import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native-paper";

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} color={"#000"} size={"large"} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", justifyContent: "center" },
});
