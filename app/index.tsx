import api from '@/api/mockApi';
import { Button, Container, FormWrapper, Screen, Text, TextInput } from '@/components';
import { useAuth } from '@/context';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

const LoginScreen = () => {
    const { login, session } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            setLoading(true)
            const res = await api.post('/login', { email, password });
            await login(email, password);
            Toast.show({
                type: 'success',
                text1: 'Login Successful',
                text2: `Welcome back, ${res.data.user.email}!`
            });
            router.push('/home');
        } catch (err: any) {
            Toast.show({
                type: 'error',
                text1: 'Login Failed',
                text2: err.response?.data?.message || 'Please try again.'
            });
        } finally {
            setLoading(false)
        }
    };

    const sendTestNotification = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Hello 👋",
                body: "This is a test notification",
            },
            trigger: null
        });
        Toast.show({
            type: 'success',
            text1: 'Notification scheduled',
            text2: 'Check your device in 2 seconds',
        })
    };

    return (
        <Screen>
            <FormWrapper>
                <Container>
                    <View style={styles.header}>
                        <Text variant={'headlineLarge'}>Welcome to</Text>
                        <Text variant={'headlineMedium'}>Digital Banking App</Text>
                    </View>
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
                    />
                    <TextInput
                        label="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
                    />
                    <Button onPress={handleLogin} loading={loading}>Sign In</Button>
                    <Button onPress={sendTestNotification} loading={loading}>Sign In</Button>
                    <Button href='/signup' mode={'text'}>Sign Up</Button>
                </Container>
            </FormWrapper>
        </Screen>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginBottom: 20,
    }
})

export default LoginScreen;

