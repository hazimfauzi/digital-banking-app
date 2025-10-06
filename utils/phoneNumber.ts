/**
 * Removes spaces, dashes, and "+" prefix from a phone number.
 * Example:
 *  "+60 12-345 6789" => "60123456789"
 *  "60-12 3456789" => "60123456789"
 */
export const formatPhoneNumber = (number?: string): string | undefined => {
    if (!number) return undefined;
    return number.replace(/[\s\-]/g, "").replace(/^\+/, "");
};

/**
 * Validates that the phone number:
 * ✅ Starts with a country code (e.g. 60)
 * ✅ Contains only digits
 * ✅ Has at least 10 digits total
 * ❌ Does NOT start with 0
 *
 * Example valid: 60123456789
 */
export const isValidPhoneNumber = (number?: string): boolean => {
    if (!number) return false;
    if (!/^\d+$/.test(number)) return false;     // only digits
    if (/^0/.test(number)) return false;         // cannot start with 0
    if (!/^60\d{8,}$/.test(number)) return false; // must start with 60 and have >=10 digits
    return true;
};
