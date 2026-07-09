"use strict";

let recognition = null;
let currentLang = "bn-BD";

// ==========================
// Initialize Voice
// ==========================

(function initVoice() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        console.log("❌ Speech Recognition Not Supported");

        return;

    }

    recognition = new SpeechRecognition();

    recognition.lang = currentLang;

    recognition.interimResults = false;

    recognition.continuous = false;

    recognition.maxAlternatives = 1;

    recognition.onstart = function () {

        console.log("🎤 Listening...");

    };

    
    recognition.onend = function () {

        console.log("🎤 Voice End");

    };

    recognition.onresult = function (event) {

    const text = event.results[0][0].transcript.trim();
    const lower = text.toLowerCase();

    // Wake Word
    if (
        lower === "hey kamine" ||
        lower === "hi kamine" ||
        lower === "হেই কামিনে" ||
        lower === "এই কামিনে"
    ) {

        if (currentLang === "bn-BD") {
            speak("জি বস, আমি শুনছি।");
        } else {
            speak("Yes Boss, I am listening.");
        }

        setTimeout(() => {
            recognition.lang = currentLang;
            recognition.start();
        }, 1200);

        return;
    }

    // Language Detect
    if (/[অ-হ]/.test(text)) {
        currentLang = "bn-BD";
    } else {
        currentLang = "en-US";
    }

    document.getElementById("msg").value = text;
    sendMessage();

};
    )();
// ==========================
// Start Voice
// ==========================

function startVoice() {

    if (!recognition) return;

    recognition.lang = currentLang;

    recognition.start();

}

// ==========================
// Speak
// ==========================

function speak(text) {

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    if (/[অ-হ]/.test(text)) {

        speech.lang = "bn-BD";
        currentLang = "bn-BD";

    } else {

        speech.lang = "en-US";
        currentLang = "en-US";

    }

    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    speechSynthesis.speak(speech);

}
