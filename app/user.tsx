import Loading from "@/components/Loading";
import { BASE_URL } from "@/constants";
import { Profile } from "@/types";
import isAuth from "@/utils/getToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Icon, Text } from "react-native-paper";

const User = () => {
  const params = useLocalSearchParams();

  const [profile, setProfile] = useState<Profile>();
  const [loading, setLoading] = useState<boolean>(false);
  const [removingToken, setRemovingToken] = useState<boolean>(false);

  const removeToken = async () => {
    setRemovingToken(true);
    try {
      await AsyncStorage.removeItem("@token");
      setRemovingToken(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/users/${params.user}`)
      .then((response) => {
        setProfile(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    isAuth().then((auth) => (!auth ? router.replace("/") : null));
  }, [router, removeToken]);

  if (loading) {
    return <Loading />;
  }

  if (!loading) {
    return (
      <View style={styles.screen}>
        <View style={styles.userData}>
          <Text variant="headlineLarge">
            {profile?.name.firstname.toLocaleUpperCase()}{" "}
            {profile?.name.lastname.toLocaleUpperCase()}
          </Text>
          <Text variant="bodyLarge" style={styles.username}>
            {profile?.username}
          </Text>
          <View style={styles.addressAndPhone}>
            <Icon source="map" size={16} color="#666666" />
            <Text>
              {profile?.address.street}, {profile?.address.number},{" "}
              {profile?.address.city}, {profile?.address.zipcode}
            </Text>
          </View>

          <View style={styles.addressAndPhone}>
            <Icon source="phone" size={16} color="#666666" />
            <Text>{profile?.phone}</Text>
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Button
            labelStyle={styles.buttonLabel}
            style={styles.button}
            contentStyle={styles.contentButton}
            mode="contained"
            loading={removingToken}
            onPress={removeToken}
          >
            Cerrar Sesión
          </Button>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  userData: { alignSelf: "flex-start", flex: 1 },
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    justifyContent: "space-around",
  },
  username: { marginBottom: 20, color: "#666666" },
  addressAndPhone: { marginBottom: 10, flexDirection: "row", gap: 5 },
  button: { marginTop: 10, borderRadius: 4 },
  contentButton: {
    backgroundColor: "rgba(39, 39, 39, 1)",
    height: 50,
  },
  contentInput: {
    backgroundColor: "rgba(39, 39, 39, 0.1)",
  },
  buttonLabel: { fontSize: 18 },
});

export default User;
