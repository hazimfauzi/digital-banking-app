import { formatPhoneNumber } from "@/utils/phoneNumber";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Contacts from "expo-contacts";
import { useEffect, useState } from "react";

export type ContactInfo = {
    id: string;
    name: string;
    phone?: string;
    email?: string;
};

const STORAGE_KEY = "CONTACTS_PERMISSION_GRANTED";

export const useContacts = () => {
    const [contacts, setContacts] = useState<ContactInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [permissionGranted, setPermissionGranted] = useState(false);

    const loadContacts = async () => {
        setLoading(true);

        try {
            const storedStatus = await AsyncStorage.getItem(STORAGE_KEY);
            let finalStatus: "granted" | "denied" = storedStatus === "true" ? "granted" : "denied";

            if (finalStatus !== "granted") {
                const { status } = await Contacts.requestPermissionsAsync();
                finalStatus = status === "granted" ? "granted" : "denied";
                await AsyncStorage.setItem(STORAGE_KEY, status === "granted" ? "true" : "false");
            }

            if (finalStatus === "granted") {
                setPermissionGranted(true);

                // Fetch contacts
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
                });

                const formatted = data
                    .filter((c) => !!c.name && !!c.phoneNumbers)
                    .map((c) => ({
                        id: c.id,
                        name: c.name ?? "",
                        phone: formatPhoneNumber(c.phoneNumbers?.[0]?.number),
                        email: c.emails?.[0]?.email,
                    }));

                setContacts(formatted);
            } else {
                setPermissionGranted(false);
            }
        } catch (error) {
            console.error("Failed to load contacts:", error);
            setPermissionGranted(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadContacts();
    }, []);

    return { contacts, loading, permissionGranted, reload: loadContacts };
};
