import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'users';

export async function getUsers() {
    const json = await AsyncStorage.getItem(USERS_KEY);
    return json ? JSON.parse(json) : [];
}

export async function saveUsers(users: any[]) {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}
