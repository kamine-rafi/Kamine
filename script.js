// ১. স্প্ল্যাশ স্ক্রিন লজিক (৩ সেকেন্ড)
window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        const app = document.getElementById('app');
        
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.style.display = 'none';
            app.style.display = 'block';
        }, 500); // ফেইড আউট সময়
    }, 3000); // ৩ সেকেন্ড ডিলে
});

// ২. চ্যাট পাঠানোর লজিক
async function sendMessage() {
    const inputField = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const message = inputField.value.trim();

    if (!message) return;

    // ইউজারের মেসেজ যোগ করা
    chatBox.innerHTML += `<p class="user-msg"><b>আপনি:</b> ${message}</p>`;
    inputField.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch('/api/chat', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();

        // Kamine-এর উত্তর যোগ করা
        if (data.reply) {
            chatBox.innerHTML += `<p class="ai-msg"><b>Kamine:</b> ${data.reply}</p>`;
        } else {
            chatBox.innerHTML += `<p class="error-msg">Error: ${data.error}</p>`;
        }
    } catch (error) {
        chatBox.innerHTML += `<p class="error-msg">সার্ভার সংযোগ বিচ্ছিন্ন!</p>`;
    }
    
    chatBox.scrollTop = chatBox.scrollHeight;
}
