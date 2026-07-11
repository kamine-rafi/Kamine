// 📦 Firebase v9+ CDN Modules (পাবলিক মোডের জন্য)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// 🔑 তোমার ফায়ারবেস কনফিগারেশন (স্ক্রিনশট থেকে নেওয়া)
const firebaseConfig = {
  apiKey: "AizaSyBPf2yQQ1ixTG7y3RBqE5aJj_HcQ3OaoC8",
  authDomain: "kanine-rafi.firebaseapp.com",
  projectId: "kanine-rafi",
  storageBucket: "kanine-rafi.firebasestorage.app",
  messagingSenderId: "219986114815",
  appId: "1:219986114815:web:ee2b9da525da3d943434ca",
  measurementId: "G-3TKE5G8M9Y"
};

// Firebase ইনিশিয়ালাইজ করা
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 🎯 DOM এলিমেন্টস (HTML এর সাথে কানেক্ট করার জন্য)
const googleLoginBtn = document.getElementById("google-login-btn");
const publicChatArea = document.getElementById("public-chat-area");
const loginWelcomeScreen = document.getElementById("login-welcome-screen");
const publicSignoutBtn = document.getElementById("public-signout-btn");
const userProfilePic = document.getElementById("user-profile-pic");
const userNameDisplay = document.getElementById("user-name-display");

// 🌐 গুগল পপআপ লগইন ফাংশন
if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("লগইন সফল হয়েছে Boss:", user.displayName);
        } catch (error) {
            console.error("লগইন এরর:", error.message);
            alert("গুগল লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করো বন্ধু!");
        }
    });
}

// 🚪 লগআউট ফাংশন
if (publicSignoutBtn) {
    publicSignoutBtn.addEventListener("click", async () => {
        try {
            await signOut(auth);
            console.log("লগআউট সফল!");
            location.reload(); // পেজ রিফ্রেশ করে লগইন স্ক্রিনে ফেরত নেওয়া
        } catch (error) {
            console.error("লগআউট এরর:", error);
        }
    });
}

// 🔄 ইউজারের লগইন স্টেট চেক করা (সবসময় নজর রাখবে কেউ লগইন আছে কিনা)
onAuthStateChanged(auth, (user) => {
    // ওনার মোড অন থাকলে পাবলিক মোড ইন্টারফেয়ার করবে না
    if (window.isOwnerMode) return;

    if (user) {
        // ইউজার জিমেইল দিয়ে লগইন থাকলে চ্যাট স্ক্রিন দেখাবে
        if (loginWelcomeScreen) loginWelcomeScreen.style.display = "none";
        if (publicChatArea) publicChatArea.style.display = "block";
        
        // ইউজারের নাম ও ছবি প্রোফাইলে বসানো
        if (userProfilePic && user.photoURL) userProfilePic.src = user.photoURL;
        if (userNameDisplay) userNameDisplay.textContent = user.displayName;
    } else {
        // ইউজার লগআউট থাকলে লগইন বাটনওয়ালা স্ক্রিন দেখাবে
        if (loginWelcomeScreen) loginWelcomeScreen.style.display = "flex";
        if (publicChatArea) publicChatArea.style.display = "none";
    }
});
