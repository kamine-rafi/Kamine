import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// ফায়ারবেস কনফিগারেশন
const firebaseConfig = {
  apiKey: "AizaSyBPf2yQQ1ixTG7y3RBqE5aJj_HcQ3OaoC8",
  authDomain: "kanine-rafi.firebaseapp.com",
  projectId: "kanine-rafi",
  storageBucket: "kanine-rafi.firebasestorage.app",
  messagingSenderId: "219986114815",
  appId: "1:219986114815:web:ee2b9da525da3d943434ca",
  measurementId: "G-3TKE5G8M9Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// DOM এলিমেন্টস
const googleLoginBtn = document.getElementById("google-login-btn");
const loginModal = document.getElementById("owner-login-modal");
const publicSignoutBtn = document.getElementById("public-signout-btn");
const userProfilePic = document.getElementById("user-profile-pic");
const userNameDisplay = document.getElementById("user-name-display");
const ownerPinInput = document.getElementById("owner-pin");
const verifyPinBtn = document.getElementById("verify-pin-btn");

const msgInput = document.getElementById("msg");
const sendBtn = document.getElementById("sendBtn");
const chatArea = document.getElementById("public-chat-area");
const voiceBtn = document.getElementById("voiceBtn");

let currentUserName = "বন্ধু";

// 🔐 ওনার পিন ভেরিফিকেশন
if (verifyPinBtn) {
    verifyPinBtn.addEventListener("click", () => {
        if (ownerPinInput.value === "1234") { 
            currentUserName = "Rafi Boss 👑";
            alert("স্বাগতম রাফি বস!");
            if (loginModal) loginModal.style.display = "none";
            updateWelcomeMessage();
        } else {
            alert("ভুল পিন! আবার চেষ্টা করো।");
            ownerPinInput.value = "";
        }
    });
}

// 🌐 পাবলিক গুগল লগইন
if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", async () => {
        try { await signInWithPopup(auth, provider); } catch (error) { alert("লগইন ব্যর্থ!"); }
    });
}

// 🚪 লগআউট
if (publicSignoutBtn) {
    publicSignoutBtn.addEventListener("click", async () => {
        await signOut(auth);
        location.reload();
    });
}

// 🔄 ইউজার স্টেট হ্যান্ডলার
onAuthStateChanged(auth, (user) => {
    if (user) {
        if (loginModal) loginModal.style.display = "none";
        currentUserName = user.displayName;
        
        if (userProfilePic && user.photoURL) { userProfilePic.src = user.photoURL; userProfilePic.style.display = "block"; }
        if (userNameDisplay) userNameDisplay.textContent = user.displayName;
        if (publicSignoutBtn) publicSignoutBtn.style.display = "block";
        
        updateWelcomeMessage();
    } else {
        if (loginModal) loginModal.style.display = "flex";
    }
    const splash = document.getElementById("splash");
    if (splash) setTimeout(() => splash.style.display = "none", 1000);
});

// 👋 ওয়েলকাম মেসেজ আপডেট
function updateWelcomeMessage() {
    chatArea.innerHTML = `
        <div class="message ai">
            👋 Welcome back!<br><br>
            I'm <b>Kamine AI</b>.<br>
            জি বস <b>${currentUserName}</b>, লগইন সফল হয়েছে! নিচে মেসেজ লিখে চ্যাট শুরু করুন।
        </div>
    `;
}

// ✉️ মেসেজ সেন্ড করার ফাংশন
function sendMessage() {
    const text = msgInput.value.trim();
    if (!text) return;

    // ইউজারের মেসেজ স্ক্রিনে দেখানো
    chatArea.innerHTML += `<div class="message user">${text}</div>`;
    msgInput.value = "";
    chatArea.scrollTop = chatArea.scrollHeight;

    // AI এর ডামি রিপ্লাই (এখানে পরে আসল AI API কানেক্ট করা যাবে)
    setTimeout(() => {
        chatArea.innerHTML += `<div class="message ai">জি <b>${currentUserName}</b>, আমি আপনার মেসেজটি পেয়েছি! কিন্তু আমার ব্রেন (API) কানেক্ট করা বাকি আছে।</div>`;
        chatArea.scrollTop = chatArea.scrollHeight;
    }, 1000);
}

if (sendBtn) sendBtn.addEventListener("click", sendMessage);
if (msgInput) msgInput.addEventListener("keypress", (e) => { if (e.key === "Enter") sendMessage(); });

// 🎤 ভয়েস রিকগনিশন (Voice On)
if (voiceBtn) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'bn-BD'; // বাংলা ভাষা সাপোর্ট

        voiceBtn.addEventListener("click", () => {
            recognition.start();
            voiceBtn.style.background = "#ef4444"; // রেকর্ডিং কালার লাল হবে
        });

        recognition.onresult = (event) => {
            const speechToText = event.results[0][0].transcript;
            msgInput.value = speechToText;
            voiceBtn.style.background = ""; // আগের কালারে ফেরত
        };

        recognition.onerror = () => { voiceBtn.style.background = ""; };
        recognition.onend = () => { voiceBtn.style.background = ""; };
    } else {
        voiceBtn.addEventListener("click", () => { alert("দুঃখিত বন্ধু, তোমার ব্রাউজারে ভয়েস সাপোর্ট করছে না!"); });
    }
}
