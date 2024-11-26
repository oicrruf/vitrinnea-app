import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-paper";

type Rate = {
  rate: number | undefined;
};
const Rating = ({ rate }: Rate) => {
  const [stars, setStars] = useState<number>(0);
  useEffect(() => {
    rate && setStars(Math.ceil(rate));
  });

  return (
    <View style={styles.container}>
      {stars >= 1 && <Icon source="star" color={"#FAD02C"} size={16} />}
      {stars >= 2 && <Icon source="star" color={"#FAD02C"} size={16} />}
      {stars >= 3 && <Icon source="star" color={"#FAD02C"} size={16} />}
      {stars >= 4 && <Icon source="star" color={"#FAD02C"} size={16} />}
      {stars == 5 && <Icon source="star" color={"#FAD02C"} size={16} />}
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
});
