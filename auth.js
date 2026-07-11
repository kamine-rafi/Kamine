// মেসেজ পাঠানোর ফাংশন আপডেট
document.getElementById("sendBtn").addEventListener("click", () => {
    const input = document.getElementById("msg");
    if (!input.value.trim()) return;

    // টকিং অ্যানিমেশন (Timestamp দিয়ে ক্যাশ এড়ানো)
    if (kamineAvatar) {
        kamineAvatar.src = "talking.gif?t=" + new Date().getTime(); 
    }
    
    setTimeout(() => {
        const reply = (currentMode === "owner") ? "জি রাফি বস, আমি আপনার কাজটি দেখছি!" : "আমি আপনাকে সাহায্য করছি।";
        document.getElementById("chat-area").innerHTML += `<div class="message ai">${reply}</div>`;
        
        // আবার Idle মোড
        if (kamineAvatar) {
            kamineAvatar.src = "idle.gif?t=" + new Date().getTime();
        }
    }, 2000);
    
    input.value = "";
});
