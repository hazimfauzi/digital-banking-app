import { Container, IconButton, Screen, Text } from "@/components";
import { router } from "expo-router";
import React from 'react';
import { View } from "react-native";

const Home = () => {
    return (
        <Screen>
            <Container>
                <View style={{ backgroundColor: '#ecf3ff', padding: 30, borderRadius: 10 }}>
                    <View style={{ marginBottom: 10, justifyContent: 'center', alignItems: 'center', }}>
                        <Text variant={'titleSmall'}>Total balance</Text>
                        <Text variant={'displaySmall'} style={{ fontWeight: 'bold' }}>RM 1,000.00</Text>
                    </View>
                    <View style={{ flexWrap: "nowrap", flexDirection: 'row', justifyContent: 'space-around' }}>
                        <IconButton label="Add money" icon={'plus'} isFilled size={35} style={{ marginHorizontal: 20 }}
                            onPress={() => router.navigate('/subscription')}
                        />
                        <IconButton label="Receive" icon={'arrow-bottom-left'} isFilled size={35} style={{ marginHorizontal: 20 }}
                            onPress={() => router.navigate('/receive')}
                        />
                        <IconButton label="Transfer" icon={'arrow-top-right'} isFilled size={35} style={{ marginHorizontal: 20 }}
                            onPress={() => router.navigate('/transfer')}
                        />
                    </View>
                </View>
            </Container>
        </Screen>
    );
}

export default Home;
