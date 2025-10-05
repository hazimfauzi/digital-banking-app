import { Container, Screen, Text } from "@/components";
import React from 'react';

const Notification = () => {
  return (
    <Screen>
      <Container style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Text>Notification</Text>
      </Container>
    </Screen>
  )
}

export default Notification;
