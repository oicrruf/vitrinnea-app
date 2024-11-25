import { Appbar, PaperProvider, TextInput } from "react-native-paper";
import { Stack } from "expo-router";
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
        </Stack>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
