import { Container, Screen, Text } from '@/components'
import React from 'react'

const Account = () => {
    return (
        <Screen>
            <Container style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }} >
                <Text>Account</Text>
            </Container>
        </Screen>
    )
}

export default Account