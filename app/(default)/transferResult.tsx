import { Container, Screen, Text } from "@/components";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

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

    return (
        <Screen>
            <Container
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 24,
                }}
            >
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

                {/* Action Buttons */}
                {isSuccess ? (
                    <TouchableOpacity
                        onPress={() => router.push("/home")}
                        style={{
                            backgroundColor: "#27496D",
                            paddingVertical: 16,
                            borderRadius: 12,
                            width: "100%",
                            alignItems: "center",
                        }}
                    >
                        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
                            Back to Home
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <>
                        <TouchableOpacity
                            onPress={() => router.push("/transfer")}
                            style={{
                                backgroundColor: "#27496D",
                                paddingVertical: 16,
                                borderRadius: 12,
                                width: "100%",
                                alignItems: "center",
                                marginBottom: 12,
                            }}
                        >
                            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
                                Try Again
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => router.push("/home")}
                            style={{
                                borderColor: "#27496D",
                                borderWidth: 1.5,
                                paddingVertical: 14,
                                borderRadius: 12,
                                width: "100%",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{ color: "#27496D", fontSize: 16, fontWeight: "600" }}
                            >
                                Back to Home
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
            </Container>
        </Screen>
    );
};

export default TransferResultScreen;
