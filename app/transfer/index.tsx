import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function Transfer() {
  const { t } = useTranslation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    </View>
  );
}
