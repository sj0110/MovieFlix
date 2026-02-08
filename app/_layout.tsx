import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        {/* Hides (tabs) header */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* Hides movies/id header */}
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
