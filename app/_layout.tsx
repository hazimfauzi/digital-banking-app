import '@/api/mockApi'; // Import the mock API to initialize it
import { toastConfig } from '@/components/feedback/toastConfig';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { Stack } from "expo-router";
import { View } from 'react-native';
import {
  ActivityIndicator,
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


function RootNavigator() {
  const { session, loading } = useAuth()
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack>
    <Stack.Protected guard={!session}>
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
    </Stack.Protected>
    <Stack.Protected guard={!!session}>
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
    </Stack.Protected>
  </Stack>
}

export default function Root() {
  // Set up the auth context and render your layout inside of it.
  return (
    <AuthProvider>
      {/* <SplashScreenController /> */}
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <RootNavigator />
          <Toast config={toastConfig} topOffset={150} />
        </PaperProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
}


