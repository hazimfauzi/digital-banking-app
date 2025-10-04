import { Container, NumberPad, Screen } from "@/components";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

export default function Transfer() {
  const { t } = useTranslation();
  return (
    <Screen>
      <Container style={{ flex: 1 }}></Container>
      <NumberPad
        maxLength={4}
        onChange={(val) => console.log('Current:', val)}
        onSubmit={(val) => Alert.alert('PIN Entered', val)}
      />
    </Screen>
  );
}
