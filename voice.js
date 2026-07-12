export function speak(text, lang = 'bn-BD') {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = lang;
    window.speechSynthesis.speak(msg);
}

// Web Speech API দিয়ে ভয়েস ইনপুট লজিক এখানে থাকবে
