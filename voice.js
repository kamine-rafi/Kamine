/* ==========================================
   Kamine AI v2.0
   Voice Engine
========================================== */

"use strict";

let recognition = null;

// Initialize Voice
(function initVoice() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        console.log("Speech Recognition Not Supported");
        return;
    }

    recognition = new SpeechRecognition();

    // বাংলা + ইংরেজি
    recognition.lang = "bn-BD";

    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = function (event) {

        const text = event.results[0][0].transcript;

        const input = document.getElementById("msg");

        input.value = text;

        sendMessage();

    };

    recognition.onerror = function (e) {

        console.log("Voice Error:", e.error);

    };

})();

// ==========================
// Start Voice
// ==========================

function startVoice() {

    if (recognition) {

        recognition.start();

    } else {

        alert("Voice is not supported on this browser.");

    }

}

// ==========================
// Speak
// ==========================

function speak(text) {

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    // বাংলা থাকলে বাংলা ভয়েস
    if (/[অ-হ]/.test(text)) {

        speech.lang = "bn-BD";

    } else {

        speech.lang = "en-US";

    }

    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    // Female voice পাওয়া গেলে সেটি ব্যবহার করবে
    const voices = speechSynthesis.getVoices();

    const female = voices.find(v =>
        /female|zira|aria|samantha|google/i.test(v.name)
    );

    if (female) {

        speech.voice = female;

    }

    speechSynthesis.speak(speech);

}

console.log("✅ Voice Engine Loaded");
