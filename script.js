/* Kamine AI - Main Controller */

// লোগো ৩ সেকেন্ড পর সরিয়ে ফেলা
window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash');
        if (splash) splash.style.display = 'none';
    }, 3000);
});

// এলিমেন্টগুলো ধরা
const authContainer = document.getElementById("auth-container");
const chatInterface = document.getElementById("chat-interface");
const avatar = document.getElementById("avatar");
const msgInput = document.getElementById("msg");
const sendBtn = document.getElementById("sendBtn");
const voiceBtn = document.getElementById("voiceBtn");

// ওনার মোড ভেরিফিকেশন
document.getElementById("owner-btn").addEventListener("click", () => {
    const pin = prompt("Enter Security PIN:");
    if (pin === "1234") { // তোমার সেট করা পিন
        authContainer.style.display = "none";
        chatInterface.style.display = "block";
        console.log("Logged in as Boss");
    } else {
        alert("ভুল পিন, বস!");
    }
});

// পাবলিক মোড
document.getElementById("public-btn").addEventListener("click", () => {
    authContainer.style.display = "none";
    chatInterface.style.display = "block";
    console.log("Logged in as Public User");
});

// মেসেজ পাঠানোর লজিক
sendBtn.addEventListener("click", () => {
    if (!msgInput.value) return;
    
    // অবতারের মুড পরিবর্তন (talking.gif)
    avatar.src = "talking.gif";
    
    // ২ সেকেন্ড পর আবার idle এ ফিরে আসা
    setTimeout(() => {
        avatar.src = "idle.gif";
        msgInput.value = "";
    }, 2000);
});

// ভয়েস কমান্ড লজিক
voiceBtn.addEventListener("click", () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'bn-BD';
    recognition.start();

    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        msgInput.value = text;
        sendBtn.click();
    };
});
