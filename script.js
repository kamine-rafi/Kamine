// ======================================
// Kamine AI v2 - Core Engine
// Owner: KM Rafi Chowdhury
// ======================================

const chat = document.getElementById("chat");
const input = document.getElementById("msg");
const newChat = document.getElementById("newChat");

// Local Storage Key
const STORAGE_KEY = "kamine_chat_v2";

// Load Chat
window.onload = () => {

    const saved = localStorage.getItem(STORAGE_KEY);

    if(saved){

        chat.innerHTML = saved;

    }

}

// Save Chat
function saveChat(){

    localStorage.setItem(
        STORAGE_KEY,
        chat.innerHTML
    );

}

// Add Message
function addMessage(text,type){

    const div=document.createElement("div");

    div.className=`message ${type}`;

    div.innerHTML=text;

    chat.appendChild(div);

    chat.scrollTop=chat.scrollHeight;

    saveChat();

}

// Fake AI
function fakeReply(text){

    text=text.toLowerCase();

    if(text.includes("hello") || text.includes("hi")){

        return "👋 Hello! I am Kamine AI.";

    }

    if(text.includes("owner")){

        return "👤 My owner is KM Rafi Chowdhury.";

    }

    if(text.includes("name")){

        return "🤖 My name is Kamine.";

    }

    if(text.includes("time")){

        return new Date().toLocaleTimeString();

    }

    return "🙂 I'm ready. Soon I'll connect to OpenAI.";

}

// Send
function send(){

    const text=input.value.trim();

    if(text==="") return;

    addMessage(text,"user");

    input.value="";

    const typing=document.createElement("div");

    typing.className="message ai";

    typing.innerHTML="🤖 Kamine is typing...";

    chat.appendChild(typing);

    chat.scrollTop=chat.scrollHeight;

    setTimeout(()=>{

        typing.remove();

        addMessage(fakeReply(text),"ai");

    },700);

}

// Enter Key
input.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        send();

    }

});

// New Chat
newChat.onclick=()=>{

    if(confirm("Start a new chat?")){

        chat.innerHTML=`
        <div class="message ai">
        👋 Welcome to Kamine AI.
        </div>
        `;

        saveChat();

    }

};

console.log("✅ Kamine Core Loaded");
