/* ==========================================
   Kamine AI v2.0
   Offline Commands
========================================== */

"use strict";

function getOfflineReply(text) {

    const msg = text.trim().toLowerCase();

    // ==========================
    // Owner System
    // ==========================

    if (typeof ownerCommand === "function") {

        const ownerReply = ownerCommand(msg);

        if (ownerReply) {
            return ownerReply;
        }

    }

    // ==========================
    // Greetings
    // ==========================

    if (["hi", "hello", "hey", "assalamu alaikum"].includes(msg)) {
        return "👋 Hello Boss! I'm Kamine. How can I help you today?";
    }

    // ==========================
    // Identity
    // ==========================

    if (msg === "name") {
        return "🤖 My name is Kamine.";
    }

    if (msg === "who are you") {
        return "🤖 I'm Kamine AI, your offline assistant.";
    }

    if (msg === "owner") {
        return "👤 My owner is KM Rafi Chowdhury.";
    }

    if (msg === "boss") {
        return "👑 You are my Boss.";
    }

    // ==========================
    // Time & Date
    // ==========================

    if (msg === "time") {
        return "🕒 " + new Date().toLocaleTimeString();
    }

    if (msg === "date") {
        return "📅 " + new Date().toLocaleDateString();
    }

    // ==========================
    // Version
    // ==========================

    if (msg === "version") {
        return "🚀 Kamine AI v2.0 Offline";
    }

    // ==========================
    // Help
    // ==========================

    if (msg === "help") {

        return `📖 Available Commands

• hello
• name
• owner
• boss
• who are you
• time
• date
• version
• help
• owner login
• owner logout
• owner mode`;

    }

    // ==========================
    // Unknown
    // ==========================

    return "🙂 Sorry Boss, I don't know that yet.";

}
