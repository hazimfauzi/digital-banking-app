import { IconButton } from "@/components";
import { MaterialIcons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { useTheme } from "react-native-paper";

export default function HomeLayout() {
  const theme = useTheme();
  return <Tabs
    screenOptions={{
      headerStyle: {
        backgroundColor: "#ffffff",
      },
      headerTitleStyle: {
        fontWeight: "600",
        fontSize: 18,
      },
      headerShadowVisible: false,
      headerTitleAlign: "center",
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.outline,
      tabBarStyle: {
        backgroundColor: "#f7f7f7",
        borderTopColor: "#ffffff",
        paddingTop: 15,
        height: 85,
      },
    }}
  >
    <Tabs.Screen
      name="home"
      options={{
        title: 'Home',
        headerTitleAlign: 'center',
        headerLeft: () => (
          <IconButton
            icon={'cog-outline'}
            mode={'contained'}
            onPress={() => router.navigate('/settings')}
          />
        ),
        headerLeftContainerStyle: { padding: 10 },
        headerRight: () => (
          <IconButton
            icon={'bell-outline'}
            mode={'contained'}
            onPress={() => router.navigate('/notification')}
          />
        ),
        headerRightContainerStyle: { padding: 10 },
        tabBarIcon: ({ color }) => <MaterialIcons size={28} name="home" color={color} />,
      }}
    />
    <Tabs.Screen
      name="account"
      options={{
        title: 'Account',
        headerTitleAlign: 'center',
        tabBarIcon: ({ color }) => <MaterialIcons size={28} name="credit-card" color={color} />,
      }}
    />
    <Tabs.Screen
      name="settings"
      options={{
        title: 'Settings',
        headerTitleAlign: 'center',
        tabBarIcon: ({ color }) => <MaterialIcons size={28} name="settings" color={color} />,
      }}
    />
  </Tabs>
}
