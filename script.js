/* ==========================================
   Kamine AI Offline v1.0
   Core Engine
========================================== */

const chat = document.getElementById("chat");
const input = document.getElementById("msg");
const sendBtn = document.getElementById("sendBtn");
const voiceBtn = document.getElementById("voiceBtn");

// Add Message
function addMessage(text, type) {

    const div = document.createElement("div");

    div.className = "message " + type;

    div.innerHTML = text;

    chat.appendChild(div);

    chat.scrollTop = chat.scrollHeight;

}

// AI Reply
function reply(text){

    if(typeof getOfflineReply === "function"){

        return getOfflineReply(text);

    }

    return "Hello Boss.";

}

// Send
function sendMessage(){

    const text = input.value.trim();

    if(text==="") return;

    addMessage(text,"user");

    input.value="";

    setTimeout(()=>{

        const ai = reply(text);

        addMessage(ai,"ai");

    },400);

}

// Button
sendBtn.onclick = sendMessage;

// Enter
input.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        sendMessage();

    }

});

console.log("✅ Core Ready");
/* ==========================================
   Kamine AI Offline v1.0
   Part 2 - Boss Mode + Commands
========================================== */

// Boss Mode
const BOSS_NAME = "Boss";

// Offline Command Processor
function processCommand(text){

    const cmd = text.trim().toLowerCase();

    // Greeting
    if(cmd==="hello" || cmd==="hi" || cmd==="hey"){

        return "👋 Hello " + BOSS_NAME + "! I'm Kamine. How can I help you today?";

    }

    // Identity
    if(cmd==="who are you"){

        return "🤖 I'm Kamine, your personal AI assistant.";

    }

    // Owner
    if(cmd==="owner"){

        return "👤 My owner is KM Rafi Chowdhury.";

    }

    // Name
    if(cmd==="name"){

        return "🤖 My name is Kamine.";

    }

    // Time
    if(cmd==="time"){

        return "🕒 " + new Date().toLocaleTimeString();

    }

    // Date
    if(cmd==="date"){

        return "📅 " + new Date().toLocaleDateString();

    }

    // Thanks
    if(cmd==="thanks" || cmd==="thank you"){

        return "😊 You're welcome, Boss.";

    }

    // Help
    if(cmd==="help"){

        return `
Available Commands

• hello
• owner
• name
• time
• date
• who are you
• thanks
• help
`;

    }

    return null;

}

// Replace reply()
function reply(text){

    const offline = processCommand(text);

    if(offline){

        return offline;

    }

    if(typeof getOfflineReply==="function"){

        return getOfflineReply(text);

    }

    return "🙂 Sorry Boss, I don't understand that yet.";

}
