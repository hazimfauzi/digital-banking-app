import { Stack } from "expo-router";

export default function TransferLayout() {
  return <Stack>
    <Stack.Screen
      name="index"
      options={{
        title: "Transfer",
        headerTitleAlign: "center",
      }}
    />
  </Stack>;
}
