document.addEventListener("DOMContentLoaded", () => {
    const avatar = document.getElementById("avatar");
    const avatarContainer = document.getElementById("ai-avatar-container");
    const sendBtn = document.getElementById("sendBtn");
    const voiceBtn = document.getElementById("voiceBtn");
    const input = document.getElementById("msg");

    // অ্যানিমেশন ফাংশন
    window.updateAvatar = (mode) => {
        if (!avatar) return;
        const time = new Date().getTime();
        if (mode === "talking") avatar.src = `talking.gif?t=${time}`;
        else if (mode === "shy") avatar.src = `shy.gif?t=${time}`;
        else avatar.src = `idle.gif?t=${time}`;
    };

    // ভয়েস এপিআই লজিক
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'bn-BD, en-US';

    voiceBtn.addEventListener("click", () => {
        recognition.start();
        updateAvatar("talking");
    });

    recognition.onresult = (event) => {
        input.value = event.results[0][0].transcript;
        updateAvatar("idle");
    };

    // মেসেজ সেন্ড লজিক
    sendBtn.addEventListener("click", () => {
        if (!input.value) return;
        updateAvatar("talking");
        setTimeout(() => updateAvatar("idle"), 3000);
        input.value = "";
    });

    // স্প্ল্যাশ স্ক্রিন রিমুভ
    setTimeout(() => {
        document.getElementById("splash").style.display = "none";
        // লগইন করার পর অবতার দেখাবে (auth.js থেকে কল করতে পারো)
    }, 3000);
});
