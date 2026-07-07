/* =====================================
   Kamine Owner System v2.0
   Owner: KM Rafi Chowdhury
===================================== */

const OWNER = {

    name: "KM Rafi Chowdhury",

    pin: "1234",

    loggedIn: false

};

// Load saved login state
if(localStorage.getItem("kamine_owner_login") === "true"){
    OWNER.loggedIn = true;
}

// Login
function ownerLogin(pin){

    if(pin === OWNER.pin){

        OWNER.loggedIn = true;

        localStorage.setItem("kamine_owner_login","true");

        return "✅ Welcome Owner " + OWNER.name;

    }

    return "❌ Wrong PIN.";

}

// Logout
function ownerLogout(){

    OWNER.loggedIn = false;

    localStorage.setItem("kamine_owner_login","false");

    return "👋 Owner logged out.";

}

// Status
function ownerStatus(){

    if(OWNER.loggedIn){

        return "🔓 Owner Mode: ON";

    }

    return "🔒 Owner Mode: OFF";

}

// Change PIN
function changeOwnerPin(oldPin,newPin){

    if(oldPin !== OWNER.pin){

        return "❌ Old PIN is incorrect.";

    }

    OWNER.pin = newPin;

    return "✅ PIN changed successfully.";

}

// Check owner access
function isOwner(){

    return OWNER.loggedIn;

}
