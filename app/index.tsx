import { Formik } from "formik";
import { default as React, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { BASE_URL } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Image } from "expo-image";
import { Button, Icon } from "react-native-paper";
import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
  username: Yup.string().required("El usuario es requerido"),
  password: Yup.string().required("Debes ingresar tu contraseña"),
});

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (values: any) => {
    setLoading(true);
    await axios
      .post(`${BASE_URL}/auth/login`, values)
      .then(async (response) => {
        try {
          await AsyncStorage.setItem("@token", response.data.token);
        } catch (e) {
          console.log(e);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.logo}>
        <Image
          source={require("@/assets/images/logo.png")}
          contentFit="contain"
          style={{ width: "auto", height: 70 }}
        />
      </View>

      <View style={styles.form}>
        <Formik
          initialValues={{
            username: "mor_2314",
            password: "83r5^_",
          }}
          validationSchema={SignUpSchema}
          onSubmit={(values) => login(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <TextInput
                activeOutlineColor={"#000"}
                contentStyle={styles.contentInput}
                style={styles.input}
                mode="outlined"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                placeholder="Usuario"
              />
              {errors.username && touched.username ? (
                <View style={styles.error}>
                  <Icon source="alert-box" size={20} color="red" />
                  <Text style={styles.error}>{errors.username}</Text>
                </View>
              ) : null}
              <TextInput
                activeOutlineColor={"#000"}
                contentStyle={styles.contentInput}
                style={styles.input}
                mode="outlined"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                placeholder="Contraseña"
                secureTextEntry={true}
              />
              {errors.password && touched.password ? (
                <View style={styles.error}>
                  <Icon source="alert-box" size={20} color="red" />
                  <Text style={styles.error}>{errors.password}</Text>
                </View>
              ) : null}
              <Button
                labelStyle={styles.buttonLabel}
                style={styles.button}
                contentStyle={styles.contentButton}
                mode="contained"
                loading={loading}
                onPress={() => handleSubmit()}
              >
                Iniciar Sesión
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  logo: {
    flex: 1,
    alignSelf: "center",

    alignContent: "center",
    justifyContent: "flex-end",
    width: "100%",
  },
  form: {
    flex: 1,
    marginTop: 20,
  },
  button: { marginTop: 10, borderRadius: 4 },
  contentButton: { backgroundColor: "rgba(39, 39, 39, 1)", height: 50 },
  input: { marginBottom: 10 },
  contentInput: {
    backgroundColor: "rgba(39, 39, 39, 0.1)",
  },
  buttonLabel: { fontSize: 18 },
  error: {
    flexDirection: "row",
    color: "red",
    lineHeight: 20,
    marginLeft: 5,
    marginBottom: 5,
  },
});
