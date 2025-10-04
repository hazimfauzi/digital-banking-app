import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function Default() {
  const { t } = useTranslation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Default</Text>
    </View>
  );
}
