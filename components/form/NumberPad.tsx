import React, { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

export type NumberPadProps = {
    maxLength?: number;
    onChange?: (value: string) => void;
    onSubmit?: (value: string) => void;
};

const NumberPad: React.FC<NumberPadProps> = ({
    maxLength = 6,
    onChange,
    onSubmit,
}) => {
    const [value, setValue] = useState('');

    const handlePress = (num: string) => {
        if (value.length < maxLength) {
            const newValue = value + num;
            setValue(newValue);
            onChange?.(newValue);

            if (newValue.length === maxLength) {
                onSubmit?.(newValue);
            }
        }
    };

    const handleDelete = () => {
        const newValue = value.slice(0, -1);
        setValue(newValue);
        onChange?.(newValue);
    };

    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '⌫', '0', '+'];

    return (
        <View style={styles.container}>
            {/* Display area */}
            <Text style={styles.display}>{value}</Text>

            {/* Keypad */}
            <View style={styles.pad}>
                {keys.map((key, index) => (
                    <Pressable
                        key={index}
                        onPress={() => {
                            if (key === '⌫') handleDelete();
                            else if (key !== '') handlePress(key);
                        }}
                        style={[
                            styles.button,
                            key === '' && { backgroundColor: 'transparent', elevation: 0 },
                        ]}
                    >
                        <Text style={styles.text}>{key}</Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
};

export default NumberPad;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    display: {
        fontSize: 32,
        marginBottom: 20,
        letterSpacing: 8,
    },
    pad: {
        width: width,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    button: {
        width: width / 3,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
    },
});
