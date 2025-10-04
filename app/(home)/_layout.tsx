import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return <Tabs>
    <Tabs.Screen
      name="home"
      options={{
        title: 'Home',
        tabBarIcon: ({ color }) => <MaterialIcons size={28} name="home" color={color} />,
      }}
    />
    <Tabs.Screen
      name="account"
      options={{
        title: 'Account',
        tabBarIcon: ({ color }) => <MaterialIcons size={28} name="credit-card" color={color} />,
      }}
    />
    <Tabs.Screen
      name="settings"
      options={{
        title: 'Settings',
        tabBarIcon: ({ color }) => <MaterialIcons size={28} name="settings" color={color} />,
      }}
    />
  </Tabs>
}
