import { Stack } from "expo-router";
import tw, { useDeviceContext } from "twrnc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  useDeviceContext(tw);
  return (
    <QueryClientProvider client={queryClient}>
      <Stack key={tw.memoBuster}>
        <Stack.Screen name="index" />
      </Stack>
    </QueryClientProvider>
  );
}
