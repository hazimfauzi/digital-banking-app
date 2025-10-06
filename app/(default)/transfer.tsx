import { defaultApi } from "@/api/axiosClient";
import { Button, Container, IconButton, Screen, Text, TextInput } from "@/components";
import { useAuth } from "@/context";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, TouchableOpacity, View } from "react-native";

type Contact = {
    name: string;
    phone: string;
};

const TransferScreen = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [recentContacts, setRecentContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchContacts = async () => {
            if (!user?.phone) return;
            try {
                setLoading(true);
                const res = await defaultApi.get(`/contacts/${user.phone}`);
                setRecentContacts(res.data.contacts || []);
            } catch (error) {
                console.error("Failed to load contacts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchContacts();
    }, [user?.phone]);

    const handleNext = () => {
        if (!name || !phone) {
            alert("Please enter recipient name and phone number");
            return;
        }

        router.push({
            pathname: "/transferAmount",
            params: { contactName: name, contactPhone: phone },
        });
    };

    const handleSelectRecent = (contact: Contact) => {
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
            <Container style={{ flex: 1, paddingVertical: 16 }}>
                {/* Pick Contacts Button */}
                <View
                    style={{
                        flexWrap: "nowrap",
                        flexDirection: "row",
                        marginBottom: 20,
                    }}
                >
                    <IconButton
                        label="Contacts"
                        icon={"phone"}
                        size={35}
                        style={{ marginHorizontal: 20 }}
                        onPress={handlePickFromContacts}
                    />
                </View>

                {/* Recent Contacts */}
                <Text variant="titleMedium" style={{ fontWeight: "700", marginBottom: 12 }}>
                    Recent Contacts
                </Text>

                {loading ? (
                    <ActivityIndicator size="small" color="#27496D" style={{ marginVertical: 20 }} />
                ) : recentContacts.length > 0 ? (
                    <FlatList
                        data={recentContacts}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.phone}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => handleSelectRecent(item)}
                                style={{
                                    backgroundColor: "#f5f6fa",
                                    padding: 14,
                                    borderRadius: 12,
                                    marginRight: 12,
                                    borderWidth: 1,
                                    borderColor: "#e5e5e5",
                                }}
                            >
                                <Text style={{ fontWeight: "600" }}>{item.name}</Text>
                                <Text style={{ color: "#666", fontSize: 12 }}>{item.phone}</Text>
                            </TouchableOpacity>
                        )}
                        style={{ marginBottom: 24 }}
                    />
                ) : (
                    <View
                        style={{
                            backgroundColor: "#f9f9f9",
                            borderRadius: 12,
                            padding: 20,
                            marginBottom: 24,
                        }}
                    >
                        <Text style={{ color: "#999", textAlign: "center" }}>
                            No recent contacts found.
                        </Text>
                    </View>
                )}

                {/* Manual Entry */}
                <Text variant="titleMedium" style={{ fontWeight: "700", marginBottom: 12 }}>
                    Enter Recipient
                </Text>

                <TextInput
                    label="Name"
                    value={name}
                    onChangeText={setName}
                    placeholder="Name"
                    style={{ marginBottom: 12 }}
                />

                <TextInput
                    label="Phone Number"
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                    style={{ marginBottom: 20 }}
                />

                <Button onPress={handleNext}>Next</Button>
            </Container>
        </Screen>
    );
};

export default TransferScreen;
