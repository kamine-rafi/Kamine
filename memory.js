/* =====================================
   Kamine Memory v2.0
   Owner: KM Rafi Chowdhury
===================================== */

const Memory = {

    save(key, value) {
        localStorage.setItem("kamine_" + key, JSON.stringify(value));
    },

    load(key) {
        const data = localStorage.getItem("kamine_" + key);

        if (!data) return null;

        return JSON.parse(data);
    },

    remove(key) {
        localStorage.removeItem("kamine_" + key);
    },

    clear() {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith("kamine_")) {
                localStorage.removeItem(key);
            }
        });
    }

};

// ==========================
// Owner Info
// ==========================

function saveOwner(name){

    Memory.save("owner_name", name);

}

function getOwner(){

    return Memory.load("owner_name") || "KM Rafi Chowdhury";

}

// ==========================
// User Name
// ==========================

function saveUser(name){

    Memory.save("user_name", name);

}

function getUser(){

    return Memory.load("user_name") || "Guest";

}

// ==========================
// Chat History
// ==========================

function saveChat(chat){

    Memory.save("chat_history", chat);

}

function loadChat(){

    return Memory.load("chat_history") || [];

}

// ==========================
// Theme
// ==========================

function saveTheme(theme){

    Memory.save("theme", theme);

}

function getTheme(){

    return Memory.load("theme") || "dark";

}
