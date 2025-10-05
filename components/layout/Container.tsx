import React, { ComponentProps } from 'react';
import { View } from 'react-native';


type Props = ComponentProps<typeof View>;

const Container = ({ children, style, ...props }: Props) => {
    return (
        <View
            style={[{ padding: 10 }, style]}
            {...props}
        >
            {children}
        </View>
    )
}

export default Container