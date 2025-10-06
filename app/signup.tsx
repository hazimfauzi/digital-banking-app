import { Button, Container, Screen, Text, TextInput } from "@/components";
import { useAuth } from "@/context/AuthContext";
import { isValidPhoneNumber } from "@/utils/phoneNumber";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import { HelperText } from "react-native-paper";

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

                <View style={{ marginBottom: 5 }}>
                    <TextInput
                        label="Phone Number"
                        placeholder="e.g. 60123456789"
                        keyboardType="numeric"
                        value={phone}
                        error={!isValidPhoneNumber(phone)}
                        onChangeText={setPhone}
                    />
                    <HelperText type="error" visible={!isValidPhoneNumber(phone)}>
                        Not valid phone number
                    </HelperText>
                </View>

                <TextInput
                    label="PIN"
                    placeholder="Choose 4-digit PIN"
                    secureTextEntry
                    keyboardType="numeric"
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
