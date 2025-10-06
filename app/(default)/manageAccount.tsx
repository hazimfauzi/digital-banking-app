import { api } from "@/api/mock";
import { Button, Container, Screen, TextInput } from "@/components";
import { useAuth } from "@/context/AuthContext";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert } from "react-native";

const ManageAccountScreen = () => {
    const { user, updateUser } = useAuth();
    const [name, setName] = useState(user?.name || "");
    const [pin, setPin] = useState("");
    const [loading, setLoading] = useState(false);

    if (!user) return null;

    const handleUpdate = async () => {
        try {
            setLoading(true);
            const res = await api.post("/user/update", { phone: user.phone, name, pin });

            // Update session locally
            await updateUser(res.data.user);


            Alert.alert("Success", "Account updated successfully!");
            router.back();
        } catch (err: any) {
            Alert.alert("Error", err.message || "Failed to update account");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Screen>
            <Container>
                <TextInput
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    disabled
                    value={user.phone}
                    style={{ marginBottom: 16 }}
                />

                <TextInput
                    label="Full Name"
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                    style={{ marginBottom: 16 }}
                />

                <TextInput
                    label="New PIN"
                    placeholder="Enter new 4-digit PIN"
                    secureTextEntry
                    value={pin}
                    maxLength={4}
                    onChangeText={setPin}
                    style={{ marginBottom: 24 }}
                />

                <Button
                    onPress={handleUpdate}
                    loading={loading}
                >{loading ? "Saving..." : "Save Changes"}</Button>
            </Container>
        </Screen>
    );
};

export default ManageAccountScreen;
