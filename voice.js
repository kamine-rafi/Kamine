/* Kamine AI - Voice Controller */

const VoiceController = {
    // ভয়েস থেকে টেক্সট রূপান্তর (Speech to Text)
    startListening(onResult) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("আপনার ব্রাউজার ভয়েস সাপোর্ট করছে না!");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'bn-BD'; // বাংলা ভাষা
        recognition.start();

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            onResult(transcript);
        };

        recognition.onerror = (event) => {
            console.error("ভয়েস এরর:", event.error);
        };
    },

    // এআই-এর কথা বলা (Text to Speech)
    speak(text) {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'bn-BD';
        speech.rate = 1;
        speech.pitch = 1;
        window.speechSynthesis.speak(speech);
    }
};

export default VoiceController;
