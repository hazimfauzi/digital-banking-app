import { StatusBar } from 'expo-status-bar';
import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';

type ScreenProps = {
    children: ReactNode;
    scrollable?: boolean; // if true, wrap with ScrollView
    contentContainerStyle?: ViewStyle;
    style?: ViewStyle;
    statusBarStyle?: 'light' | 'dark' | 'auto'; // optional control
    statusBarColor?: string; // optional background color
};

const Screen = ({
    children,
    scrollable = false,
    contentContainerStyle,
    style,
    statusBarStyle = 'dark',
    statusBarColor = '#0046FF', // default to your app’s blue
}: ScreenProps) => {
    const Content = (
        <>
            {/* 👇 Always show consistent status bar */}
            <StatusBar style={statusBarStyle} backgroundColor={statusBarColor} />
            <View style={[styles.inner, style]}>{children}</View>
        </>
    );

    if (scrollable) {
        return (
            <ScrollView
                contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {Content}
            </ScrollView>
        );
    }

    return <View style={styles.safe}>{Content}</View>;
};

const styles = StyleSheet.create({
    safe: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    inner: {
        flex: 1,
        paddingBottom: 25,
        backgroundColor: '#f7f7f7',
    },
});

export default Screen;
