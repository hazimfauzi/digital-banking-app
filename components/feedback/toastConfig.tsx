import React from 'react';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
    success: (props: any) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: '#4CAF50' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 16,
                fontWeight: 'bold',
            }}
        />
    ),

    error: (props: any) => (
        <ErrorToast
            {...props}
            text1Style={{ fontSize: 15, fontWeight: '600' }}
            text2Style={{ fontSize: 13 }}
        />
    ),
};
