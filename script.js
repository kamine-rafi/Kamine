// Firebase কনফিগারেশন
const firebaseConfig = {
  apiKey: "AIzaSyBPf2yQQ1ixTG7y3RBqE5aJj_HcQ3OaoC8",
  authDomain: "kanine-rafi.firebaseapp.com",
  projectId: "kanine-rafi",
  storageBucket: "kanine-rafi.firebasestorage.app",
  messagingSenderId: "219986114815",
  appId: "1:219986114815:web:b1b549b6fdd991573434ca",
  measurementId: "G-GTFQ5YFLEF"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// ১. স্প্ল্যাশ স্ক্রিন
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('owner-verification').style.display = 'flex';
    }, 2000);
});

// ২. লগইন ও ভেরিফিকেশন
function verifyPin() {
    if (document.getElementById('pin-input').value === "1234") showApp();
    else alert("ভুল পিন!");
}

function loginWithGoogle() {
    auth.signInWithPopup(provider).then(showApp).catch(e => alert(e.message));
}

function showApp() {
    document.getElementById('owner-verification').style.display = 'none';
    document.getElementById('app').style.display = 'block';
}

// ৩. চ্যাট মেসেজ লজিক (নিশ্চিতভাবে মেসেজ দেখানোর জন্য)
function sendMessage() {
    const input = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const message = input.value.trim();
    
    if (!message) return;

    // ইউজার মেসেজ রেন্ডার করা
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message user-msg';
    msgDiv.textContent = message;
    chatBox.appendChild(msgDiv);
    
    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ভয়েস লজিক
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'bn-BD';
function startVoiceInput() { recognition.start(); }
recognition.onresult = (e) => {
    document.getElementById('user-input').value = e.results[0][0].transcript;
    sendMessage();
};
