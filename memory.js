/* ==========================================
   Kamine AI v2.0
   Memory System
========================================== */

"use strict";

// ==========================
// Save Data
// ==========================

function memorySet(key, value) {

    localStorage.setItem("kamine_" + key, JSON.stringify(value));

}

// ==========================
// Load Data
// ==========================

function memoryGet(key) {

    const data = localStorage.getItem("kamine_" + key);

    if (!data) return null;

    return JSON.parse(data);

}

// ==========================
// Delete Data
// ==========================

function memoryRemove(key) {

    localStorage.removeItem("kamine_" + key);

}

// ==========================
// User Name
// ==========================

function setUserName(name) {

    memorySet("user_name", name);

}

function getUserName() {

    return memoryGet("user_name") || "Boss";

}

// ==========================
// Notes
// ==========================

function saveNote(note) {

    let notes = memoryGet("notes") || [];

    notes.push(note);

    memorySet("notes", notes);

}

function getNotes() {

    return memoryGet("notes") || [];

}

// ==========================
// Chat History
// ==========================

function saveChat() {

    const chat = document.getElementById("chat");

    if (chat) {

        memorySet("chat_history", chat.innerHTML);

    }

}

function loadChat() {

    const history = memoryGet("chat_history");

    if (history) {

        const chat = document.getElementById("chat");

        if (chat) {

            chat.innerHTML = history;

        }

    }

}
function memoryReply(text) {

    text = text.toLowerCase().trim();

    if (text.startsWith("my name is ")) {

        const name = text.replace("my name is ", "");

        setUserName(name);

        return "😊 Nice to meet you, " + name + ".";

    }

    if (text === "what is my name") {

        return "😊 Your name is " + getUserName() + ".";

    }

    return null;

}
console.log("✅ Memory System Loaded");
