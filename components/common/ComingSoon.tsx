import { Text } from "@/components";
import React from "react";
import { View } from "react-native";

type ComingSoonProps = {
    title?: string;
    message?: string;
};

const ComingSoon = ({
    title = "Coming Soon",
    message = "This feature is under development. Stay tuned for updates!",
}: ComingSoonProps) => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 24,
            }}
        >
            <Text
                variant="titleLarge"
                style={{ marginBottom: 8, textAlign: "center" }}
            >
                {title}
            </Text>
            <Text
                variant="bodyMedium"
                style={{ textAlign: "center", color: "#666" }}
            >
                {message}
            </Text>
        </View>
    );
};

export default ComingSoon;
