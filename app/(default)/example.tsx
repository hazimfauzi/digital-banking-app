import { Container, Screen, Text } from "@/components";
import React from 'react';

const index = () => {
  return (
    <Screen>
      <Container style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Text>Default</Text>
      </Container>
    </Screen>
  )
}

export default index;
