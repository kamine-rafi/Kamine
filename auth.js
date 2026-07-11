import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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

const loginModal = document.getElementById("owner-login-modal");
const signoutBtn = document.getElementById("signout-btn");
const userNameDisplay = document.getElementById("user-name-display");
const kamineAvatar = document.getElementById("kamine-avatar"); // অ্যানিমেটেড ক্যারেক্টার

let currentMode = "public"; 

// পিন ভেরিফিকেশন (ওনার মোড)
document.getElementById("verify-pin-btn").addEventListener("click", () => {
    if (document.getElementById("owner-pin").value === "1234") { 
        currentMode = "owner";
        loginModal.style.display = "none";
        userNameDisplay.textContent = "Rafi Boss 👑";
        signoutBtn.style.display = "block";
        
        // ওনার মোড এন্ট্রি অ্যানিমেশন
        kamineAvatar.src = "shy.gif";
        setTimeout(() => { kamineAvatar.src = "idle.gif"; }, 3000);
        
        document.getElementById("chat-area").innerHTML = `<div class="message ai">জি রাফি বস, ওনার মোড অ্যাক্টিভেটেড। আমি আপনার নির্দেশের জন্য প্রস্তুত!</div>`;
    } else {
        alert("ভুল পিন বস!");
    }
});

// গুগল লগইন (পাবলিক মোড)
document.getElementById("google-login-btn").addEventListener("click", () => signInWithPopup(auth, provider));

// লগআউট
signoutBtn.addEventListener("click", () => location.reload());

// ইউজার স্টেট
onAuthStateChanged(auth, (user) => {
    if (currentMode === "owner") return;
    if (user) {
        currentMode = "public";
        loginModal.style.display = "none";
        userNameDisplay.textContent = user.displayName;
        signoutBtn.style.display = "block";
    }
});

// মেসেজ পাঠানোর ফাংশন
document.getElementById("sendBtn").addEventListener("click", () => {
    const text = document.getElementById("msg").value;
    if (!text) return;

    // টকিং অ্যানিমেশন শুরু
    kamineAvatar.src = "talking.gif";
    
    setTimeout(() => {
        const reply = currentMode === "owner" ? "জি রাফি বস, আমি আপনার কাজটি দেখছি!" : "আমি আপনাকে সাহায্য করছি।";
        document.getElementById("chat-area").innerHTML += `<div class="message ai">${reply}</div>`;
        
        // অ্যানিমেশন শেষ হলে আবার শান্ত হওয়া
        kamineAvatar.src = "idle.gif";
    }, 2000);
    
    document.getElementById("msg").value = "";
});
