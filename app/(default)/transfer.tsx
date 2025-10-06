import { defaultApi } from "@/api/axiosClient";
import { Button, Container, IconButton, Screen, Text, TextInput } from "@/components";
import { useAuth } from "@/context";
import { isValidPhoneNumber } from "@/utils/phoneNumber";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, TouchableOpacity, View } from "react-native";
import { Avatar, HelperText } from "react-native-paper";

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

        if (!isValidPhoneNumber(phone)) {
            alert("Please enter valid phone number");
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
                    <View><FlatList
                        data={recentContacts}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.phone}
                        contentContainerStyle={{
                            paddingVertical: 8,
                            paddingRight: 12,
                        }}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => handleSelectRecent(item)}
                                style={{
                                    width: 100,
                                    backgroundColor: "#fff",
                                    paddingVertical: 12,
                                    paddingHorizontal: 10,
                                    borderRadius: 16,
                                    marginRight: 12,
                                    borderWidth: 1,
                                    borderColor: "#e5e5e5",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    shadowColor: "#000",
                                    shadowOpacity: 0.05,
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowRadius: 3,
                                    elevation: 1,
                                }}
                                activeOpacity={0.8}
                            >
                                <Avatar.Text size={30} label={item.name[0]} style={{ marginBottom: 10 }} />
                                <Text
                                    style={{ fontWeight: "600", fontSize: 13, color: "#333", marginBottom: 2 }}
                                    numberOfLines={1}
                                >
                                    {item.name}
                                </Text>
                                <Text style={{ color: "#888", fontSize: 11 }}>{item.phone}</Text>
                            </TouchableOpacity>
                        )}
                        style={{ marginBottom: 24 }} />
                    </View>
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

                <View style={{ marginBottom: 5 }}>
                    <TextInput
                        label="Phone Number"
                        value={phone}
                        onChangeText={setPhone}
                        error={!isValidPhoneNumber(phone)}
                        placeholder="e.g. 60123456789"
                        keyboardType="numeric"
                    />
                    <HelperText type="error" visible={!isValidPhoneNumber(phone)}>
                        Not valid phone number
                    </HelperText>
                </View>

                <Button onPress={handleNext}>Next</Button>
            </Container>
        </Screen>
    );
};

export default TransferScreen;
