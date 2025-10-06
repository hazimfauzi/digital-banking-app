import { defaultApi } from "@/api/axiosClient";
import { Button, Container, Screen, Text, TextInput } from "@/components";
import { useAuth } from "@/context";
import * as LocalAuthentication from "expo-local-authentication";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Modal, View } from "react-native";
import { Avatar, Card } from "react-native-paper";
import Toast from "react-native-toast-message";

const TransferConfirmScreen = () => {
    const router = useRouter();
    const { user } = useAuth();
    const { contactName, contactPhone, amount, note } = useLocalSearchParams<{
        contactName: string;
        contactPhone?: string;
        amount: string;
        note?: string;
    }>();

    const [pin, setPin] = useState("");
    const [showPinModal, setShowPinModal] = useState(false);
    const [loading, setLoading] = useState(false);

    // 🔹 Start biometric or PIN flow
    const handleConfirm = async () => {
        setLoading(true);
        try {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            const enrolled = await LocalAuthentication.isEnrolledAsync();

            if (compatible && enrolled && user?.biometricEnabled) {
                const result = await LocalAuthentication.authenticateAsync({
                    promptMessage: "Confirm Transfer",
                    fallbackLabel: "Use PIN",
                });

                if (result.success) {
                    await handleTransfer();
                } else {
                    handlePinFallback();
                }
            } else {
                handlePinFallback();
            }
        } catch (error) {
            console.log("Biometric error:", error);
            handlePinFallback();
        } finally {
            setLoading(false);
        }
    };

    // 🔹 If biometric unavailable or disabled
    const handlePinFallback = () => {
        if (!user?.pin) {
            Toast.show({
                type: 'error',
                text1: 'PIN not set',
                text2: 'Please set your account PIN first.'
            });
            return;
        }
        setShowPinModal(true);
    };

    // 🔹 Verify PIN input
    const handlePinSubmit = async () => {
        if (pin === user?.pin) {
            setShowPinModal(false);
            await handleTransfer();
        } else {
            Toast.show({
                type: 'error',
                text1: 'Invalid PIN',
                text2: 'Please try again.'
            });
            setPin("");
        }
    };

    // 🔹 Call mock API for transfer
    const handleTransfer = async () => {
        if (!user?.phone || !contactPhone) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Missing transfer information.'
            });
            return;
        }

        setLoading(true);
        try {
            const response = await defaultApi.post("/transfer", {
                fromPhone: user.phone,
                toName: contactName,
                toPhone: contactPhone,
                amount,
            });

            if (response.data.success) {
                router.push({
                    pathname: "/transferResult",
                    params: {
                        status: "success",
                        contactName,
                        amount,
                        note,
                        transactionId: response.data.transactionId,
                    },
                });
            } else {
                handleFail(response.data.message);
            }
        } catch (error: any) {
            console.log("Transfer error:", error);
            handleFail(error?.response?.data?.message || "Transfer failed");
        } finally {
            setLoading(false);
        }
    };

    const handleFail = (message?: string) => {
        router.push({
            pathname: "/transferResult",
            params: { status: "fail", contactName, amount, note, message },
        });
    };

    return (
        <Screen>
            <Container style={{ flex: 1, padding: 20 }}>
                {/* Header */}
                <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 16 }}>
                    Confirm Transfer
                </Text>

                {/* Transfer Details */}
                <View >
                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ fontSize: 16, color: "#888" }}>Recipient</Text>
                        <Card
                            style={{
                                borderRadius: 15,
                                backgroundColor: "white",
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
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ fontSize: 16, color: "#888" }}>Amount</Text>
                        <Text variant='bodyLarge' style={{ fontWeight: "700", color: "#27496D" }}>
                            RM {amount}
                        </Text>
                    </View>

                    {note && <View style={{ marginBottom: 20 }}>
                        <Text style={{ fontSize: 16, color: "#888" }}>Note</Text>
                        <Text variant='bodyLarge' style={{ fontWeight: "700", color: "#27496D" }}>
                            {note}
                        </Text>
                    </View>}
                </View>

                {/* Confirm Button */}
                <Button
                    loading={loading}
                    onPress={handleConfirm}
                >
                    Confirm & Send
                </Button>
            </Container>

            {/* PIN Fallback Modal */}
            <Modal visible={showPinModal} transparent animationType="slide">
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "rgba(0,0,0,0.4)",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 20,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: 16,
                            padding: 24,
                            width: "100%",
                        }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
                            Enter PIN to Confirm
                        </Text>

                        <TextInput
                            value={pin}
                            onChangeText={setPin}
                            placeholder="Enter your PIN"
                            secureTextEntry
                            keyboardType="numeric"
                            style={{
                                marginBottom: 20,
                            }}
                        />
                        <Button
                            onPress={handlePinSubmit}
                        >
                            Confirm
                        </Button>
                        <Button
                            mode={'text'}
                            onPress={() => setShowPinModal(false)}
                        >
                            Cancel
                        </Button>
                    </View>
                </View>
            </Modal>
        </Screen>
    );
};

export default TransferConfirmScreen;
