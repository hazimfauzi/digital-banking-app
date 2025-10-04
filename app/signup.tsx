import api from '@/api/mockApi';
import { Button, Container, FormWrapper, Screen, Text, TextInput } from '@/components';
import { router } from 'expo-router';
import React, { useState } from 'react';
import Toast from 'react-native-toast-message';

export default function SignupScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            const res = await api.post('/signup', { email, password });
            Toast.show({
                type: 'success',
                text1: 'Signup Successful',
                text2: res.data.message
            });
            router.push('/');
        } catch (err: any) {
            Toast.show({
                type: 'error',
                text1: 'Signup Failed',
                text2: err.response?.data?.message || 'Please try again.'
            });
        }
    };

    return (
        <Screen>
            <FormWrapper>
                <Container>
                    <Text style={{ fontSize: 24, marginBottom: 16 }}>Signup</Text>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
                    />
                    <TextInput
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
                    />
                    <Button onPress={handleSignup}>Sign Up</Button>
                    <Button href='/' mode={'outlined'}>Back</Button>
                </Container>
            </FormWrapper>
        </Screen>
    );
}
