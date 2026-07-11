// ওনার মোড কনফিগারেশন ও গ্লোবাল স্টেট
window.isOwnerMode = false;
const SECRET_PIN = "1234"; // 🛠️ তোমার পার্সোনাল ৪ ডিজিটের পিন (ইচ্ছা হলে বদলে নিতে পারো)

// DOM এলিমেন্টসমূহ সিলেক্ট করা
const loginModal = document.getElementById("owner-login-modal");
const pinInput = document.getElementById("owner-pin");
const verifyPinBtn = document.getElementById("verify-pin-btn");
const biometricBtn = document.getElementById("biometric-btn");
const characterContainer = document.getElementById("character-container");
const kamineAvatar = document.getElementById("kamine-avatar");

// 🖼️ ক্যারেক্টারের ভিন্ন ভিন্ন অ্যানিমেশন স্টেট পরিবর্তন করার ফাংশน
function setCharacterState(state) {
    if (!window.isOwnerMode || !kamineAvatar) return;
    
    // এখানে তোমার ক্যারেক্টারের GIF বা ইমেজের সঠিক পাথ বা লিংক বসাতে পারো
    if (state === "idle") {
        kamineAvatar.src = "idle.gif"; 
    } else if (state === "thinking") {
        kamineAvatar.src = "thinking.gif"; 
    } else if (state === "speaking") {
        kamineAvatar.src = "speaking.gif";
    }
}

// 🔐 ওনার মোড সফলভাবে অ্যাক্টিভেট হলে যা ঘটবে
function enableOwnerMode() {
    window.isOwnerMode = true;
    if (loginModal) loginModal.style.display = "none";
    if (characterContainer) characterContainer.style.display = "block";
    
    setCharacterState("idle");
    
    // চ্যাট বক্সে ওনারকে স্বাগত জানানো
    const chatMain = document.getElementById("chat");
    if (chatMain) {
        const msgDiv = document.createElement("div");
        msgDiv.className = "message ai";
        msgDiv.innerHTML = "✅ Welcome back Boss. Owner Mode Enabled.";
        chatMain.appendChild(msgDiv);
        chatMain.scrollTop = chatMain.scrollHeight;
    }
}

// ⌨️ পিন কোড দিয়ে ভেরিফিকেশন লজিক
if (verifyPinBtn) {
    verifyPinBtn.addEventListener("click", () => {
        if (pinInput && pinInput.value === SECRET_PIN) {
            enableOwnerMode();
        } else {
            alert("❌ Wrong PIN, Boss!");
            if (pinInput) pinInput.value = "";
        }
    });
}

// 🧬 বিল্ট-ইন ফেস বা ফিঙ্গারপ্রিন্ট (Biometric) লজিক
if (biometricBtn) {
    biometricBtn.addEventListener("click", async () => {
        if (window.PublicKeyCredential) {
            try {
                const credential = await navigator.credentials.get({
                    publicKey: {
                        challenge: new Uint8Array([1, 2, 3, 4]),
                        userVerification: "required"
                    }
                });
                if (credential) {
                    enableOwnerMode();
                }
            } catch (err) {
                console.log("Biometric bypassed, falling back to PIN.");
                if (pinInput) pinInput.focus();
            }
        } else {
            alert("Biometric lock is not supported on this browser. Please use PIN.");
        }
    });
}

// 🛠️ ওনার লগইন পপআপ স্ক্রিন চালু করার ফাংশন
function triggerOwnerLogin() {
    if (loginModal) loginModal.style.display = "flex";
}

// পেজ পুরোপুরি লোড হওয়ার পর ওনার মোডের পপআপ দেখাবে (কোনো মিসফায়ার হবে না)
window.addEventListener("load", () => {
    if (!window.isOwnerMode) {
        triggerOwnerLogin();
    }
});
