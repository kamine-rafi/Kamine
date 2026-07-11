// ১. Firebase কনফিগারেশন
const firebaseConfig = {
  apiKey: "AIzaSyBPf2yQQ1ixTG7y3RBqE5aJj_HcQ3OaoC8",
  authDomain: "kanine-rafi.firebaseapp.com",
  projectId: "kanine-rafi",
  storageBucket: "kanine-rafi.firebasestorage.app",
  messagingSenderId: "219986114815",
  appId: "1:219986114815:web:b1b549b6fdd991573434ca",
  measurementId: "G-GTFQ5YFLEF"
};

// ২. Firebase ইনিশিয়ালাইজেশন
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// ৩. স্প্ল্যাশ স্ক্রিন ও অ্যাপ লোডিং
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('owner-verification').style.display = 'flex';
    }, 3000);
});

// ৪. ভেরিফিকেশন লজিক
function verifyPin() {
    if (document.getElementById('pin-input').value === "1234") showApp();
    else alert("ভুল পিন!");
}

function loginWithGoogle() {
    auth.signInWithPopup(provider)
        .then(() => showApp())
        .catch(error => alert("লগইন ব্যর্থ: " + error.message));
}

function showApp() {
    document.getElementById('owner-verification').style.display = 'none';
    document.getElementById('app').style.display = 'block';
}

// ৫. ভয়েস এবং চ্যাট লজিক
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'bn-BD';

function startVoiceInput() { recognition.start(); }
recognition.onresult = (e) => {
    document.getElementById('user-input').value = e.results[0][0].transcript;
    sendMessage();
};

async function sendMessage() {
    const input = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const message = input.value.trim();
    if (!message) return;

    chatBox.innerHTML += `<div class="message user-msg">${message}</div>`;
    input.value = '';
    
    try {
        const res = await fetch('/api/chat', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        const data = await res.json();
        chatBox.innerHTML += `<div class="message ai-msg">${data.reply}</div>`;
        
        // Voice Feedback
        const speech = new SpeechSynthesisUtterance(data.reply);
        speech.lang = 'bn-BD';
        window.speechSynthesis.speak(speech);
        
    } catch (e) {
        chatBox.innerHTML += `<div class="message ai-msg">সার্ভার সংযোগ বিচ্ছিন্ন!</div>`;
    }
    chatBox.scrollTop = chatBox.scrollHeight;
}
