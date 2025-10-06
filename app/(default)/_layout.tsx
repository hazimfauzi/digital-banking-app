import { Stack } from "expo-router";

export default function DefaultLayout() {
    return <Stack screenOptions={{
        headerStyle: {
            backgroundColor: '#f7f7f7',
        },
        headerTitleStyle: {
            fontWeight: "600",
            fontSize: 18,
        },
        headerShadowVisible: false,
        headerTitleAlign: "center",
    }}>
        <Stack.Screen name="subscription" options={{ title: "Subscription", }} />
        <Stack.Screen name="receive" options={{ title: "Receive" }} />
        <Stack.Screen name="transfer" options={{ title: "Transfer" }} />
        <Stack.Screen name="transferAmount" options={{ title: "Transfer" }} />
        <Stack.Screen name="transferConfirm" options={{ title: "Transfer" }} />
        <Stack.Screen name="transferContact" options={{ title: "Transfer" }} />
        <Stack.Screen name="notification" options={{ title: "Notification" }} />
        <Stack.Screen name="manageAccount" options={{ title: "Edit Details" }} />
    </Stack>;
}
