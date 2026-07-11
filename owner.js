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

// 🧬 বিল্ট-ইন ফেস, ফিঙ্গারপ্রিন্ট বা ডিভাইস লক (Smart Biometric Fallback) লজিক
if (biometricBtn) {
    biometricBtn.addEventListener("click", async () => {
        // আধুনিক ব্রাউজারের ক্রেডেনশিয়াল ম্যানেজার চেক
        if (window.PublicKeyCredential) {
            try {
                // এটি ফোনের আসল ফিঙ্গারপ্রিন্ট/ফেস/স্ক্রিনলক পপআপকে কল করার আধুনিক এবং সহজ উপায়
                const options = {
                    publicKey: {
                        challenge: crypto.getRandomValues(new Uint8Array(32)),
                        rp: { name: "Kamine AI" },
                        user: {
                            id: crypto.getRandomValues(new Uint8Array(16)),
                            name: "boss",
                            displayName: "Rafi Boss"
                        },
                        pubKeyCredParams: [{ type: "public-key", alg: -7 }],
                        timeout: 60000,
                        authenticatorSelection: {
                            authenticatorAttachment: "platform", // এর মানে ফোন/ল্যাপটপের নিজস্ব বায়োমেট্রিক
                            userVerification: "required"
                        }
                    }
                };

                const credential = await navigator.credentials.create(options);
                if (credential) {
                    enableOwnerMode();
                }
            } catch (err) {
                console.error("Biometric setup/verification skipped:", err);
                alert("ডিভাইস লক বা বায়োমেট্রিক ভেরিফিকেশন সফল হয়নি Boss। অনুগ্রহ করে ৪ ডিজিটের PIN ব্যবহার করুন।");
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
