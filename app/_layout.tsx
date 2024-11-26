import { Appbar, Icon, PaperProvider, TextInput } from "react-native-paper";
import { Link, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <PaperProvider theme={{ dark: false }}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="products" options={{ headerShown: false }} />
          <Stack.Screen
            name="detail"
            options={{
              headerBackButtonDisplayMode: "minimal",
              headerTitle: "",
              headerShadowVisible: false,
              headerTintColor: "#000",
              headerRight: () => (
                <Link href={"/products"}>
                  <Icon source="account" color={"#4c4c4c"} size={32} />
                </Link>
              ),
            }}
          />
        </Stack>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
