import { Container, Screen, Text } from "@/components";
import React from 'react';

const Receive = () => {
  return (
    <Screen>
      <Container style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Text>Receive</Text>
      </Container>
    </Screen>
  )
}

export default Receive;
