import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';

type ScreenProps = {
    children: ReactNode;
    scrollable?: boolean; // if true, wrap with ScrollView
    contentContainerStyle?: ViewStyle;
    style?: ViewStyle;
};

const Screen = ({
    children,
    scrollable = false,
    contentContainerStyle,
    style,
}: ScreenProps) => {
    if (scrollable) {
        return (
            <ScrollView
                contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={[styles.inner, style]}>{children}</View>
            </ScrollView>
        );
    }

    return (
        <View style={[styles.inner, style]}>{children}</View>
    );
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
    },
});

export default Screen;
