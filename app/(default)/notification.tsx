import { ComingSoon, Container, Screen } from "@/components";
import React from "react";

const Notification = () => {
  return (
    <Screen>
      <Container style={{ flex: 1 }}>
        <ComingSoon />
      </Container>
    </Screen>
  );
};

export default Notification;
