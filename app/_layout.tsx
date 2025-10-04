import '@/api/mockApi'; // Import the mock API to initialize it
import { toastConfig } from '@/components/feedback/toastConfig';
import { Stack } from "expo-router";
import {
  MD3LightTheme as DefaultTheme, PaperProvider
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import '../i18n';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#112D4E',
    secondary: '#3F72AF',
    surfaceVariant: '#fff',
  },
};

export default function RootLayout() {
  return <SafeAreaProvider>
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Digital Banking",
            headerTitleAlign: 'center',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            title: "Sign Up",
            headerTitleAlign: 'center',
            headerBackVisible: false,
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
      </Stack>
      <Toast config={toastConfig} topOffset={150} />
    </PaperProvider>
  </SafeAreaProvider>;
}
