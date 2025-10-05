import { Button, Container, NumberPad, Screen } from "@/components";
import { authenticateUser } from "@/hooks/biometric";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

export default function Transfer() {
  const { t } = useTranslation();
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [status, setStatus] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const result = await authenticateUser();

    if (result.success) {
      setStatus('✅ Biometric login successful');
      router.replace('/home');
    } else {
      if (result.reason === 'NO_HARDWARE' || result.reason === 'NOT_ENROLLED') {
        // show PIN input if biometric not available
        setShowPin(true);
      } else {
        setStatus('❌ Authentication failed, try again');
      }
    }
  };

  const handlePinLogin = () => {
    if (pin === '1234') { // 🔐 Replace this with your real pin validation
      setStatus('✅ PIN login successful');
      router.replace('/home');
    } else {
      setStatus('❌ Incorrect PIN');
    }
  };

  return (
    <Screen>
      <Container style={{ flex: 1 }}>
        <Button
          onPress={handleLogin}
        >Transfer</Button>
      </Container>
      <NumberPad
        maxLength={4}
        onChange={(val) => console.log('Current:', val)}
        onSubmit={(val) => Alert.alert('PIN Entered', val)}
      />
    </Screen>
  );
}
