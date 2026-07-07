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
