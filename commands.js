/* ==========================================
   Kamine Commands v2.0
========================================== */

function getOfflineReply(text){

    // প্রথমে Owner System চেক করবে
    if(typeof ownerCommand==="function"){

        const ownerReply=ownerCommand(text);

        if(ownerReply){

            return ownerReply;

        }

    }

    const msg=text.trim().toLowerCase();

    // Greeting
    if(["hi","hello","hey"].includes(msg)){

        return "👋 Hello Boss! I'm Kamine. How can I help you today?";

    }

    // Name
    if(msg==="name"){

        return "🤖 My name is Kamine.";

    }

    // Owner
    if(msg==="owner"){

        return "👤 My owner is KM Rafi Chowdhury.";

    }

    // Boss
    if(msg==="boss"){

        return "👤 You are my Boss.";

    }

    // Who are you
    if(msg==="who are you"){

        return "🤖 I'm Kamine AI, your offline assistant.";

    }

    // Time
    if(msg==="time"){

        return "🕒 "+new Date().toLocaleTimeString();

    }

    // Date
    if(msg==="date"){

        return "📅 "+new Date().toLocaleDateString();

    }

    // Version
    if(msg==="version"){

        return "🚀 Kamine Version 2.0 Offline";

    }

    // Help
    if(msg==="help"){

        return `📖 Available Commands

• hello
• owner
• owner login
• owner logout
• owner mode
• set pin 5678
• boss
• who are you
• name
• time
• date
• version
• help`;

    }

    // Unknown
    return "🙂 I don't know that yet. I'll become smarter soon.";

}
