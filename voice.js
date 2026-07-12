import { processCommand } from "./commands.js";

const synth = window.speechSynthesis;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

export function startVoiceActivation() {
    recognition.lang = 'bn-BD';
    recognition.continuous = true;
    
    recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        if (transcript.toLowerCase().includes("hey kamine")) {
            speak("জি বস, বলুন?");
            processCommand(transcript);
        }
    };
    recognition.start();
}

export function speak(text) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'bn-BD';
    synth.speak(utter);
}

export function handleChatInput(text, mode) {
    // চ্যাটবক্সে মেসেজ যোগ করা এবং লজিক কল করা
    processCommand(text);
}
