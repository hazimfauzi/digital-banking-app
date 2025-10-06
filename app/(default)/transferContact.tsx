import { Container, Screen, Text } from "@/components";
import { ContactInfo, useContacts } from "@/hooks/contacts";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, TextInput, TouchableOpacity, View } from "react-native";

const TransferContactScreen = () => {
    const router = useRouter();
    const { contacts, loading, permissionGranted, reload } = useContacts();
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Filtered contacts based on search
    const filteredContacts = useMemo(() => {
        if (!searchQuery) return contacts;
        const lowerQuery = searchQuery.toLowerCase();
        return contacts.filter(
            (c) =>
                c.name.toLowerCase().includes(lowerQuery) ||
                c.phone?.toLowerCase().includes(lowerQuery)
        );
    }, [contacts, searchQuery]);

    const handleSelectContact = (contact: ContactInfo) => {
        router.push({
            pathname: "/transferAmount",
            params: {
                contactId: contact.id,
                contactName: contact.name,
                contactPhone: contact.phone,
            },
        });
    };

    return (
        <Screen>
            <Container style={{ flex: 1, padding: 16 }}>
                {/* Loading */}
                {loading && (
                    <Container style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator />
                        <Text style={{ marginTop: 8 }}>Loading contacts...</Text>
                    </Container>
                )}

                {/* Permission denied */}
                {!loading && !permissionGranted && (
                    <Container style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text>No permission to access contacts</Text>
                        <TouchableOpacity onPress={reload} style={{ marginTop: 16 }}>
                            <Text style={{ color: "#27496D" }}>Grant Permission</Text>
                        </TouchableOpacity>
                    </Container>
                )}

                {/* Contacts List */}
                {!loading && permissionGranted && (
                    <View style={{ flex: 1 }}>
                        {/* Search Input */}
                        <TextInput
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholder="Search by name or phone"
                            style={{
                                borderWidth: 1,
                                borderColor: "#ddd",
                                borderRadius: 12,
                                padding: 12,
                                marginBottom: 12,
                            }}
                        />

                        {/* Contact List */}
                        <FlatList
                            data={filteredContacts}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => handleSelectContact(item)}
                                    style={{
                                        paddingVertical: 14,
                                        borderBottomWidth: 1,
                                        borderBottomColor: "#f0f0f0",
                                    }}
                                >
                                    <Text style={{ fontWeight: "600" }}>{item.name}</Text>
                                    {item.phone && (
                                        <Text style={{ color: "#666", marginTop: 2, fontSize: 13 }}>
                                            {item.phone}
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            </Container>
        </Screen>
    );
};

export default TransferContactScreen;
