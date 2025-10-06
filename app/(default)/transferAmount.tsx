import { Button, Container, Screen, Text, TextInput } from "@/components";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { Avatar, Card } from "react-native-paper";

const TransferAmountScreen = () => {
  const router = useRouter();
  const { contactName, contactPhone } = useLocalSearchParams<{
    contactName: string;
    contactPhone?: string;
  }>();

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [balance] = useState(2500.75); // mock balance

  const handleContinue = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    // Pass data to confirmation or authentication screen
    router.push({
      pathname: '/transferConfirm',
      params: {
        contactName,
        contactPhone,
        amount,
        note,
      },
    });
  };

  return (
    <Screen>
      <Container style={{ flex: 1, padding: 20 }}>
        {/* Header */}
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 16, color: "#888" }}>Transfer to</Text>
          <Card
            style={{
              borderRadius: 15,
              backgroundColor: "white",
              marginBottom: 24,
              elevation: 2,
            }}
          >
            <Card.Title
              title={contactName || "Unknown Contact"}
              subtitle={`${contactPhone}`}
              left={(props) => <Avatar.Icon {...props} icon="account" />}
            />
          </Card>
        </View>

        {/* Current Balance */}
        <View style={{ marginBottom: 20 }}>
          <Text variant={'labelMedium'} style={{ color: "#888" }}>Current Balance</Text>
          <Text variant={'bodyLarge'}>
            RM {balance.toFixed(2)}
          </Text>
        </View>

        <Text variant={'labelMedium'} style={{ color: "#888" }}>
          Enter Amount
        </Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="0.00"
          keyboardType="numeric"
          style={{
            marginBottom: 30,
          }}
        />

        <Text variant={'labelMedium'} style={{ color: "#888" }}>
          Note (optional)
        </Text>
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Add a note..."
          style={{
            marginBottom: 40,
          }}
        />

        <Button
          onPress={handleContinue}
        >Continue</Button>
      </Container>
    </Screen>
  );
};

export default TransferAmountScreen;
