const msgInput = document.getElementById("msg");
const sendBtn = document.getElementById("sendBtn");
const voiceBtn = document.getElementById("voiceBtn");
const avatar = document.getElementById("avatar");

// ১. সেন্ড বাটনে ক্লিক করলে
sendBtn.addEventListener("click", () => {
    const text = msgInput.value;
    if (text.trim() === "") return;

    console.log("Sending:", text);
    avatar.src = "talking.gif"; // কথা বলার অ্যানিমেশন শুরু
    
    // ২ সেকেন্ড পর আবার Idle মোডে ফেরা
    setTimeout(() => {
        avatar.src = "idle.gif";
        msgInput.value = "";
    }, 2000);
});

// ২. কিবোর্ডের Enter চাপলে
msgInput.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') sendBtn.click();
});

// ৩. ভয়েস বাটন
voiceBtn.addEventListener("click", () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'bn-BD';
    recognition.start();

    recognition.onresult = (event) => {
        msgInput.value = event.results[0][0].transcript;
        sendBtn.click(); // ভয়েস পাওয়ার পর অটো সেন্ড হবে
    };
});
