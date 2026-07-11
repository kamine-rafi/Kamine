/* ==========================================
   Kamine AI v2.0
   Core Controller - Optimized for Animations
   Created by KM Rafi Chowdhury
========================================== */

"use strict";

// DOM Elements
const chatBox = document.getElementById("chat");
const inputBox = document.getElementById("msg");
const sendBtn = document.getElementById("sendBtn");
const voiceBtn = document.getElementById("voiceBtn");
const avatar = document.getElementById("avatar"); // তোমার এআই ক্যারেক্টার ইমেজ আইডি

// এআই ক্যারেক্টার ইমেজ আপডেট ফাংশন
function updateAvatar(mode) {
    if (!avatar) return;
    if (mode === "talking") avatar.src = "talking.gif?t=" + new Date().getTime();
    else if (mode === "shy") avatar.src = "shy.gif?t=" + new Date().getTime();
    else avatar.src = "idle.gif?t=" + new Date().getTime();
}

// Add Message
function addMessage(text, type = "ai") {
    const message = document.createElement("div");
    message.className = "message " + type;
    message.innerHTML = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
    if (typeof saveChat === "function") saveChat();
    return message;
}

// AI Reply
async function getReply(text) {
    updateAvatar("talking"); // কথা বলার সময় টকিং জিআইএফ
    
    if (typeof memoryReply === "function") {
        const reply = memoryReply(text);
        if (reply) { updateAvatar("idle"); return reply; }
    }

    if (typeof getOfflineReply === "function") {
        const reply = getOfflineReply(text);
        if (reply && !reply.includes("Sorry Boss")) { updateAvatar("idle"); return reply; }
    }

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });
        const data = await response.json();
        updateAvatar("idle"); // রেসপন্স এলে আবার আইডল মোডে আসবে
        return data.reply || "Thinking error, Boss.";
    } catch (error) {
        updateAvatar("shy"); // এরর হলে লজ্জা পাওয়ার জিআইএফ
        return `🌐 কানেকশন এরর: ${error.message}`;
    }
}

// Send Message
async function sendMessage() {
    const text = inputBox.value.trim();
    if (!text) return;
    addMessage(text, "user");
    inputBox.value = "";
    const thinkingMessage = addMessage("🤔 Kamine is thinking...", "ai");
    const reply = await getReply(text);
    thinkingMessage.remove();
    addMessage(reply, "ai");
    if (typeof speak === "function") speak(reply);
}

// Events
sendBtn.addEventListener("click", sendMessage);
inputBox.addEventListener("keydown", (e) => { if (e.key === "Enter") sendMessage(); });

// Splash Screen Logic (৩ সেকেন্ড লোগো দেখাবে)
window.addEventListener("load", function () {
    setTimeout(function () {
        const splash = document.getElementById("splash");
        if (splash) {
            splash.classList.add("splash-hide");
            setTimeout(() => { splash.remove(); updateAvatar("idle"); }, 800);
        }
    }, 3000);
});

console.log("✅ Kamine Core Loaded with Animation Support");
