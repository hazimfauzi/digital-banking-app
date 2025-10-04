import { Href, useRouter } from 'expo-router';
import { ComponentProps, ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Button as ButtonRNP } from 'react-native-paper';

type Props = ComponentProps<typeof ButtonRNP>;

type NavigationType = 'navigate' | 'replace' | 'push';

type ButtonProps = {
    children: ReactNode;
    href?: Href;
    navType?: NavigationType;
    onPress?: () => void;
} & Props;

const Button = ({ children, href, navType = 'navigate', onPress, mode = 'contained', ...rest }: ButtonProps) => {
    const router = useRouter();

    const handlePress = () => {
        if (onPress) return onPress();

        if (href) {
            switch (navType) {
                case 'replace':
                    router.replace(href);
                    break;
                case 'push':
                    router.push(href);
                    break;
                default:
                    router.navigate(href);
            }
        }
    };

    return (
        <ButtonRNP
            mode={mode}
            style={styles.button}
            {...rest}
            onPress={handlePress}
        >
            {children || 'Button'}
        </ButtonRNP>
    );
};

const styles = StyleSheet.create({
    button: {
        marginVertical: 5,
    },
});

export default Button;