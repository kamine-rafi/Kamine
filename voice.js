/* =========================================
   Kamine Voice Engine v2.0
   Owner: KM Rafi Chowdhury
========================================= */

// Check browser support
const Voice = {

    recognition: null,

    init() {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.log("Speech Recognition Not Supported");
            return;
        }

        this.recognition = new SpeechRecognition();

        this.recognition.lang = "en-US";
        this.recognition.continuous = false;
        this.recognition.interimResults = false;

        this.recognition.onstart = () => {
            console.log("🎤 Listening...");
        };

        this.recognition.onend = () => {
            console.log("🛑 Voice Stopped");
        };

        this.recognition.onerror = (e) => {
            console.log("Voice Error:", e.error);
        };

        this.recognition.onresult = (event) => {

            const text =
                event.results[0][0].transcript;

            console.log("User:", text);

            if(typeof input !== "undefined"){
                input.value = text;
            }

        };

    },

    listen() {

        if(this.recognition){

            this.recognition.start();

        }

    },

   speak(text){

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    // বাংলা অক্ষর আছে কিনা দেখবে
    if(/[অ-হািীুূেৈোৌ০-৯]/.test(text)){
        speech.lang = "bn-BD";
    }else{
        speech.lang = "en-US";
    }

    speech.rate = 1;
    speech.pitch = 1;
    speech.volume = 1;

    speechSynthesis.speak(speech);

}

    }

};

Voice.init();
