import { Stack } from "expo-router";

export default function DefaultLayout() {
  return <Stack>
    <Stack.Screen
      name="index"
      options={{
        title: "Default",
      }}
    />
  </Stack>;
}
