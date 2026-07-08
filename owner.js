/* ==========================================
   Kamine AI v2.0
   Owner System
========================================== */

"use strict";

// ==========================
// Owner Settings
// ==========================

let ownerMode = false;

let ownerPin = localStorage.getItem("kamine_owner_pin") || "1234";

// ==========================
// Owner Commands
// ==========================

function ownerCommand(text){

    const msg = text.trim().toLowerCase();

    // Login
    if(msg === "owner login"){

        const pin = prompt("🔐 Enter Owner PIN");

        if(pin === ownerPin){

            ownerMode = true;

            return "✅ Welcome back Boss. Owner Mode Enabled.";

        }

        return "❌ Wrong PIN.";

    }

    // Logout
    if(msg === "owner logout"){

        ownerMode = false;

        return "👋 Owner Mode Disabled.";

    }

    // Status
    if(msg === "owner mode"){

        return ownerMode
            ? "🟢 Owner Mode Enabled."
            : "🔴 Owner Mode Disabled.";

    }

    // Change PIN
    if(msg.startsWith("set pin ")){

        if(!ownerMode){

            return "🔒 Please login first.";

        }

        const newPin = msg.replace("set pin","").trim();

        if(newPin.length < 4){

            return "❌ PIN must be at least 4 digits.";

        }

        ownerPin = newPin;

        localStorage.setItem("kamine_owner_pin", ownerPin);

        return "✅ Owner PIN Updated.";

    }

    // Boss
    if(msg === "who is your boss"){

        return "👤 My Boss is KM Rafi Chowdhury.";

    }

    if(msg === "am i your boss"){

        return "❤️ Yes Boss. You are my creator.";

    }

    return null;

}

console.log("✅ Owner System Loaded");
