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
const signoutBtn = document.getElementById("signout-btn");
const userProfilePic = document.getElementById("user-profile-pic");
const userNameDisplay = document.getElementById("user-name-display");
const ownerPinInput = document.getElementById("owner-pin");
const verifyPinBtn = document.getElementById("verify-pin-btn");

const msgInput = document.getElementById("msg");
const sendBtn = document.getElementById("sendBtn");
const chatArea = document.getElementById("chat-area");
const voiceBtn = document.getElementById("voiceBtn");

// মোড ট্র্যাক করার ভ্যারিয়েবল (ডিফল্ট: পাবলিক মোড)
let currentMode = "public"; 
let currentUserName = "User";

// 🔐 ওনার পিন ভেরিফিকেশন (ওনার মোড চালু করবে)
if (verifyPinBtn) {
    verifyPinBtn.addEventListener("click", () => {
        if (ownerPinInput.value === "1234") { 
            currentMode = "owner";
            currentUserName = "Rafi Boss";
            alert("স্বাগতম রাফি বস! 👑");
            
            if (loginModal) loginModal.style.display = "none";
            if (userNameDisplay) userNameDisplay.textContent = "Rafi Boss 👑";
            if (userProfilePic) userProfilePic.style.display = "none"; // ওনার মোডে পিক লাগবে না
            if (signoutBtn) signoutBtn.style.display = "block";
            
            showWelcomeMessage();
        } else {
            alert("ভুল পিন! আবার চেষ্টা করুন বস।");
            ownerPinInput.value = "";
        }
    });
}

// 🌐 পাবলিক গুগল লগইন (পাবলিক মোড চালু করবে)
if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", async () => {
        try { await signInWithPopup(auth, provider); } catch (error) { alert("গুগল লগইন ব্যর্থ!"); }
    });
}

// 🚪 লগআউট বা লক বাটন
if (signoutBtn) {
    signoutBtn.addEventListener("click", async () => {
        if (currentMode === "public") {
            await signOut(auth);
        }
        location.reload();
    });
}

// 🔄 ফায়ারবেস ইউজার স্টেট (পাবলিক লগইন হ্যান্ডলার)
onAuthStateChanged(auth, (user) => {
    // যদি ওনার অলরেডি পিন দিয়ে ঢুকে থাকে, তবে ফায়ারবেস স্টেট কিছু করবে না
    if (currentMode === "owner") return;

    if (user) {
        currentMode = "public";
        currentUserName = user.displayName;
        if (loginModal) loginModal.style.display = "none";
        
        if (userProfilePic && user.photoURL) { userProfilePic.src = user.photoURL; userProfilePic.style.display = "block"; }
        if (userNameDisplay) userNameDisplay.textContent = user.displayName;
        if (signoutBtn) signoutBtn.style.display = "block";
        
        showWelcomeMessage();
    } else {
        if (loginModal) loginModal.style.display = "flex";
    }
    const splash = document.getElementById("splash");
    if (splash) setTimeout(() => splash.style.display = "none", 1000);
});

// 👋 মোড অনুযায়ী আলাদা ওয়েলকাম মেসেজ
function showWelcomeMessage() {
    if (currentMode === "owner") {
        chatArea.innerHTML = `
            <div class="message ai">
                👋 Welcome back!<br><br>
                I'm <b>Kamine AI</b>.<br>
                জি <b>রাফি বস</b>, ওনার মোড অ্যাক্টিভেটেড। আমি আপনার নির্দেশের জন্য প্রস্তুত!
            </div>
        `;
    } else {
        chatArea.innerHTML = `
            <div class="message ai">
                👋 Hello <b>${currentUserName}</b>!<br><br>
                আমি <b>Kamine AI</b>, আপনার ব্যক্তিগত কৃত্রিম বুদ্ধিমত্তা সহকারী। আজকে আপনাকে কীভাবে সাহায্য করতে পারি বলুন?
            </div>
        `;
    }
}

// ✉️ মেসেজ সেন্ড করার ফাংশন (মোড অনুযায়ী আলাদা চ্যাট আচরণ)
function sendMessage() {
    const text = msgInput.value.trim();
    if (!text) return;

    chatArea.innerHTML += `<div class="message user">${text}</div>`;
    msgInput.value = "";
    chatArea.scrollTop = chatArea.scrollHeight;

    setTimeout(() => {
        if (currentMode === "owner") {
            // 👑 ওনার মোড: বস সম্বোধন করবে
            chatArea.innerHTML += `<div class="message ai">জি <b>রাফি বস</b>, আপনার নির্দেশিত কাজটি আমি প্রসেস করছি।</div>`;
        } else {
            // 🌐 পাবলিক মোড: নরমাল চ্যাটজিপিটি/জেমিনির মতো কথা বলবে
            chatArea.innerHTML += `<div class="message ai">আমি আপনার প্রশ্নটি বুঝতে পেরেছি। আপনাকে এই বিষয়ে বিস্তারিত তথ্য দিতে সাহায্য করছি।</div>`;
        }
        chatArea.scrollTop = chatArea.scrollHeight;
    }, 1000);
}

if (sendBtn) sendBtn.addEventListener("click", sendMessage);
if (msgInput) msgInput.addEventListener("keypress", (e) => { if (e.key === "Enter") sendMessage(); });

// 🎤 ভয়েস রিকগনিশন (বাংলা সাপোর্ট)
if (voiceBtn) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'bn-BD';

        voiceBtn.addEventListener("click", () => { recognition.start(); voiceBtn.style.background = "#ef4444"; });
        recognition.onresult = (event) => { msgInput.value = event.results[0][0].transcript; voiceBtn.style.background = ""; };
        recognition.onerror = () => { voiceBtn.style.background = ""; };
        recognition.onend = () => { voiceBtn.style.background = ""; };
    }
}
