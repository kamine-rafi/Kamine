 /* =====================================
   Kamine Commands v2.0
   Owner: KM Rafi Chowdhury
===================================== */

function getOfflineReply(text) {
const ownerReply = ownerCommand(text);

if(ownerReply){

return ownerReply;

}
    const msg = text.trim().toLowerCase();

    // Greeting
    if (["hi","hello","hey"].includes(msg)) {
        return "👋 Hello! I am Kamine AI.";
    }

    // Name
    if (msg === "name") {
        return "🤖 My name is Kamine.";
    }

    // Owner
    if (msg === "owner") {
        return "👤 My owner is KM Rafi Chowdhury.";
    }

    // Time
    if (msg === "time") {
        return "🕒 " + new Date().toLocaleTimeString();
    }

    // Date
    if (msg === "date") {
        return "📅 " + new Date().toLocaleDateString();
    }

    // Version
    if (msg === "version") {
        return "🚀 Kamine Version 2.0 (Offline)";
    }

    // Help
    if (msg === "help") {
        return `
Available Commands:

• hello
• name
• owner
• time
• date
• version
• help
`;
    }

    // Unknown
    return "🙂 I don't know that yet. I'll become smarter soon.";
}
