import { UserData, getUserData, setUserData } from "@/api/storage";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

export const api = axios.create({
    baseURL: "https://mock.digitalbank.local",
    timeout: 500,
});

const mock = new MockAdapter(api, { delayResponse: 500 });
const randomId = () => Math.random().toString(36).substring(2, 10);

// ✅ Signup
mock.onPost("/signup").reply(async (config) => {
    const { name, phone, pin } = JSON.parse(config.data);

    const existing = await getUserData(phone);
    if (existing) return [400, { message: "Phone number already registered" }];

    const user: UserData = {
        name,
        phone,
        pin,
        biometricEnabled: false,
        totalBalance: 5000, // 💵 give initial balance
        recentContacts: [],
    };

    await setUserData(phone, user);
    return [200, { success: true, user }];
});

// ✅ Login
mock.onPost("/login").reply(async (config) => {
    const { phone, pin } = JSON.parse(config.data);

    const user = await getUserData(phone);
    if (!user) return [404, { message: "User not found" }];
    if (user.pin !== pin) return [401, { message: "Invalid PIN" }];

    return [200, { success: true, user }];
});

// ✅ Enable Biometric
mock.onPost("/biometric/enable").reply(async (config) => {
    const { phone, enabled } = JSON.parse(config.data);
    const user = await getUserData(phone);
    if (!user) return [404, { message: "User not found" }];

    await setUserData(phone, { biometricEnabled: enabled });
    return [200, { success: true }];
});

// ✅ Get User Info
mock.onGet(/\/user\/\d+/).reply(async (config) => {
    const phone = config.url?.split("/").pop();
    const user = await getUserData(phone!);
    if (!user) return [404, { message: "User not found" }];
    return [200, { user }];
});

// ✅ Transfer
mock.onPost("/transfer").reply(async (config) => {
    const { fromPhone, toName, toPhone, amount } = JSON.parse(config.data);
    const amt = Number(amount);

    const sender = await getUserData(fromPhone);
    if (!sender) return [404, { message: "Sender not found" }];

    if (sender.totalBalance < amt) {
        return [400, { success: false, message: "Insufficient balance" }];
    }

    const receiver = await getUserData(toPhone);

    // Update sender balance
    await setUserData(fromPhone, {
        totalBalance: sender.totalBalance - amt,
        recentContacts: [
            { name: toName, phone: toPhone },
            ...sender.recentContacts.filter((c) => c.phone !== toPhone),
        ].slice(0, 5),
    });

    // If receiver exists, update balance
    if (receiver) {
        await setUserData(toPhone, {
            totalBalance: receiver.totalBalance + amt,
        });
    }

    const success = Math.random() > 0.1;
    if (success) {
        return [
            200,
            {
                success: true,
                transactionId: randomId(),
                message: "Transfer successful",
                newBalance: sender.totalBalance - amt,
            },
        ];
    } else {
        return [500, { success: false, message: "Transfer failed" }];
    }
});

// ✅ Get Recent Contacts
mock.onGet(/\/contacts\/\d+/).reply(async (config) => {
    const phone = config.url?.split("/").pop();
    const user = await getUserData(phone!);
    if (!user) return [404, { message: "User not found" }];
    return [200, { contacts: user.recentContacts }];
});

// ✅ Update profile (name or pin)
mock.onPost("/user/update").reply(async (config) => {
    const { phone, name, pin } = JSON.parse(config.data);

    const user = await getUserData(phone);
    if (!user) return [404, { message: "User not found" }];

    await setUserData(phone, {
        name: name || user.name,
        pin: pin || user.pin,
    });

    const updated = await getUserData(phone);
    return [200, { success: true, user: updated }];
});


console.log("✅ Mock API initialized with local storage backend");

export default api;
