// ১. ৩ সেকেন্ড লোগো অ্যানিমেশন ও অ্যাপ লোড লজিক
window.addEventListener('load', () => {
    setTimeout(() => {
        const splashScreen = document.getElementById('splash-screen');
        const app = document.getElementById('app');

        // লগো ফেইড আউট করা
        splashScreen.style.transition = "opacity 0.5s ease";
        splashScreen.style.opacity = '0';

        setTimeout(() => {
            splashScreen.style.display = 'none'; // লগো স্ক্রিনটি সরিয়ে ফেলা
            app.style.display = 'block';         // মূল অ্যাপটি দেখানো
            app.classList.remove('hidden');      // হাইড ক্লাসটি রিমুভ করা
        }, 500);
    }, 3000); // ৩ সেকেন্ডের টাইমার
});

// ২. চ্যাট পাঠানোর ফাংশন
async function sendMessage() {
    const input = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const message = input.value.trim();

    if (!message) return; // খালি মেসেজ পাঠানো যাবে না

    // ইউজারের মেসেজ স্ক্রিনে যোগ করা
    chatBox.innerHTML += `<div class="message user-msg">${message}</div>`;
    input.value = ''; // ইনপুট বক্স পরিষ্কার করা
    chatBox.scrollTop = chatBox.scrollHeight; // চ্যাটবক্স নিচে নামানো

    try {
        // API কল করা (Vercel-এ এটি আপনার প্রজেক্টের সঠিক লিঙ্ক হবে)
        const response = await fetch('/api/chat', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();

        // Kamine-এর উত্তর স্ক্রিনে যোগ করা
        if (data.reply) {
            chatBox.innerHTML += `<div class="message ai-msg">${data.reply}</div>`;
        } else {
            chatBox.innerHTML += `<div class="message ai-msg" style="color:red;">ত্রুটি: ${data.error || 'উত্তর পাওয়া যায়নি'}</div>`;
        }
    } catch (e) {
        chatBox.innerHTML += `<div class="message ai-msg" style="color:red;">সার্ভার সংযোগ বিচ্ছিন্ন!</div>`;
    }
    
    // অটো স্ক্রল
    chatBox.scrollTop = chatBox.scrollHeight;
}

// এন্টার প্রেস করলে মেসেজ পাঠানোর লজিক (অতিরিক্ত সুবিধা)
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
