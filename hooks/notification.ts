import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Alert, Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {
    let token;

    if (Device.isDevice) {
        const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        console.log('Expo projectId:', projectId);
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            Alert.alert('Permission required', 'Push notifications permission not granted!');
            return;
        }

        token = (await Notifications.getExpoPushTokenAsync({
            projectId: projectId,
        })).data;
        console.log('Expo Push Token:', token);
    } else {
        Alert.alert('Error', 'Must use a physical device for push notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#0046FF',
        });
    }

    return token;
}
