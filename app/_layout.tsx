import Account from "@/components/Account";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";

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
              headerRight: () => <Account />,
            }}
          />
          <Stack.Screen
            name="user"
            options={{
              headerBackButtonDisplayMode: "minimal",
              headerTitle: "",
              headerShadowVisible: false,
              headerTintColor: "#000",
              headerRight: () => <Account />,
            }}
          />
        </Stack>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
