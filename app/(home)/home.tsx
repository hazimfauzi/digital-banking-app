import { Container, IconButton, Screen, Text } from "@/components";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/hooks/api/useUser";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

const Home = () => {
    const { user } = useAuth();
    const phone = user?.phone;

    const { data, isLoading, isError } = useUser(phone);

    if (isLoading) {
        return (
            <Screen>
                <Container style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="#27496D" />
                </Container>
            </Screen>
        );
    }

    if (isError || !data) {
        return (
            <Screen>
                <Container style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text variant="bodyLarge" style={{ color: "red" }}>
                        Failed to load user data.
                    </Text>
                </Container>
            </Screen>
        );
    }

    const recentTransactions = data.transactions?.slice(0, 5) || [];

    return (
        <Screen>
            <Container>
                {/* Balance Card */}
                <View
                    style={{
                        backgroundColor: "#ecf3ff",
                        padding: 30,
                        borderRadius: 10,
                        marginBottom: 24,
                    }}
                >
                    <View style={{ marginBottom: 10, justifyContent: "center", alignItems: "center" }}>
                        <Text variant={"titleSmall"}>Total Balance</Text>
                        <Text variant={"displaySmall"} style={{ fontWeight: "bold" }}>
                            RM {data.totalBalance.toFixed(2)}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexWrap: "nowrap",
                            flexDirection: "row",
                            justifyContent: "space-around",
                        }}
                    >
                        <IconButton
                            label="Add money"
                            icon={"plus"}
                            isFilled
                            size={35}
                            style={{ marginHorizontal: 20 }}
                            onPress={() => router.push("/subscription")}
                        />
                        <IconButton
                            label="Receive"
                            icon={"arrow-bottom-left"}
                            isFilled
                            size={35}
                            style={{ marginHorizontal: 20 }}
                            onPress={() => router.push("/receive")}
                        />
                        <IconButton
                            label="Transfer"
                            icon={"arrow-top-right"}
                            isFilled
                            size={35}
                            style={{ marginHorizontal: 20 }}
                            onPress={() => router.push("/transfer")}
                        />
                    </View>
                </View>

                {/* Recent Transactions */}
                <Text variant="titleMedium" style={{ fontWeight: "700", marginBottom: 12 }}>
                    Recent Transactions
                </Text>

                {recentTransactions.length > 0 ? (
                    <FlatList
                        data={recentTransactions}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View
                                style={{
                                    backgroundColor: "#f5f6fa",
                                    padding: 16,
                                    borderRadius: 12,
                                    marginBottom: 12,
                                    borderWidth: 1,
                                    borderColor: "#e5e5e5",
                                }}
                            >
                                <Text style={{ fontWeight: "600" }}>
                                    {item.type === "debit" ? "Sent" : "Received"} RM {item.amount.toFixed(2)}
                                </Text>
                                {item.note && <Text style={{ color: "#666" }}>Note: {item.note}</Text>}
                                <Text style={{ color: "#888", fontSize: 12 }}>
                                    {item.to?.name || item.from?.name} - {item.to?.phone || item.from?.phone}
                                </Text>
                                <Text style={{ color: "#888", fontSize: 12 }}>
                                    {new Date(item.date).toLocaleString()}
                                </Text>
                            </View>
                        )}
                    />
                ) : (
                    <View
                        style={{
                            backgroundColor: "#f9f9f9",
                            borderRadius: 12,
                            padding: 20,
                            marginBottom: 24,
                        }}
                    >
                        <Text style={{ color: "#999", textAlign: "center" }}>
                            No recent transactions found.
                        </Text>
                    </View>
                )}
            </Container>
        </Screen>
    );
};

export default Home;
