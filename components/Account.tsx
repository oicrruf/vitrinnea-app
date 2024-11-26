import { Text, StyleSheet, View } from "react-native";
import React, { Component } from "react";
import { Link } from "expo-router";
import { Icon } from "react-native-paper";

const Account = () => (
  <Link href={{ pathname: "/user", params: { user: 2 } }}>
    <Icon source="account" color={"#4c4c4c"} size={32} />
  </Link>
);

export default Account;
