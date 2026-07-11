// ১. স্প্ল্যাশ স্ক্রিন
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('owner-verification').style.display = 'flex';
    }, 3000);
});

// ২. লক সিস্টেম
function verifyPin() {
    if (document.getElementById('pin-input').value === "1234") showApp();
    else alert("ভুল পিন!");
}

async function verifyBiometric() {
    alert("বায়োমেট্রিক স্ক্যান করা হচ্ছে...");
    showApp();
}

function showApp() {
    document.getElementById('owner-verification').style.display = 'none';
    document.getElementById('app').style.display = 'block';
}

// ৩. ভয়েস ইনপুট ও আউটপুট
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'bn-BD';

function startVoiceInput() { recognition.start(); }

recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    document.getElementById('user-input').value = text;
    sendMessage();
};

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'bn-BD';
    window.speechSynthesis.speak(speech);
}

// ৪. চ্যাট লজিক
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
        speak(data.reply); // ভয়েস আউটপুট
    } catch (e) {
        chatBox.innerHTML += `<div class="message ai-msg">সার্ভার সংযোগ বিচ্ছিন্ন!</div>`;
    }
    chatBox.scrollTop = chatBox.scrollHeight;
}
