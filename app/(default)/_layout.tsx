import { Stack } from "expo-router";

export default function DefaultLayout() {
    return <Stack screenOptions={{
        headerTitleStyle: {
            fontWeight: "600",
            fontSize: 18,
        },
        headerShadowVisible: false,
        headerTitleAlign: "center",
    }}>
        <Stack.Screen
            name="subscription"
            options={{
                title: "Subscription",
            }}
        />
        <Stack.Screen
            name="receive"
            options={{
                title: "Receive",
            }}
        />
        <Stack.Screen
            name="transfer"
            options={{
                title: "Transfer",
            }}
        />
        <Stack.Screen
            name="notification"
            options={{
                title: "Notification",
            }}
        />
    </Stack>;
}
