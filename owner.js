export function initOwnerMode() {
    console.log("Welcome back, Boss");
    startVoiceRecognition();
}

function startVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'bn-BD';
    
    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        if (text.includes("Hey Kamine")) {
            speak("জি বস, বলুন কী করতে হবে?");
        }
    };
    recognition.start();
}

function speak(text) {
    const msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
}
