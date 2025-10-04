import { Container, Screen, Text } from "@/components";
import { useTranslation } from "react-i18next";

export default function Default() {
  const { t } = useTranslation();
  return (
    <Screen>
      <Container style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Text>Default</Text>
      </Container>
    </Screen>
  );
}
