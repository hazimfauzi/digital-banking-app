import '@/api/mockApi'; // Import the mock API to initialize it
import { Stack } from "expo-router";
import '../i18n';

export default function RootLayout() {
  return <Stack>
    <Stack.Screen
      name="index"
      options={{
        title: "Login",
      }}
    />
    <Stack.Screen
      name="signup"
      options={{
        title: "signup",
      }}
    />
    <Stack.Screen
      name="(home)"
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen
      name="transfer"
      options={{
        headerShown: false
      }}
    />
  </Stack>;
}
