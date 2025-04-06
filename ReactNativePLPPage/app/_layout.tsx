// app/views/_layout.tsx
import { Stack } from 'expo-router';

export default function ViewsLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetails" options={{ presentation: 'card' }} />
    </Stack>
  );
}