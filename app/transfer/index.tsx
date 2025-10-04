import { NumberPad } from "@/components";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";

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
      <NumberPad
        maxLength={4}
        onChange={(val) => console.log('Current:', val)}
        onSubmit={(val) => Alert.alert('PIN Entered', val)}
      />
    </View>
  );
}
