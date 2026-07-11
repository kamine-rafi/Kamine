// ১. ৩ সেকেন্ড লোগো অ্যানিমেশন
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('splash-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('splash-screen').style.display = 'none';
            document.getElementById('app').classList.remove('hidden');
        }, 500);
    }, 3000);
});

// ২. চ্যাট পাঠানোর ফাংশন
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
        chatBox.innerHTML += `<div class="message ai-msg">${data.reply || data.error}</div>`;
    } catch (e) {
        chatBox.innerHTML += `<div class="message ai-msg">সার্ভার সংযোগ বিচ্ছিন্ন!</div>`;
    }
    chatBox.scrollTop = chatBox.scrollHeight;
}
