import { loginWithGoogle, logoutUser } from "./auth.js";
import { verifyOwnerPin, verifyOwnerBiometric } from "./owner.js";
import { startVoiceActivation, handleChatInput } from "./voice.js";

let currentMode = null;

// ১. ওপেন করলেই স্প্ল্যাশ স্ক্রিন ৩ সেকেন্ড থাকবে
window.onload = () => {
    setTimeout(() => {
        document.getElementById("splash-screen").classList.add("hidden");
        document.getElementById("mode-screen").classList.remove("hidden");
    }, 3000);
};

window.selectMode = function(mode) {
    document.getElementById("mode-screen").classList.add("hidden");
    if (mode === 'owner') {
        document.getElementById("owner-auth-screen").classList.remove("hidden");
    } else {
        document.getElementById("public-auth-screen").classList.remove("hidden");
    }
}

window.backToMode = function() {
    document.getElementById("owner-auth-screen").classList.add("hidden");
    document.getElementById("public-auth-screen").classList.add("hidden");
    document.getElementById("mode-screen").classList.remove("hidden");
}

window.handlePinVerify = function() {
    if (verifyOwnerPin()) {
        enterApp('owner');
    }
}

window.handleBiometricVerify = async function() {
    const success = await verifyOwnerBiometric();
    if (success) enterApp('owner');
}

window.handleGoogleLogin = async function() {
    const user = await loginWithGoogle();
    if (user) enterApp('public');
}

function enterApp(mode) {
    currentMode = mode;
    document.getElementById("owner-auth-screen").classList.add("hidden");
    document.getElementById("public-auth-screen").classList.add("hidden");
    document.getElementById("chat-interface").classList.remove("hidden");
    
    document.getElementById("current-mode-badge").innerText = mode === 'owner' ? "👑 Owner Mode" : "👥 Public Mode";

    if (mode === 'owner') {
        startVoiceActivation(); // ওনার মোডে ভয়েস একটিভেশন শুরু
    }
}

window.handleSendMessage = function() {
    const input = document.getElementById("user-input");
    const text = input.value.trim();
    if (text) {
        handleChatInput(text, currentMode);
        input.value = "";
    }
}

window.handleKeyPress = function(e) {
    if (e.key === 'Enter') window.handleSendMessage();
}

window.logout = function() {
    logoutUser();
    location.reload();
}
