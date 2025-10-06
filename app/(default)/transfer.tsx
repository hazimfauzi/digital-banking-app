import { Container, Screen, Text } from "@/components";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, TextInput, TouchableOpacity } from "react-native";

type RecentContact = {
    id?: string; // optional if manual
    name: string;
    phone: string;
};

const mockRecentContacts: RecentContact[] = [
    { id: "1", name: "Alice Tan", phone: "0123456789" },
    { id: "2", name: "Bob Lee", phone: "0198765432" },
];

const TransferScreen = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const handleNext = () => {
        if (!name || !phone) {
            alert("Please enter recipient name and phone");
            return;
        }

        router.push({
            pathname: "/transferAmount",
            params: { contactName: name, contactPhone: phone },
        });
    };

    const handleSelectRecent = (contact: RecentContact) => {
        router.push({
            pathname: "/transferAmount",
            params: { contactName: contact.name, contactPhone: contact.phone },
        });
    };

    const handlePickFromContacts = () => {
        router.push("/transferContact");
    };

    return (
        <Screen>
            <Container style={{ flex: 1, padding: 16 }}>
                {/* Recent Contacts */}
                <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
                    Recent Contacts
                </Text>
                <FlatList
                    data={mockRecentContacts}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id ?? item.phone}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleSelectRecent(item)}
                            style={{
                                backgroundColor: "#f0f0f0",
                                padding: 12,
                                borderRadius: 12,
                                marginRight: 12,
                            }}
                        >
                            <Text style={{ fontWeight: "600" }}>{item.name}</Text>
                            <Text style={{ color: "#666", fontSize: 12 }}>{item.phone}</Text>
                        </TouchableOpacity>
                    )}
                    style={{ marginBottom: 24 }}
                />

                {/* Manual Entry */}
                <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
                    Enter Recipient
                </Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Name"
                    style={{
                        borderWidth: 1,
                        borderColor: "#ddd",
                        borderRadius: 12,
                        padding: 12,
                        marginBottom: 12,
                    }}
                />
                <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                    style={{
                        borderWidth: 1,
                        borderColor: "#ddd",
                        borderRadius: 12,
                        padding: 12,
                        marginBottom: 24,
                    }}
                />

                {/* Pick from Contacts */}
                <TouchableOpacity
                    onPress={handlePickFromContacts}
                    style={{
                        backgroundColor: "#f0f0f0",
                        padding: 14,
                        borderRadius: 12,
                        alignItems: "center",
                        marginBottom: 24,
                    }}
                >
                    <Text style={{ fontWeight: "600", color: "#27496D" }}>
                        Pick from Contacts
                    </Text>
                </TouchableOpacity>

                {/* Next Button */}
                <TouchableOpacity
                    onPress={handleNext}
                    style={{
                        backgroundColor: "#27496D",
                        paddingVertical: 16,
                        borderRadius: 12,
                        alignItems: "center",
                    }}
                >
                    <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
                        Next
                    </Text>
                </TouchableOpacity>
            </Container>
        </Screen>
    );
};

export default TransferScreen;
