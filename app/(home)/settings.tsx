import { defaultApi } from "@/api/axiosClient";
import { Button, Container, Screen } from "@/components";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import React, { useState } from "react";
import { Avatar, Card, Switch } from "react-native-paper";
import Toast from "react-native-toast-message";

const Settings = () => {
    const { user, logout, updateUser } = useAuth();
    const [biometricEnabled, setBiometricEnabled] = useState(user?.biometricEnabled ?? false);
    const [loading, setLoading] = useState(false);

    if (!user) return null;

    const handleToggleBiometric = async (value: boolean) => {
        try {
            setLoading(true);
            setBiometricEnabled(value);

            await defaultApi.post("/biometric/enable", { phone: user.phone, enabled: value });

            await updateUser({ biometricEnabled: value });

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: `Biometric authentication ${value ? "enabled" : "disabled"}`
            });
        } catch (err: any) {
            Toast.show({
                type: 'success',
                text1: 'Error',
                text2: err.message || "Failed to update biometric setting"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Screen>
            <Container style={{ flex: 1, paddingTop: 20 }}>
                {/* 👤 User card */}
                <Card
                    style={{
                        borderRadius: 15,
                        backgroundColor: "white",
                        marginBottom: 24,
                        elevation: 2,
                    }}
                >
                    <Card.Title
                        title={user.name}
                        subtitle={`${user.phone}`}
                        left={(props) => <Avatar.Icon {...props} icon="account" />}
                    />
                </Card>

                {/* 🔒 Biometric toggle */}
                <Card
                    style={{
                        backgroundColor: "white",
                        borderRadius: 12,
                        marginBottom: 24,
                        padding: 10,
                    }}
                >
                    <Card.Title
                        title="Biometric Authentication"
                        subtitle="Use fingerprint or face recognition for authentication"
                        right={() => (
                            <Switch
                                value={biometricEnabled}
                                disabled={loading}
                                onValueChange={handleToggleBiometric}
                            />
                        )}
                    />
                </Card>

                {/* ⚙️ Manage Account */}
                <Button
                    onPress={() => router.push("/manageAccount")}
                    style={{
                        marginBottom: 16,
                    }}
                >Manage Account</Button>

                {/* 🚪 Logout */}
                <Button
                    mode={'outlined'}
                    onPress={logout}
                >Logout</Button>
            </Container>
        </Screen>
    );
};

export default Settings;
