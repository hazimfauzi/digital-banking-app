import MockAdapter from 'axios-mock-adapter';
import api from './axiosClient';
import { getUsers, saveUsers } from './storage';

const mock = new MockAdapter(api, { delayResponse: 700 });

mock.onPost('/signup').reply(async (config) => {
    const user = JSON.parse(config.data);
    const users = await getUsers();

    const exists = users.some((u: any) => u.email === user.email);
    if (exists) return [400, { message: 'Email already exists' }];

    users.push(user);
    await saveUsers(users);
    return [200, { message: 'Signup successful', user }];
});

mock.onPost('/login').reply(async (config) => {
    const { email, password } = JSON.parse(config.data);
    const users = await getUsers();
    const found = users.find((u: any) => u.email === email && u.password === password);

    if (!found) return [401, { message: 'Invalid credentials' }];
    return [200, { message: 'Login successful', user: found }];
});

export default api;
