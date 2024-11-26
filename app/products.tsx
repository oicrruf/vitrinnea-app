import ListHeaderComponent from "@/components/ListHeader";
import Rating from "@/components/Rating";
import { BASE_URL } from "@/constants";
import { Product } from "@/types";
import isAuth from "@/utils/getToken";
import axios from "axios";
import { Image } from "expo-image";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");

  const getProducts = () => {
    axios
      .get(`${BASE_URL}/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    let productSearch = products.filter((p) => p.title.includes(search));
    if (search === "") {
      getProducts();
    } else {
      setProducts(productSearch);
    }
  }, [search]);

  useEffect(() => {
    isAuth().then((auth) => (!auth ? router.replace("/") : null));
    getProducts();
  }, []);

  useEffect(() => {
    isAuth().then((auth) => (!auth ? router.replace("/") : null));
  }, [router]);

  const renderItem = ({ item }: any) => {
    return (
      <Link
        href={{ pathname: "/detail", params: { id: item.id } }}
        style={styles.link}
      >
        <View style={styles.product}>
          <Image
            source={item.image}
            contentFit="contain"
            style={styles.image}
          />
          <View style={styles.detail}>
            <Text variant="titleSmall" numberOfLines={2}>
              {item.title}
            </Text>
            <Text variant="titleLarge">${item.price}</Text>
            <View style={styles.ratingAndCount}>
              <Rating rate={item.rating.rate} />
              <Text style={styles.opacityText}>({item?.rating?.count})</Text>
            </View>
            <Text style={styles.badge}>{item?.category}</Text>
          </View>
        </View>
      </Link>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.flatListContent}>
        <FlatList
          style={styles.flatListBackground}
          data={products}
          ListHeaderComponent={<ListHeaderComponent search={setSearch} />}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          stickyHeaderIndices={[0]}
          snapToAlignment="start"
          decelerationRate={"normal"}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  link: {
    padding: 10,
    borderRadius: 4,
    borderColor: "#c9c9c9",
    borderWidth: 1,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  product: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 4,
    marginRight: 16,
  },
  detail: {
    flex: 1,
    flexDirection: "column",
  },
  safeArea: { backgroundColor: "#fff" },
  flatListContent: { backgroundColor: "#fff", height: height - 100 },
  flatListBackground: { backgroundColor: "#fff" },
  badge: {
    marginTop: 10,
    color: "#666666",
  },
  opacityText: { color: "#c9c9c9", fontSize: 13 },
  ratingAndCount: { flexDirection: "row" },
});

export default Products;
