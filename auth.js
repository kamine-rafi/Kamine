/* ==========================================
   Kamine AI v2.0 - Auth & Animation Controller
   Created by KM Rafi Chowdhury
========================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AizaSyBPf2yQQ1ixtTG7y3RBqE5Ajj_HcQ30aoC8",
    authDomain: "kanine-rafi.firebaseapp.com",
    projectId: "kanine-rafi",
    storageBucket: "kanine-rafi.appspot.com",
    messagingSenderId: "219986114815",
    appId: "1:219986114815:web:ee2b9da525da3d943434ca",
    measurementId: "G-3TKE5G8M9Y"
};

initializeApp(firebaseConfig);

// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
    const avatar = document.getElementById("avatar"); // id="avatar" টা ঠিকঠাক ধরা হয়েছে
    const pinBtn = document.getElementById("verify-pin-btn");
    const sendBtn = document.getElementById("sendBtn");
    const avatarContainer = document.getElementById("ai-avatar-container");

    // পিন ভেরিফিকেশন (Owner Login)
    if (pinBtn) {
        pinBtn.addEventListener("click", () => {
            const pin = document.getElementById("owner-pin").value;
            if (pin === "1234") {
                document.getElementById("owner-login-modal").style.display = "none";
                
                // অবতার দেখানোর জন্য কন্টেইনার দৃশ্যমান করা
                if (avatarContainer) avatarContainer.style.display = "block";
                
                // লগইন হওয়ার সাথে shy.gif এবং পরে idle.gif
                if (avatar) {
                    avatar.src = "shy.gif?t=" + new Date().getTime();
                    setTimeout(() => { 
                        avatar.src = "idle.gif?t=" + new Date().getTime(); 
                    }, 3000);
                }
            } else {
                alert("ভুল পিন!");
            }
        });
    }

    // মেসেজ সেন্ড ইভেন্ট (কথা বলার সময় talking.gif)
    if (sendBtn) {
        sendBtn.addEventListener("click", () => {
            if (avatar) {
                avatar.src = "talking.gif?t=" + new Date().getTime();
                setTimeout(() => { 
                    avatar.src = "idle.gif?t=" + new Date().getTime(); 
                }, 2000);
            }
        });
    }
});
