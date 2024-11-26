import AsyncStorage from "@react-native-async-storage/async-storage";

const isAuth = async () => {
  const token = await AsyncStorage.getItem("@token");

  if (token !== null) {
    return true;
  }
  if (token === null) {
    return false;
  }
};

export default isAuth;
