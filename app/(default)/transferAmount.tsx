import { Container, Screen, Text } from "@/components";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

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
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 16, color: "#888" }}>Transfer to</Text>
          <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 4 }}>
            {contactName || "Unknown Contact"}
          </Text>
          {contactPhone && (
            <Text style={{ color: "#666", marginTop: 2 }}>{contactPhone}</Text>
          )}
        </View>

        {/* Current Balance */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: "#888" }}>Current Balance</Text>
          <Text style={{ fontSize: 28, fontWeight: "700", marginTop: 4 }}>
            RM {balance.toFixed(2)}
          </Text>
        </View>

        {/* Amount Input */}
        <Text style={{ fontSize: 16, color: "#444", marginBottom: 8 }}>
          Enter Amount
        </Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="0.00"
          keyboardType="numeric"
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 12,
            padding: 14,
            fontSize: 22,
            fontWeight: "600",
            textAlign: "center",
            marginBottom: 24,
          }}
        />

        {/* Note Input */}
        <Text style={{ fontSize: 16, color: "#444", marginBottom: 8 }}>
          Note (optional)
        </Text>
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Add a note..."
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 12,
            padding: 14,
            fontSize: 16,
            marginBottom: 40,
          }}
        />

        {/* Continue Button */}
        <TouchableOpacity
          onPress={handleContinue}
          style={{
            backgroundColor: "#27496D",
            paddingVertical: 16,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
            Continue
          </Text>
        </TouchableOpacity>
      </Container>
    </Screen>
  );
};

export default TransferAmountScreen;
