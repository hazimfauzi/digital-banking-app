import { Route, useRouter } from 'expo-router';
import { ComponentProps } from 'react';
import { Button as ButtonRN } from 'react-native';

type ButtonProps = {
    title: string
    href?: Route
    isReplace?: boolean
    onPress?: () => void
} & ComponentProps<typeof ButtonRN>

const Button = ({ title, href, isReplace, onPress, ...rest }: ButtonProps) => {
    const router = useRouter()

    const handlePress = () => {
        if (onPress) {
            onPress()
        } else if (href) {
            if (isReplace) {
                return router.replace(href)
            }
            router.navigate(href)
        }
    }

    return <ButtonRN
        title={title}
        {...rest}
        onPress={handlePress}
    />
}

export default Button