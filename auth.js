import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// ফায়ারবেস কনফিগ (যেমন আছে তেমনই থাকবে)
const firebaseConfig = {
  apiKey: "AizaSyBPf2yQQ1ixTG7y3RBqE5aJj_HcQ3OaoC8",
  authDomain: "kanine-rafi.firebaseapp.com",
  projectId: "kanine-rafi",
  storageBucket: "kanine-rafi.firebasestorage.app",
  messagingSenderId: "219986114815",
  appId: "1:219986114815:web:ee2b9da525da3d943434ca",
  measurementId: "G-3TKE5G8M9Y"
};
initializeApp(firebaseConfig);

// বাটনে ক্লিক লিসেনার যুক্ত করা
document.addEventListener("DOMContentLoaded", () => {
    const avatar = document.getElementById("kamine-avatar");
    const pinBtn = document.getElementById("verify-pin-btn");
    const sendBtn = document.getElementById("sendBtn");

    // পিন ভেরিফিকেশন
    if (pinBtn) {
        pinBtn.addEventListener("click", () => {
            const pin = document.getElementById("owner-pin").value;
            if (pin === "1234") {
                document.getElementById("owner-login-modal").style.display = "none";
                if (avatar) {
                    avatar.src = "shy.gif?random=" + Math.random();
                    setTimeout(() => { avatar.src = "idle.gif?random=" + Math.random(); }, 3000);
                }
            } else {
                alert("ভুল পিন!");
            }
        });
    }

    // মেসেজ সেন্ড
    if (sendBtn) {
        sendBtn.addEventListener("click", () => {
            if (avatar) {
                avatar.src = "talking.gif?random=" + Math.random();
                setTimeout(() => { avatar.src = "idle.gif?random=" + Math.random(); }, 2000);
            }
        });
    }
});
