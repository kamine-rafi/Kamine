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

    recognition.onresult = function (event) {

        const text = event.results[0][0].transcript;

        document.getElementById("msg").value = text;

        sendMessage();

    };

    recognition.onend = function () {

        console.log("🎤 Voice End");

    };

    recognition.onerror = function (e) {

        console.log("Voice Error:", e.error);

    };

})();
