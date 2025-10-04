import Button from '@/components/common/Button'
import React from 'react'
import { Text, View } from 'react-native'

const Settings = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text>Settings</Text>
            <Button title="Go to Login" isReplace href="/" />
        </View>
    )
}

export default Settings