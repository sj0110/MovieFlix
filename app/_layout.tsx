import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "../global.css";

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />
      <Stack>
        {/* Hides (tabs) header */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* Hides movies/id header */}
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
