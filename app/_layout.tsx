import '@/api/mock'; // Import the mock API to initialize it
import { toastConfig } from '@/components/feedback/toastConfig';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { registerForPushNotificationsAsync } from '@/hooks/notification';
import { QueryProvider } from '@/provider/QueryProvider';
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
    secondary: '#FF8040',
    surfaceVariant: '#ffffff',
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
    <QueryProvider>
      <AuthProvider>
        <SafeAreaProvider>
          <PaperProvider theme={theme}>
            <RootNavigator />
            <Toast config={toastConfig} topOffset={150} />
          </PaperProvider>
        </SafeAreaProvider>
      </AuthProvider>
    </QueryProvider>
  );
}

function RootNavigator() {
  const { user, loading } = useAuth()
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{
    headerTitleStyle: {
      fontWeight: "600",
      fontSize: 18,
    },
    headerShown: false,
    headerBackVisible: false,
    headerTitleAlign: "center",
  }} >
    <Stack.Protected guard={!user}>
      <Stack.Screen name="index" />
      <Stack.Screen name="signup" />
    </Stack.Protected>
    <Stack.Protected guard={!!user}>
      <Stack.Screen name="(home)" />
      <Stack.Screen name="(default)" />
    </Stack.Protected>
  </Stack>
}


