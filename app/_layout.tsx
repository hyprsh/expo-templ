import { Stack } from 'expo-router';
import tw, { useDeviceContext, useAppColorScheme } from '@/lib/tailwind';
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
            backgroundColor: colorScheme === 'dark' ? tw.color('dark-900') : tw.color('dark-100'),
          },
          headerTintColor: colorScheme === 'dark' ? tw.color('dark-100') : tw.color('dark-900'),
          headerTitleStyle: {
            fontWeight: 'regular',
            fontSize: 24,
          },
          contentStyle: {
            backgroundColor: colorScheme === 'dark' ? tw.color('dark-900') : tw.color('dark-100'),
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: true }} />
      </Stack>
    </QueryClientProvider>
  );
}
