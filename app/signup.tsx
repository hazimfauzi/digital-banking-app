import { Button, Container, Screen, Text, TextInput } from "@/components";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert } from "react-native";

const SignupScreen = () => {
    const router = useRouter();
    const { signup } = useAuth();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [pin, setPin] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!name || !phone || !pin) {
            Alert.alert("Missing Fields", "Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);
            await signup(name, phone, pin);
            Alert.alert("Success", "Account created successfully!");
            router.replace("/home");
        } catch (err: any) {
            Alert.alert("Signup Failed", err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Screen>
            <Container style={{ flex: 1, justifyContent: "center", padding: 20 }}>
                <Text variant={'titleLarge'} style={{ marginBottom: 24 }}>
                    Create Your Account 🏦
                </Text>

                <TextInput
                    label="Full Name"
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                    style={{ marginBottom: 16 }}
                />

                <TextInput
                    label="Phone Number"
                    placeholder="e.g. 0123456789"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                    style={{ marginBottom: 16 }}
                />

                <TextInput
                    label="PIN"
                    placeholder="Choose 4-digit PIN"
                    secureTextEntry
                    value={pin}
                    maxLength={4}
                    onChangeText={setPin}
                    style={{ marginBottom: 24 }}
                />

                <Button onPress={handleSignup} loading={loading}>{loading ? "Creating..." : "Sign Up"}</Button>

                <Text
                    style={{
                        textAlign: "center",
                        marginTop: 24,
                    }}
                >
                    Already have an account?{" "}
                    <Text onPress={() => router.push('/')} style={{ color: "#27496D" }}>
                        Login
                    </Text>
                </Text>
            </Container>
        </Screen>
    );
};

export default SignupScreen;
