import KamineMemory from './memory.js';
import VoiceController from './voice.js';
import OwnerController from './Owner.js';

const avatar = document.getElementById("avatar");
const input = document.getElementById("msg");
const sendBtn = document.getElementById("sendBtn");
const voiceBtn = document.getElementById("voiceBtn");
const loginModal = document.getElementById("owner-login-modal");

// পিন ভেরিফিকেশন
document.getElementById("verify-pin-btn").addEventListener("click", () => {
    const pin = document.getElementById("owner-pin").value;
    OwnerController.verifyPin(pin, () => {
        loginModal.style.display = "none";
        document.getElementById("ai-avatar-container").style.display = "flex";
    }, () => alert("ভুল পিন!"));
});

// মেসেজ সেন্ড
sendBtn.addEventListener("click", () => {
    if (!input.value) return;
    KamineMemory.saveMessage("user", input.value);
    KamineMemory.updateMood('talking');
    
    setTimeout(() => {
        KamineMemory.updateMood('idle');
        input.value = "";
    }, 3000);
});

// ভয়েস লজিক
voiceBtn.addEventListener("click", () => {
    VoiceController.startListening((text) => {
        input.value = text;
        sendBtn.click();
    });
});

// মুড চেঞ্জ হলে অবতার আপডেট
window.addEventListener('moodChanged', (e) => {
    const time = new Date().getTime();
    avatar.src = `${e.detail.mood}.gif?t=${time}`;
});
