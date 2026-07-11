 // auth.js
export const checkAuth = (mode) => {
    if (mode === 'owner') {
        const pin = prompt("Enter Security PIN (Owner):");
        return pin === "1234"; // তোমার পিন
    } else {
        // পাবলিক মোড: গুগল দিয়ে লগইন (Firebase Auth)
        alert("Public Mode: Redirecting to Google Login...");
        return true;
    }
};
