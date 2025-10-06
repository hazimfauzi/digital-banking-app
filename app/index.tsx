import { Button, Container, Screen, Text, TextInput } from "@/components";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert } from "react-native";

const LoginScreen = () => {
    const router = useRouter();
    const { login } = useAuth();

    const [phone, setPhone] = useState("");
    const [pin, setPin] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!phone || !pin) {
            Alert.alert("Missing Fields", "Please enter your phone number and PIN.");
            return;
        }

        try {
            setLoading(true);
            await login(phone, pin);
            Alert.alert("Success", "Logged in successfully!");
            router.replace('/home'); // Redirect to home after login
        } catch (err: any) {
            Alert.alert("Login Failed", err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Screen>
            <Container style={{ flex: 1, justifyContent: "center", padding: 20 }}>
                <Text variant={'titleLarge'} style={{ marginBottom: 24 }}>
                    Welcome Back 👋
                </Text>

                <TextInput
                    label="Phone Number"
                    placeholder="e.g. 60123456789"
                    keyboardType="numeric"
                    value={phone}
                    onChangeText={setPhone}
                    style={{ marginBottom: 16 }}
                />

                <TextInput
                    label="PIN"
                    placeholder="Enter 4-digit PIN"
                    keyboardType="numeric"
                    secureTextEntry
                    value={pin}
                    onChangeText={setPin}
                    style={{ marginBottom: 24 }}
                />

                <Button onPress={handleLogin} loading={loading}>{loading ? "Logging in..." : "Login"}</Button>

                <Text
                    style={{
                        textAlign: "center",
                        marginTop: 24,
                    }}
                >
                    Don’t have an account?{" "}
                    <Text onPress={() => router.push('/signup')} style={{ color: "#27496D" }}>
                        Sign up
                    </Text>
                </Text>
            </Container>
        </Screen>
    );
};

export default LoginScreen;
