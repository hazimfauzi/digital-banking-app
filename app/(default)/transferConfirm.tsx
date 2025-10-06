import { defaultApi } from "@/api/axiosClient";
import { Container, Screen, Text, TextInput } from "@/components";
import { useAuth } from "@/context";
import * as LocalAuthentication from "expo-local-authentication";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Modal, TouchableOpacity, View } from "react-native";

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
            Alert.alert("PIN not set", "Please set your account PIN first.");
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
            Alert.alert("Invalid PIN", "Please try again.");
            setPin("");
        }
    };

    // 🔹 Call mock API for transfer
    const handleTransfer = async () => {
        if (!user?.phone || !contactPhone) {
            Alert.alert("Error", "Missing transfer information.");
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
                <View
                    style={{
                        backgroundColor: "#f9f9f9",
                        borderRadius: 12,
                        padding: 16,
                        marginBottom: 24,
                    }}
                >
                    <Text>Recipient</Text>
                    <Text style={{ fontWeight: "600" }}>{contactName}</Text>
                    {contactPhone && <Text>{contactPhone}</Text>}

                    <View
                        style={{ height: 1, backgroundColor: "#eee", marginVertical: 12 }}
                    />

                    <Text>Amount</Text>
                    <Text style={{ fontWeight: "700", color: "#27496D" }}>
                        RM {amount}
                    </Text>

                    {note && (
                        <>
                            <View
                                style={{ height: 1, backgroundColor: "#eee", marginVertical: 12 }}
                            />
                            <Text>Note</Text>
                            <Text>{note}</Text>
                        </>
                    )}
                </View>

                {/* Confirm Button */}
                <TouchableOpacity
                    disabled={loading}
                    onPress={handleConfirm}
                    style={{
                        backgroundColor: "#27496D",
                        paddingVertical: 16,
                        borderRadius: 12,
                        alignItems: "center",
                    }}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={{ color: "#fff", fontWeight: "600" }}>
                            Confirm & Send
                        </Text>
                    )}
                </TouchableOpacity>
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
                                borderWidth: 1,
                                borderColor: "#ddd",
                                borderRadius: 12,
                                padding: 14,
                                fontSize: 20,
                                textAlign: "center",
                                marginBottom: 20,
                            }}
                        />

                        <TouchableOpacity
                            onPress={handlePinSubmit}
                            style={{
                                backgroundColor: "#27496D",
                                paddingVertical: 14,
                                borderRadius: 12,
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ color: "#fff", fontWeight: "600" }}>Confirm</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setShowPinModal(false)}
                            style={{ marginTop: 16, alignItems: "center" }}
                        >
                            <Text style={{ color: "#888" }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </Screen>
    );
};

export default TransferConfirmScreen;
