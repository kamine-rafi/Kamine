export function verifyOwnerPin() {
    const pin = document.getElementById("pin-input").value;
    return pin === "1234"; // এখানে আপনার সেট করা পিন দিন
}

export async function verifyOwnerBiometric() {
    // Web Authentication API (WebAuthn) এখানে ব্যবহার করা যায়
    try {
        return true; // সিমুলেশন হিসেবে true রাখা হয়েছে
    } catch (e) {
        return false;
    }
}
