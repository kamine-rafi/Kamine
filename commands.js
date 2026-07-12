import { speak } from "./voice.js";

export function processCommand(input) {
    // এখানে আপনার কমান্ড লজিক থাকবে
    if (input.includes("সময়")) {
        speak("এখন সময় " + new Date().toLocaleTimeString());
    } else {
        // AI API কল করার জায়গা
        console.log("Processing AI response for:", input);
    }
}
