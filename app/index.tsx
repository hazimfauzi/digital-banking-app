import api from '@/api/mockApi';
import { Button, Container, FormWrapper, Screen, Text, TextInput } from '@/components';
import { router } from 'expo-router';
import React, { useState } from 'react';
import Toast from 'react-native-toast-message';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await api.post('/login', { email, password });
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
    }
  };

  return (
    <Screen>
      <FormWrapper>
        <Container>
          <Text variant={'titleLarge'}>Login</Text>
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
          <Button onPress={handleLogin}>Sign In</Button>
          <Button href='/signup' mode={'outlined'}>Sign Up</Button>
        </Container>
      </FormWrapper>
    </Screen>
  );
}
