window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('app').style.display = 'block';
    }, 3000);
});

async function sendMessage() {
    const input = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const message = input.value.trim();
    if (!message) return;

    chatBox.innerHTML += `<div class="message user-msg">${message}</div>`;
    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch('/api/chat', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        const data = await response.json();
        
        if (data.reply) {
            chatBox.innerHTML += `<div class="message ai-msg">${data.reply}</div>`;
        } else {
            chatBox.innerHTML += `<div class="message ai-msg" style="color: #ff6b6b;">সার্ভার এরর: ${data.error || 'Invalid response'}</div>`;
        }
    } catch (e) {
        chatBox.innerHTML += `<div class="message ai-msg" style="color: #ff6b6b;">সার্ভার সংযোগ বিচ্ছিন্ন!</div>`;
    }
    chatBox.scrollTop = chatBox.scrollHeight;
}

// এন্টার কি দিয়ে পাঠানো
document.getElementById('user-input').addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });
