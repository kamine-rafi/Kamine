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

    
https://kamine-rafi.github.io/Kamine/
    recognition.onend = function () {

        console.log("🎤 Voice End");

    };

    recognition.onerror = function (e) {

        console.log("Voice Error:", e.error);

    };

})();
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
