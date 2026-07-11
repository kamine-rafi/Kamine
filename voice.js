export function startVoiceRecognition(callback) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'bn-BD, en-US'; // দ্বিভাষিক সাপোর্ট
    recognition.onresult = (event) => {
        callback(event.results[0][0].transcript);
    };
    recognition.start();
}

export function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'bn-BD';
    window.speechSynthesis.speak(utterance);
}
