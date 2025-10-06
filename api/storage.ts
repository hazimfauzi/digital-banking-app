import AsyncStorage from "@react-native-async-storage/async-storage";

export type Contact = { name: string; phone: string };

export type Transaction = {
    id: string;
    type: "debit" | "credit"; // sent or received
    amount: number;
    date: string; // ISO timestamp
    note?: string;
    to?: {
        name: string;
        phone: string;
    };
    from?: {
        name: string;
        phone: string;
    };
};


export type UserData = {
    name: string;
    phone: string;
    pin: string;
    biometricEnabled: boolean;
    contactEnabled: boolean;
    totalBalance: number;
    recentContacts: Contact[];
    transactions: Transaction[];
};

const getUserKey = (phone: string) => `@user:${phone}`;

// Get a single user's data
export const getUserData = async (phone: string): Promise<UserData | null> => {
    const data = await AsyncStorage.getItem(getUserKey(phone));
    return data ? JSON.parse(data) : null;
};

// Save or update a user's data
export const setUserData = async (phone: string, newData: Partial<UserData>) => {
    const current = (await getUserData(phone)) || {
        name: "",
        phone,
        pin: "",
        biometricEnabled: false,
        contactEnabled: true,
        totalBalance: 0,
        recentContacts: [],
    };
    const merged = { ...current, ...newData };
    await AsyncStorage.setItem(getUserKey(phone), JSON.stringify(merged));
};

// Remove a user’s data
export const clearUserData = async (phone: string) => {
    await AsyncStorage.removeItem(getUserKey(phone));
};

// Get all users
export const getAllUsers = async (): Promise<UserData[]> => {
    const keys = await AsyncStorage.getAllKeys();
    const userKeys = keys.filter((k) => k.startsWith("@user:"));
    const stores = await AsyncStorage.multiGet(userKeys);
    return stores
        .map(([, value]) => (value ? JSON.parse(value) : null))
        .filter(Boolean);
};
