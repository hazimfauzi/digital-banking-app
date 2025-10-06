import { setUserData } from "@/api/storage";
import { useAuth } from "@/context";
import { formatPhoneNumber } from "@/utils/phoneNumber";
import * as Contacts from "expo-contacts";
import { useEffect, useState } from "react";

export type ContactInfo = {
    id: string;
    name: string;
    phone?: string;
    email?: string;
};

export const useContacts = () => {
    const { user } = useAuth();
    const [contacts, setContacts] = useState<ContactInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [permissionGranted, setPermissionGranted] = useState(false);

    const loadContacts = async () => {
        if (!user) return;

        setLoading(true);

        try {
            let finalStatus: "granted" | "denied" = user.contactEnabled ? "granted" : "denied";

            if (finalStatus !== "granted") {
                const { status } = await Contacts.requestPermissionsAsync();
                finalStatus = status === "granted" ? "granted" : "denied";

                // Save user contactEnabled flag
                await setUserData(user.phone, { contactEnabled: finalStatus === "granted" });
            }

            if (finalStatus === "granted") {
                setPermissionGranted(true);

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
        if (user) loadContacts();
    }, [user]);

    return { contacts, loading, permissionGranted, reload: loadContacts };
};
