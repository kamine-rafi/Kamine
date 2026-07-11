document.addEventListener("DOMContentLoaded", () => {
    const avatar = document.getElementById("avatar");
    const loginModal = document.getElementById("owner-login-modal");
    
    // পিন ভেরিফিকেশন (তুমি চাইলে এটি পরে আরও বড় করতে পারো)
    document.getElementById("verify-pin-btn").onclick = () => {
        const pin = document.getElementById("owner-pin").value;
        if(pin === "1234") { // তোমার পিন
            loginModal.style.display = "none";
            avatar.src = "idle.gif"; // এখানে তোমার ইমেজ ফাইল নাম দাও
        } else {
            alert("ভুল পিন!");
        }
    };
});
