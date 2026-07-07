/* ==================================
   Kamine Owner System v2.0
================================== */

let OWNER_MODE = false;
let OWNER_PIN = localStorage.getItem("kamine_pin") || "1234";

function ownerCommand(text){

const cmd = text.toLowerCase().trim();

// Login
if(cmd==="owner login"){

const pin = prompt("🔒 Enter Owner PIN");

if(pin===OWNER_PIN){

OWNER_MODE=true;

return "✅ Welcome back Boss.";

}

return "❌ Wrong PIN.";

}

// Logout

if(cmd==="owner logout"){

OWNER_MODE=false;

return "👋 Owner Mode Disabled.";

}

// Status

if(cmd==="owner mode"){

return OWNER_MODE ?
"🟢 Owner Mode Enabled." :
"🔴 Owner Mode Disabled.";

}

// Change PIN

if(cmd.startsWith("set pin ")){

if(!OWNER_MODE){

return "🔒 Login first Boss.";

}

const newPin = cmd.replace("set pin ","").trim();

OWNER_PIN=newPin;

localStorage.setItem("kamine_pin",newPin);

return "✅ PIN Updated.";

}

// Boss

if(cmd==="boss"){

return "👤 You are my Boss.";

}

if(cmd==="who is your boss"){

return "👤 My Boss is KM Rafi Chowdhury.";

}

return null;

}
