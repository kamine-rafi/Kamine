document.addEventListener("DOMContentLoaded", () => {
    console.log("Kamine AI Started 🚀");

    const button = document.querySelector("button");

    if (button) {
        button.addEventListener("click", () => {
            alert("Welcome to Kamine AI!\nOwner Mode will be added soon.");/* ===========================
   Kamine Voice + Theme
=========================== */

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if (SpeechRecognition) {

const recognition = new SpeechRecognition();

recognition.lang = "bn-BD";

recognition.continuous = false;

recognition.interimResults = false;

voiceBtn.onclick = () => {

recognition.start();

voiceBtn.innerHTML="🎙️";

};

recognition.onresult=(e)=>{

input.value=e.results[0][0].transcript;

voiceBtn.innerHTML="🎤";

};

recognition.onend=()=>{

voiceBtn.innerHTML="🎤";

};

}else{

voiceBtn.style.display="none";

}

/* ===========================
Theme
=========================== */

let dark=true;

const themeBtn=document.createElement("button");

themeBtn.innerHTML="🌙";

themeBtn.style.marginLeft="10px";

document.querySelector(".bottom").appendChild(themeBtn);

themeBtn.onclick=()=>{

dark=!dark;

if(dark){

document.body.style.background="#0b1220";

document.body.style.color="#fff";

themeBtn.innerHTML="🌙";

}else{

document.body.style.background="#f2f2f2";

document.body.style.color="#111";/* ==========================================
   Kamine Part 5
   File + Export + Clear + Settings
========================================== */

// File Upload Button
const fileBtn = document.createElement("button");
fileBtn.innerHTML = "📎";
document.querySelector(".bottom").prepend(fileBtn);

const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.accept = "image/*,.pdf,.txt,.doc,.docx";
fileInput.style.display = "none";
document.body.appendChild(fileInput);

fileBtn.onclick = () => fileInput.click();

fileInput.onchange = () => {

const file = fileInput.files[0];

if(!file) return;

addMessage(
`📎 Selected File:<br><b>${file.name}</b><br>${Math.round(file.size/1024)} KB`,
"user"
);

if(file.type.startsWith("image/")){

const reader = new FileReader();

reader.onload = e => {

addMessage(
`<img src="${e.target.result}" style="max-width:220px;border-radius:12px;">`,
"user"
);

};

reader.readAsDataURL(file);

}

};

// Clear Chat
const clearBtn = document.createElement("button");

clearBtn.innerHTML="🗑️";

document.querySelector(".bottom").appendChild(clearBtn);

clearBtn.onclick=()=>{

if(confirm("Clear all chats?")){

chat.innerHTML="";

localStorage.removeItem("kamine-chat");

}

};

// Export Chat

const exportBtn=document.createElement("button");

exportBtn.innerHTML="💾";

document.querySelector(".bottom").appendChild(exportBtn);

exportBtn.onclick=()=>{

const text=chat.innerText;

const blob=new Blob([text],{type:"text/plain"});

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="Kamine-Chat.txt";

a.click();

};

// Settings

const settingsPanel=document.createElement("div");

settingsPanel.style.position="fixed";

settingsPanel.style.top="60px";

settingsPanel.style.right="20px";

settingsPanel.style.width="260px";

settingsPanel.style.background="#1f2937";

settingsPanel.style.padding="20px";

settingsPanel.style.borderRadius="15px";

settingsPanel.style.display="none";

settingsPanel.innerHTML=`

<h3>⚙ Kamine Settings</h3>

<hr><br>

<label>

<input type="checkbox" checked>

Typing Animation

</label>

<br><br>

<label>

<input type="checkbox" checked>

Voice

</label>

<br><br>

<label>

<input type="checkbox">

Notifications

</label>

`;

document.body.appendChild(settingsPanel);

document.querySelector(".menu button").onclick=()=>{

settingsPanel.style.display=

settingsPanel.style.display==="none"

?"block"

:"none";

};

console.log("✅ Kamine Part 5 Loaded");

themeBtn.innerHTML="☀️";

}

};

/* ===========================
Typing Animation
=========================== */

const style=document.createElement("style");

style.innerHTML=`

#typing{

animation:blink 1s infinite;

}

@keyframes blink{

0%{opacity:.3;}

50%{opacity:1;}

100%{opacity:.3;}

}

`;

document.head.appendChild(style);

/* ===========================
Future Features
=========================== */

console.log("✅ Voice Ready");
console.log("✅ Theme Ready");
console.log("✅ Kamine v0.6");
        });
    }
}); 
/* ============================
   Kamine Part 6
   Chat System
============================ */

const input = document.querySelector("input");
const sendBtn = document.querySelector(".send-btn");
const messages = document.querySelector(".messages");

if (sendBtn && input && messages) {

sendBtn.addEventListener("click", sendMessage);

input.addEventListener("keypress", function(e){
if(e.key==="Enter"){
sendMessage();
}
});

function sendMessage(){

const text=input.value.trim();

if(text==="") return;

messages.innerHTML += `
<div class="user-message">
👤 ${text}
</div>
`;

input.value="";

setTimeout(()=>{

messages.innerHTML += `
<div class="bot-message">
🤖 Kamine: আমি এখন Demo Mode-এ আছি।
তোমার মেসেজ ছিল:
"${text}"
</div>
`;

messages.scrollTop=messages.scrollHeight;

},700);

}

}
/* ==========================
   Kamine Part 7
   AI API Connection
========================== */

async function askKamine(question){

    try{

        const response = await fetch(
            "https://YOUR_WORKER_URL/chat",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    message:question
                })
            }
        );

        const data = await response.json();

        return data.reply;

    }catch(err){

        console.error(err);

        return "❌ Kamine server is offline.";

    }

}
