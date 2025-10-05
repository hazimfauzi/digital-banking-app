import '@/api/mockApi'; // Import the mock API to initialize it
import { toastConfig } from '@/components/feedback/toastConfig';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { registerForPushNotificationsAsync } from '@/hooks/notification';
import * as Notifications from 'expo-notifications';
import { Stack } from "expo-router";
import { useEffect } from 'react';
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
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0046FF',
    secondary: '#E9E9E9',
    surfaceVariant: '#fff',
  },
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Root() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <RootNavigator />
          <Toast config={toastConfig} topOffset={150} />
        </PaperProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

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
          headerShown: false,
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


