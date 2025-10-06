import { Button, Container, Screen, Text } from "@/components";
import { sendLocalNotification } from "@/hooks/notification";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

const TransferResultScreen = () => {
    const router = useRouter();
    const {
        status, // "success" or "fail"
        contactName,
        amount,
        note,
    } = useLocalSearchParams<{
        status: "success" | "fail";
        contactName: string;
        amount: string;
        note?: string;
    }>();

    const isSuccess = status === "success";

    useEffect(() => {
        sendLocalNotification(
            isSuccess ? "Transfer Successful" : "Transfer Failed",
            isSuccess
                ? `You’ve successfully sent RM ${amount} to ${contactName}.`
                : `Your transfer of RM ${amount} to ${contactName} could not be completed.`
        )
    }, [])

    return (
        <Screen>
            <Container
                style={{
                    flex: 1,
                    justifyContent: "center",
                    padding: 24,
                }}
            >
                <View style={{ alignItems: 'center' }}>
                    {/* Icon */}
                    <View
                        style={{
                            backgroundColor: isSuccess ? "#E8F9EF" : "#FDECEC",
                            padding: 30,
                            borderRadius: 100,
                            marginBottom: 24,
                        }}
                    >
                        <Ionicons
                            name={isSuccess ? "checkmark-circle" : "close-circle"}
                            size={90}
                            color={isSuccess ? "#2ECC71" : "#E74C3C"}
                        />
                    </View>

                    {/* Title */}
                    <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 8 }}>
                        {isSuccess ? "Transfer Successful" : "Transfer Failed"}
                    </Text>

                    {/* Description */}
                    <Text style={{ color: "#666", textAlign: "center", marginBottom: 32 }}>
                        {isSuccess
                            ? `You’ve successfully sent RM ${amount} to ${contactName}.`
                            : `Your transfer of RM ${amount} to ${contactName} could not be completed.`}
                    </Text>

                    {/* Optional Note */}
                    {note && isSuccess ? (
                        <View
                            style={{
                                backgroundColor: "#F9F9F9",
                                borderRadius: 12,
                                padding: 16,
                                width: "100%",
                                marginBottom: 24,
                            }}
                        >
                            <Text style={{ color: "#888" }}>Note</Text>
                            <Text style={{ fontSize: 16, marginTop: 4 }}>{note}</Text>
                        </View>
                    ) : null}
                </View>
                {/* Action Buttons */}
                {isSuccess ? (
                    <Button
                        onPress={() => router.push("/home")}
                    >Back to Home</Button>
                ) : (
                    <>
                        <Button
                            onPress={() => router.push("/transfer")}
                        >Try Again</Button>
                        <Button
                            mode={'text'}
                            onPress={() => router.push("/home")}
                        >Back to Home</Button>
                    </>
                )}
            </Container>
        </Screen>
    );
};

export default TransferResultScreen;
