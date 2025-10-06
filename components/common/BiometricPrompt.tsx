import { defaultApi } from "@/api/axiosClient";
import { useAuth } from "@/context";
import * as LocalAuthentication from "expo-local-authentication";
import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

const BiometricPrompt = () => {
    const { user, updateUser } = useAuth();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const checkBiometric = async () => {
            if (!user || user.biometricEnabled) return;

            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();

            if (hasHardware && isEnrolled) {
                setVisible(true);
            }
        };

        checkBiometric();
    }, [user]);

    const handleEnable = async () => {
        try {
            await defaultApi.post("/biometric/enable", {
                phone: user?.phone,
                enabled: true,
            });

            await updateUser({ biometricEnabled: true });
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Biometric login enabled!'
            });
            setVisible(false);
        } catch (err) {
            console.error(err);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to enable biometric login'
            });
        }
    };

    const handleSkip = () => {
        setVisible(false);
    };

    if (!user) return null;

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}>
                <View style={{ backgroundColor: "#fff", padding: 24, borderRadius: 16, width: "80%" }}>
                    <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 16 }}>Enable Biometric Authentication?</Text>
                    <Text style={{ marginBottom: 24 }}>
                        You can quickly log in using your fingerprint or face recognition.
                    </Text>
                    <TouchableOpacity
                        onPress={handleEnable}
                        style={{ backgroundColor: "#27496D", paddingVertical: 12, borderRadius: 12, alignItems: "center", marginBottom: 12 }}
                    >
                        <Text style={{ color: "#fff", fontWeight: "600" }}>Enable</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSkip} style={{ alignItems: "center" }}>
                        <Text style={{ color: "#888" }}>Skip</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default BiometricPrompt;
