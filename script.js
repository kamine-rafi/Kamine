/* Kamine AI - Main Controller Script */

document.addEventListener("DOMContentLoaded", () => {
    const avatar = document.getElementById("avatar");
    const avatarContainer = document.getElementById("ai-avatar-container");
    const input = document.getElementById("msg");
    const sendBtn = document.getElementById("sendBtn");
    const voiceBtn = document.getElementById("voiceBtn");
    const loginModal = document.getElementById("owner-login-modal");

    // অবতার অ্যানিমেশন ফাংশন
    function setAvatarState(state) {
        if (!avatar) return;
        const timestamp = new Date().getTime();
        if (state === "talking") avatar.src = `talking.gif?t=${timestamp}`;
        else if (state === "shy") avatar.src = `shy.gif?t=${timestamp}`;
        else avatar.src = `idle.gif?t=${timestamp}`;
    }

    // পিন ভেরিফিকেশন (লগইন)
    const pinBtn = document.getElementById("verify-pin-btn");
    if (pinBtn) {
        pinBtn.addEventListener("click", () => {
            const pin = document.getElementById("owner-pin").value;
            if (pin === "1234") {
                loginModal.style.display = "none";
                if (avatarContainer) avatarContainer.style.display = "flex";
                setAvatarState("shy");
                setTimeout(() => setAvatarState("idle"), 3000);
            } else {
                alert("ভুল পিন!");
            }
        });
    }

    // মেসেজ সেন্ড ফাংশন
    function handleSendMessage() {
        if (!input.value) return;
        setAvatarState("talking");
        console.log("Processing:", input.value);
        
        // এখানে তোমার এপিআই কল লজিক বসাবে
        setTimeout(() => {
            setAvatarState("idle");
            input.value = "";
        }, 3000);
    }

    sendBtn.addEventListener("click", handleSendMessage);
    input.addEventListener("keypress", (e) => { if(e.key === 'Enter') handleSendMessage(); });

    // ভয়েস রিকগনিশন (মাইক বাটন)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'bn-BD, en-US';
        
        voiceBtn.addEventListener("click", () => {
            recognition.start();
            setAvatarState("talking");
        });

        recognition.onresult = (event) => {
            input.value = event.results[0][0].transcript;
            setAvatarState("idle");
            handleSendMessage();
        };
    } else {
        voiceBtn.style.display = "none"; // ব্রাউজার সাপোর্ট না করলে মাইক হাইড হবে
    }

    // স্প্ল্যাশ স্ক্রিন রিমুভ
    setTimeout(() => {
        const splash = document.getElementById("splash");
        if (splash) splash.style.display = "none";
    }, 3000);
});
