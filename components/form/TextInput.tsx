import React, { ComponentProps } from 'react';
import { TextInput as TextInputRNP } from 'react-native-paper';

type TextInputRNPProps = ComponentProps<typeof TextInputRNP>;

type ButtonProps = {
} & TextInputRNPProps;

const TextInput = ({ mode, ...props }: ButtonProps) => {
    return (
        <TextInputRNP
            {...props}
        />
    );
}

export default TextInput;