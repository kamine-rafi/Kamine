// ১. স্প্ল্যাশ স্ক্রিন হ্যান্ডলিং
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('owner-verification').style.display = 'flex';
    }, 3000);
});

// ২. পিন ভেরিফিকেশন
function verifyPin() {
    const pin = document.getElementById('pin-input').value;
    if (pin === "1234") { // আপনার পিন
        showApp();
    } else {
        alert("ভুল পিন!");
    }
}

// ৩. বায়োমেট্রিক ভেরিফিকেশন
async function verifyBiometric() {
    if (window.PublicKeyCredential) {
        try {
            // সিমুলেটেড বায়োমেট্রিক চেক
            alert("বায়োমেট্রিক স্ক্যান করা হচ্ছে...");
            showApp(); 
        } catch (e) {
            alert("ভেরিফিকেশন ব্যর্থ!");
        }
    } else {
        alert("আপনার ডিভাইসে বায়োমেট্রিক সাপোর্ট নেই।");
    }
}

// অ্যাপ ওপেন করা
function showApp() {
    document.getElementById('owner-verification').style.display = 'none';
    document.getElementById('app').style.display = 'block';
}

// ৪. চ্যাট ফাংশন
async function sendMessage() {
    const input = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const message = input.value.trim();
    if (!message) return;

    chatBox.innerHTML += `<div class="message user-msg">${message}</div>`;
    input.value = '';
    
    try {
        const response = await fetch('/api/chat', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        const data = await response.json();
        chatBox.innerHTML += `<div class="message ai-msg">${data.reply}</div>`;
    } catch (e) {
        chatBox.innerHTML += `<div class="message ai-msg">সার্ভার সংযোগ বিচ্ছিন্ন!</div>`;
    }
    chatBox.scrollTop = chatBox.scrollHeight;
}
