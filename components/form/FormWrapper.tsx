import React, { ReactNode } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type FormWrapperProps = {
    children: ReactNode;
    keyboardOffset?: number; // e.g. offset for header
    contentContainerStyle?: object;
};

const FormWrapper = ({
    children,
    keyboardOffset = 80,
    contentContainerStyle,
}: FormWrapperProps) => {
    const insets = useSafeAreaInsets();

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={keyboardOffset + insets.top} // 👈 adds safe area + header offset
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.inner}>{children}</View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    inner: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
});

export default FormWrapper;
