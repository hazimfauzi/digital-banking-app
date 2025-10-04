
import { Button, Container, Screen } from '@/components'
import React from 'react'
import { Avatar, Card } from 'react-native-paper'

const Settings = () => {
    return (
        <Screen>
            <Container>
                <Card.Title
                    title="Name"
                    subtitle="email"
                    left={(props) => <Avatar.Icon {...props} icon='account' />}
                    style={{ borderRadius: 15, marginBottom: 20, backgroundColor: 'white' }}
                />
                <Button navType='replace' href="/">Logout</Button>
            </Container>
        </Screen>
    )
}

export default Settings