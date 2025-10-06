import React, { ComponentProps } from 'react';
import { TextInput as TextInputRNP } from 'react-native-paper';

type Props = ComponentProps<typeof TextInputRNP>;

const TextInput = ({ mode, ...props }: Props) => {
    return (
        <TextInputRNP
            {...props}
        />
    );
}

export default TextInput;