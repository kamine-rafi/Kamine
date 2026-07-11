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

// 🔐 ওনার পিন ভেরিফিকেশন (তোমার আসল সিক্রেট পিনটি '1234' এর জায়গায় বসিয়ে নিও)
if (verifyPinBtn) {
    verifyPinBtn.addEventListener("click", () => {
        const enteredPin = ownerPinInput.value;
        if (enteredPin === "1234") { 
            alert("স্বাগতম ওনার বস!");
            if (loginModal) loginModal.style.display = "none";
        } else {
            alert("ভুল পিন! আবার চেষ্টা করো বন্ধু।");
            ownerPinInput.value = "";
        }
    });
}

// 🌐 পাবলিক গুগল লগইন
if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error(error);
            alert("লগইন ব্যর্থ হয়েছে!");
        }
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
        if (userProfilePic && user.photoURL) {
            userProfilePic.src = user.photoURL;
            userProfilePic.style.display = "block";
        }
        if (userNameDisplay) userNameDisplay.textContent = user.displayName;
        if (publicSignoutBtn) publicSignoutBtn.style.display = "block";
    } else {
        if (loginModal) loginModal.style.display = "flex";
    }
    // স্প্ল্যাশ স্ক্রিন থাকলে তা সরিয়ে দেওয়া
    const splash = document.getElementById("splash");
    if (splash) setTimeout(() => splash.style.display = "none", 1000);
});
