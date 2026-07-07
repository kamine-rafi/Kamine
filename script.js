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

document.body.style.color="#111";

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
