/* ==========================================
   Kamine AI v2.1
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
// ==========================
// Smart Memory Reply
// ==========================

function memoryReply(text) {

    text = text.toLowerCase().trim();

    // ==========================
    // Name Memory
    // ==========================

    if (text.startsWith("my name is ")) {

        const name = text.replace("my name is ", "");

        setUserName(name);

        return "😊 Nice to meet you, " + name + ".";

    }

    if (text === "what is my name") {

        return "😊 Your name is " + getUserName() + ".";

    }

    // ==========================
    // Age Memory
    // ==========================

    if (text.startsWith("my age is ")) {

        const age = text.replace("my age is ", "");

        memorySet("user_age", age);

        return "🎂 Okay Boss, I will remember that you are " + age + " years old.";

    }

    if (text === "how old am i") {

        const age = memoryGet("user_age");

        if (age) {

            return "🎂 You are " + age + " years old.";

        }

        return "🙂 I don't know your age yet.";

    }

    // ==========================
    // Favorite Color
    // ==========================

    if (text.startsWith("my favorite color is ")) {

        const color = text.replace("my favorite color is ", "");

        memorySet("favorite_color", color);

        return "🎨 Okay Boss, I will remember your favorite color is " + color + ".";

    }

    if (text === "what is my favorite color") {

        const color = memoryGet("favorite_color");

        if (color) {

            return "🎨 Your favorite color is " + color + ".";

        }

        return "🙂 I don't know your favorite color yet.";

    }
    // ==========================
    // বাংলা - নাম মনে রাখা
    // ==========================

    if (text.startsWith("আমার নাম ")) {

        const name = text.replace("আমার নাম ", "");

        setUserName(name);

        return "😊 ঠিক আছে Boss, তোমার নাম " + name + " মনে রাখলাম।";

    }

    if (text === "আমার নাম কি") {

        return "😊 Boss, তোমার নাম " + getUserName() + "।";

    }

    // ==========================
    // বাংলা - বয়স মনে রাখা
    // ==========================

    //বয়স বলবে
if (text.startsWith("আমার বয়স ") && text !== "আমার বয়স কত") {

    const age = text.replace("আমার বয়স ", "");

    memorySet("user_age", age);

    return "🎂 ঠিক আছে Boss, তোমার বয়স " + age + " বছর মনে রাখলাম।";
}

// বয়স বলবে
if (text === "আমার বয়স কত") {

    const age = memoryGet("user_age");

    if (age) {
        return "🎂 তোমার বয়স " + age + " বছর।";
    }

    return "🙂 আমি এখনো তোমার বয়স জানি না।";
}
    // ==========================
    // বাংলা - প্রিয় রং
    // ==========================

    // প্রিয় রং Save
if (text.startsWith("আমার প্রিয় রং ")) {

    const color = text.replace("আমার প্রিয় রং ", "");

    memorySet("favorite_color", color);

    return "🎨 ঠিক আছে Boss, তোমার প্রিয় রং " + color + " মনে রাখলাম।";
}

// প্রিয় রং বলবে
if (text === "আমার প্রিয় রং কি") {

    const color = memoryGet("favorite_color");

    if (color) {
        return "🎨 তোমার প্রিয় রং " + color + "।";
    }

    return "🙂 আমি এখনো তোমার প্রিয় রং জানি না।";
}
    return null;

}

console.log("✅ Memory System Loaded");
