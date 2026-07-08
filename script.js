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

}

// ==========================
// AI Reply
// ==========================

function getReply(text) {

    if (typeof getOfflineReply === "function") {

        return getOfflineReply(text);

    }

    return "🙂 Kamine Brain Offline.";

}

// ==========================
// Send Message
// ==========================

function sendMessage() {

    const text = inputBox.value.trim();

    if (!text) return;

    addMessage(text, "user");

    inputBox.value = "";

    const reply = getReply(text);

    setTimeout(() => {

        addMessage(reply, "ai");

        if (typeof speak === "function") {
            speak(reply);
        }

    }, 300);

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

        addMessage("👋 Welcome back, Boss.<br><br>I'm Kamine.<br>Offline Mode is Ready.");

    }

};

console.log("✅ Kamine Core Loaded");
