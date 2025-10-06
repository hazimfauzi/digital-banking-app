import { Container, IconButton, Screen, Text } from "@/components";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/hooks/api/useUser";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";

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

    return (
        <Screen>
            <Container>
                <View
                    style={{
                        backgroundColor: "#ecf3ff",
                        padding: 30,
                        borderRadius: 10,
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
            </Container>
        </Screen>
    );
};

export default Home;
