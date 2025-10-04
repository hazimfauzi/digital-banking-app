import React, { ComponentProps } from 'react';
import { Text as TextRNP } from 'react-native-paper';

type Props = ComponentProps<typeof TextRNP>;

const Text = ({ children, style, ...props }: Props) => {
    return (
        <TextRNP
            style={[{ marginBottom: 10 }, style]}
            {...props}
        >{children}</TextRNP>
    )
}

export default Text