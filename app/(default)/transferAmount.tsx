import { Button, Container, Screen, Text, TextInput } from "@/components";
import { useAuth } from "@/context";
import { useUser } from "@/hooks/api/useUser";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { Avatar, Card, HelperText } from "react-native-paper";

const TransferAmountScreen = () => {
    const router = useRouter();
    const { user } = useAuth();
    const { data } = useUser(user?.phone);
    const { contactName, contactPhone } = useLocalSearchParams<{
        contactName: string;
        contactPhone?: string;
    }>();

    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const balance = data?.totalBalance ?? 0;

    const formatAmount = (value: string) => {
        const digits = value.replace(/\D/g, "");
        if (!digits) return "0.00";
        const num = parseFloat(digits) / 100;
        return num.toFixed(2);
    };

    const handleAmountChange = (text: string) => {
        const formatted = formatAmount(text);
        setAmount(formatted);
    };

    const numericAmount = parseFloat(amount) || 0;
    const hasAmountError = numericAmount > balance;

    const handleContinue = () => {
        if (!numericAmount || numericAmount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        if (hasAmountError) {
            alert(`Insufficient balance. You have RM ${balance.toFixed(2)} only.`);
            return;
        }

        router.push({
            pathname: "/transferConfirm",
            params: {
                contactName,
                contactPhone,
                amount,
                note,
            },
        });
    };

    return (
        <Screen>
            <Container style={{ flex: 1, padding: 20 }}>
                {/* Header */}
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 16, color: "#888" }}>Transfer to</Text>
                    <Card
                        style={{
                            borderRadius: 15,
                            backgroundColor: "white",
                            marginBottom: 24,
                            elevation: 2,
                        }}
                    >
                        <Card.Title
                            title={contactName || "Unknown Contact"}
                            subtitle={contactPhone || "No phone"}
                            left={(props) => <Avatar.Icon {...props} icon="account" />}
                        />
                    </Card>
                </View>

                {/* Current Balance */}
                <View style={{ marginBottom: 20 }}>
                    <Text variant="labelMedium" style={{ color: "#888" }}>
                        Current Balance
                    </Text>
                    <Text variant="bodyLarge" style={{ fontWeight: "600" }}>
                        RM {balance.toFixed(2)}
                    </Text>
                </View>

                {/* Amount Input */}
                <Text variant="labelMedium" style={{ color: "#888" }}>
                    Enter Amount
                </Text>
                <View style={{ marginBottom: 20 }}>
                    <TextInput
                        value={amount}
                        onChangeText={handleAmountChange}
                        placeholder="0.00"
                        keyboardType="numeric"
                        error={hasAmountError}
                        style={{
                            fontSize: 32,
                            fontWeight: "700",
                            textAlign: "center",
                        }}
                    />
                    <HelperText type="error" visible={hasAmountError}>
                        Insufficient balance. Please enter a smaller amount.
                    </HelperText>
                </View>

                {/* Note Input */}
                <Text variant="labelMedium" style={{ color: "#888" }}>
                    Note (optional)
                </Text>
                <TextInput
                    value={note}
                    onChangeText={setNote}
                    placeholder="Add a note..."
                    style={{
                        marginBottom: 40,
                    }}
                />

                {/* Continue Button */}
                <Button onPress={handleContinue}>Continue</Button>
            </Container>
        </Screen>
    );
};

export default TransferAmountScreen;
