// 📦 Firebase v9+ CDN Modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// 🔑 তোমার ফায়ারবেস কনফিগারেশন
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

// 🎯 DOM এলিমেন্টস
const googleLoginBtn = document.getElementById("google-login-btn");
const loginModal = document.getElementById("owner-login-modal");
const publicChatArea = document.getElementById("public-chat-area");
const publicSignoutBtn = document.getElementById("public-signout-btn");
const userProfilePic = document.getElementById("user-profile-pic");
const userNameDisplay = document.getElementById("user-name-display");

// 🌐 গুগল পপআপ লগইন ফাংশন
if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log("লগইন সফল হয়েছে Boss:", result.user.displayName);
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
            location.reload();
        } catch (error) {
            console.error("লগআউট এরর:", error);
        }
    });
}

// 🔄 ইউজারের লগইন স্টেট চেক করা
onAuthStateChanged(auth, (user) => {
    // ওনার মোড অ্যাক্টিভ থাকলে পাবলিক মোড কিছু করবে না
    if (window.isOwnerMode) return;

    if (user) {
        // ইউজার লগইন থাকলে লগইন স্ক্রিন লুকিয়ে চ্যাট বক্স দেখাবে
        if (loginModal) loginModal.style.display = "none";
        if (publicChatArea) publicChatArea.style.display = "block";
        
        // প্রোফাইল আপডেট
        if (userProfilePic && user.photoURL) {
            userProfilePic.src = user.photoURL;
            userProfilePic.style.display = "block";
        }
        if (userNameDisplay) userNameDisplay.textContent = user.displayName;
        if (publicSignoutBtn) publicSignoutBtn.style.display = "block";
    } else {
        // লগআউট থাকলে লগইন স্ক্রিন দেখাবে
        if (loginModal) loginModal.style.display = "flex";
        if (publicChatArea) publicChatArea.style.display = "none";
    }
});
