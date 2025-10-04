import api from '@/api/mockApi';
import { Button } from '@/components';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';

export default function SignupScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            const res = await api.post('/signup', { email, password });
            Alert.alert('Success', res.data.message);
            router.push('/');
        } catch (err: any) {
            Alert.alert('Error', err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
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
            <Button title="Signup" onPress={handleSignup} />
            <Button title="Go to Login" href='/' />
        </View>
    );
}
