import { Stack } from 'expo-router';
import tw, { useDeviceContext, useAppColorScheme } from '@/lib/twrnc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout() {
  useDeviceContext(tw);
  const [colorScheme] = useAppColorScheme(tw);
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        key={tw.memoBuster} // Forces a re-render when the color scheme changes
        screenOptions={{
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? tw.color('gray-900') : tw.color('gray-100'),
          },
          headerTintColor: colorScheme === 'dark' ? tw.color('teal-500') : tw.color('gray-900'),
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
