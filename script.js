// Firebase কনফিগারেশন
const firebaseConfig = {
  apiKey: "AIzaSyBPf2yQQ1ixTG7y3RBqE5aJj_HcQ3OaoC8",
  authDomain: "kanine-rafi.firebaseapp.com",
  projectId: "kanine-rafi",
  storageBucket: "kanine-rafi.firebasestorage.app",
  messagingSenderId: "219986114815",
  appId: "1:219986114815:web:b1b549b6fdd991573434ca"
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

// ২. পিন ও লগইন লজিক
function verifyPin() {
    if (document.getElementById('pin-input').value === "1234") showApp();
    else alert("ভুল পিন!");
}

function loginWithGoogle() {
    auth.signInWithPopup(provider)
        .then(() => showApp())
        .catch(e => alert("লগইন এরর: " + e.message));
}

function showApp() {
    document.getElementById('owner-verification').style.display = 'none';
    document.getElementById('app').style.display = 'block';
}

// ৩. ভয়েস ইনপুট
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'bn-BD';
function startVoiceInput() { recognition.start(); }
recognition.onresult = (e) => {
    document.getElementById('user-input').value = e.results[0][0].transcript;
    sendMessage();
};

// ৪. চ্যাট মেসেজ
function sendMessage() {
    const input = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    if (!input.value.trim()) return;

    chatBox.innerHTML += `<div class="message user-msg">${input.value}</div>`;
    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
}
