/* Kamine AI - Owner Controller */

const OwnerController = {
    // পিন ভেরিফিকেশন লজিক
    verifyPin(inputPin, successCallback, errorCallback) {
        const CORRECT_PIN = "1234"; // তোমার পছন্দের পিন এখানে দাও

        if (inputPin === CORRECT_PIN) {
            console.log("Owner Verified!");
            // পিন ঠিক হলে অ্যাপ অ্যাক্টিভেট হবে
            if (typeof successCallback === 'function') successCallback();
        } else {
            console.error("Wrong PIN attempt!");
            // পিন ভুল হলে এরর মেসেজ
            if (typeof errorCallback === 'function') errorCallback();
        }
    },

    // মালিকানা চেক করার ফাংশন
    isOwnerLoggedIn() {
        return localStorage.getItem('is_owner_active') === 'true';
    },

    setOwnerLoggedIn(status) {
        localStorage.setItem('is_owner_active', status);
    }
};

export default OwnerController;
