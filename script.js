import { loginAsOwner, loginAsPublic } from './auth.js';
import { startVoiceRecognition } from './voice.js';

const chatInterface = document.getElementById("chat-interface");

document.getElementById("owner-btn").addEventListener("click", () => {
    // এখানে পিন/ফিংগারপ্রিন্ট ভেরিফিকেশন লজিক বসাও
    const pin = prompt("Enter Security PIN:");
    if(pin === "1234") {
        document.getElementById("auth-container").style.display = "none";
        chatInterface.style.display = "block";
    }
});

// ভয়েস কমান্ড লজিক
document.getElementById("voiceBtn").addEventListener("click", () => {
    startVoiceRecognition((text) => {
        if(text.toLowerCase().includes("hey kamine")) {
            console.log("Listening to Boss...");
            // কথা বলা এবং রেসপন্স লজিক
        }
    });
});
