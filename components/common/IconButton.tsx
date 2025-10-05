import { Text } from '@/components';
import React, { ComponentProps } from 'react';
import { View } from 'react-native';
import { IconButton as IconButtonRNP, useTheme } from 'react-native-paper';

type Props = ComponentProps<typeof IconButtonRNP>;
type TextProps = ComponentProps<typeof Text>;

type IconButtonProps = {
    label?: string,
    labelStyle?: TextProps,
    isFilled?: boolean,
} & Props;

const IconButton = ({ mode = "contained", label, labelStyle, isFilled, disabled, ...props }: IconButtonProps) => {
    const theme = useTheme();
    return (
        <View style={{ alignItems: "center" }}>
            <IconButtonRNP
                {...props}
                mode={mode}
                iconColor={isFilled ? theme.colors.onPrimary : theme.colors.primary}
                containerColor={isFilled ? theme.colors.primary : theme.colors.surfaceVariant}
                disabled={disabled}
            />
            {label && (
                <Text
                    variant={'labelMedium'}
                    style={[
                        labelStyle,
                    ]}
                    disabled={disabled}
                >
                    {label}
                </Text>
            )}
        </View>
    )
}

export default IconButton