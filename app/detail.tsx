import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useLocalSearchParams, useGlobalSearchParams, Link } from "expo-router";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { Icon, MD3Colors, Text } from "react-native-paper";
import Rating from "@/components/Rating";
import { ScrollView } from "react-native-gesture-handler";
import { Product } from "@/types";

const Detail = () => {
  const params = useLocalSearchParams();
  const [detail, setDetail] = useState<Product>();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/products/${params.id}`)
      .then((response) => {
        setDetail(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
      <Image source={detail?.image} style={styles.image} contentFit="contain" />
      <Text variant="titleLarge">{detail?.title}</Text>
      <View style={styles.meta}>
        <View style={styles.rating}>
          <Text>{detail?.rating?.rate}</Text>
          <Rating rate={detail?.rating.rate} />
          <Text style={styles.opacityText}>({detail?.rating?.count})</Text>
        </View>
        <Text style={styles.badge}>{detail?.category}</Text>
      </View>
      <Text>{detail?.description}</Text>
    </ScrollView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  scrollView: { padding: 16, backgroundColor: "#fff" },
  image: {
    width: "100%",
    height: 400,
    marginBottom: 20,
  },
  meta: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 20,
    marginVertical: 16,
  },
  opacityText: { color: "#c9c9c9" },
  rating: { flexDirection: "row", gap: 5 },
  badge: {
    backgroundColor: "#e6e6e6",
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 4,
  },
});
