import * as LocalAuthentication from 'expo-local-authentication';

export async function authenticateUser() {
    try {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        if (!hasHardware) {
            return { success: false, reason: 'NO_HARDWARE' };
        }

        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (!isEnrolled) {
            return { success: false, reason: 'NOT_ENROLLED' };
        }

        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Authenticate to log in',
            fallbackLabel: 'Use passcode',
            cancelLabel: 'Cancel',
            disableDeviceFallback: false,
        });

        return result.success
            ? { success: true }
            : { success: false, reason: 'AUTH_FAILED' };
    } catch (err) {
        return { success: false, reason: 'ERROR' };
    }
}
