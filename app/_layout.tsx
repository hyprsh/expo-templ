import { Stack } from "expo-router";
import tw, { useDeviceContext } from "twrnc";

export default function RootLayout() {
  useDeviceContext(tw)
  return (
    <Stack key={tw.memoBuster}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
