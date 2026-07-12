import { app } from './config.js';
import { speak } from './voice.js';

window.addEventListener('DOMContentLoaded', () => {
    // ১. লগো ৩ সেকেন্ডের জন্য
    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('app').style.display = 'block';
        speak("আসসালামু আলাইকুম বস, আমি কামিন। বলুন কীভাবে সাহায্য করতে পারি?", 'bn-BD');
    }, 3000);
});
