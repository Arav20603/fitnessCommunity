import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{
    headerShown: false
  }}>
    <Stack.Screen name="index" options={{
    }} />
    <Stack.Screen name="(tabs)" options={{
    }} />
    <Stack.Screen name="login" options={{
    }} />
    <Stack.Screen name="features" options={{
    }} />
  </Stack>
}
