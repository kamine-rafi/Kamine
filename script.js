/* ==========================================
   Kamine AI v2.0
   Core Controller
   Created by KM Rafi Chowdhury
========================================== */

"use strict";

// ==========================
// DOM Elements
// ==========================

const chatBox = document.getElementById("chat");
const inputBox = document.getElementById("msg");
const sendBtn = document.getElementById("sendBtn");
const voiceBtn = document.getElementById("voiceBtn");

// ==========================
// Add Message
// ==========================

function addMessage(text, type = "ai") {

    const message = document.createElement("div");

    message.className = "message " + type;

    message.innerHTML = text;

    chatBox.appendChild(message);

    chatBox.scrollTop = chatBox.scrollHeight;

    if (typeof saveChat === "function") {
        saveChat();
    }
    
    return message; // পরবর্তীতে রিমুভ বা আপডেট করার জন্য রিটার্ন করা হলো
}

// ==========================
// AI Reply (OpenAI API Integration)
// ==========================

async function getReply(text) {

    // ১. Memory আগে চেক করবে
    if (typeof memoryReply === "function") {
        const reply = memoryReply(text);
        if (reply) return reply;
    }

    // ২. তারপর Offline Commands চেক করবে
    if (typeof getOfflineReply === "function") {
        const reply = getOfflineReply(text);
        // যদি অফলাইন কমান্ডে কোনো নির্দিষ্ট উত্তর থাকে (যা 'Sorry Boss' নয়), তবে সেটাই দেবে
        if (reply && !reply.includes("Sorry Boss")) {
            return reply;
        }
    }

    // ৩. অফলাইনে না মিললে Vercel-এর মাধ্যমে OpenAI API কল করবে
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: text })
        });

        const data = await response.json();
        
        if (data.reply) {
            return data.reply;
        } else {
            return "Thinking error, Boss. Check Vercel logs.";
        }
    } catch (error) {
        console.error("API Error:", error);
        return "🌐 Boss, I'm having trouble connecting to my online brain.";
    }
}


// ==========================
// Send Message
// ==========================

async function sendMessage() {

    const text = inputBox.value.trim();

    if (!text) return;

    addMessage(text, "user");

    inputBox.value = "";

    // "Kamine is thinking..." মেসেজ দেখানো
    const thinkingMessage = addMessage("🤔 Kamine is thinking...", "ai");

    // ব্যাক-এন্ড থেকে উত্তর আনা
    const reply = await getReply(text);

    // থিংকিং মেসেজটি মুছে আসল উত্তর বসানো
    thinkingMessage.remove();

    addMessage(reply, "ai");

    if (typeof speak === "function") {
        speak(reply);
    }
}

// ==========================
// Events
// ==========================

sendBtn.addEventListener("click", sendMessage);

inputBox.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        sendMessage();

    }

});

// ==========================
// Voice Button
// ==========================

if (voiceBtn) {

    voiceBtn.addEventListener("click", function () {

        if (typeof startVoice === "function") {

            startVoice();

        }

    });

}

// ==========================
// Welcome
// ==========================

window.onload = function () {

    if (typeof loadChat === "function") {

        loadChat();

    } else {

        addMessage("👋 Welcome back, Boss.<br><br>I'm Kamine.<br>Online Mode is Active via Vercel.");

    }

};

console.log("✅ Kamine Core Loaded with OpenAI API");

window.addEventListener("load", function () {

    setTimeout(function () {

        const splash = document.getElementById("splash");

        if (splash) {

            splash.classList.add("splash-hide");

            setTimeout(function () {

                splash.remove();

            }, 800);

        }

    }, 3000);

});
