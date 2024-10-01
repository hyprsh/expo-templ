import { Stack } from "expo-router";
import tw, { useAppColorScheme } from "@/lib/twrnc";
import Providers from "@/Providers";

export default function RootLayout() {
  const [colorScheme] = useAppColorScheme(tw);
  return (
    <Providers>
      <Stack
        key={tw.memoBuster} // Forces a re-render when the color scheme changes
        screenOptions={{
          headerStyle: {
            backgroundColor:
              colorScheme === "dark"
                ? tw.color("gray-900")
                : tw.color("gray-100"),
          },
          headerTintColor:
            colorScheme === "dark"
              ? tw.color("teal-500")
              : tw.color("gray-900"),
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 24,
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}
