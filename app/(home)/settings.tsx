
import { Button, Container, Screen } from '@/components'
import { useAuth } from '@/context'
import React from 'react'
import { Avatar, Card } from 'react-native-paper'

const Settings = () => {
    const { session, logout } = useAuth();
    return (
        <Screen>
            <Container>
                <Card.Title
                    title={session?.email}
                    subtitle={session?.email}
                    left={(props) => <Avatar.Icon {...props} icon='account' />}
                    style={{ borderRadius: 15, marginBottom: 20, backgroundColor: 'white' }}
                />
                <Button onPress={logout}>Logout</Button>
            </Container>
        </Screen>
    )
}

export default Settings