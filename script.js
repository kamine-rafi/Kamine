const input = document.getElementById("msg");
const sendBtn = document.getElementById("sendBtn");
const voiceBtn = document.getElementById("voiceBtn");
const avatar = document.getElementById("avatar");

// মেসেজ পাঠানোর ফাংশন
function sendMessage() {
    const text = input.value;
    if (!text) return;
    
    avatar.src = "talking.gif"; // কথা বলার অ্যানিমেশন
    console.log("Sending to AI:", text);
    
    // এখানে তোমার API কল বসাবে
    input.value = "";
    setTimeout(() => avatar.src = "idle.gif", 3000); // ৩ সেকেন্ড পর আবার আইডিয়াল
}

sendBtn.addEventListener("click", sendMessage);

// ভয়েস লজিক
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
voiceBtn.addEventListener("click", () => {
    recognition.start();
    avatar.src = "talking.gif";
});

recognition.onresult = (event) => {
    input.value = event.results[0][0].transcript;
    sendMessage();
};
