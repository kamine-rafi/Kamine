/* Kamine AI - Memory & State Controller */

const KamineMemory = {
    state: {
        isLoggedIn: false,
        isTalking: false,
        chatHistory: [],
        currentAvatar: 'idle' // idle, talking, or shy
    },

    // চ্যাট হিস্ট্রি সেভ করা
    saveMessage(sender, text) {
        this.state.chatHistory.push({ sender, text, timestamp: new Date() });
        localStorage.setItem('kamine_history', JSON.stringify(this.state.chatHistory));
    },

    // এআই এর বর্তমান মুড আপডেট করা
    updateMood(mood) {
        this.state.currentAvatar = mood;
        console.log("AI Mood changed to:", mood);
        // এটি সরাসরি অবতারের জিআইএফ পরিবর্তন করতে সিগন্যাল পাঠাবে
        const event = new CustomEvent('moodChanged', { detail: { mood } });
        window.dispatchEvent(event);
    },

    // লোকাল স্টোরেজ থেকে ডাটা লোড করা
    loadMemory() {
        const saved = localStorage.getItem('kamine_history');
        if (saved) this.state.chatHistory = JSON.parse(saved);
    }
};

export default KamineMemory;
