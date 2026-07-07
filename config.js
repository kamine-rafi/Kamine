const KAMINE_CONFIG = {
    name: "Kamine",
    owner: "KM Rafi Chowdhury",
    version: "1.0",

    assistantMode: "Personal AI Assistant",

    features: {
        voice: true,
        memory: true,
        image: true,
        documents: true
    }
};

console.log("Kamine AI Loaded");
/* ==========================
   Kamine Owner Profile
========================== */

const ownerBtn = document.querySelector(".menu button:last-child");

const ownerPanel = document.createElement("div");

ownerPanel.style.cssText = `
position:fixed;
top:50%;
left:50%;
transform:translate(-50%,-50%);
width:320px;
background:#111827;
padding:25px;
border-radius:18px;
display:none;
color:white;
box-shadow:0 0 30px rgba(0,150,255,.4);
z-index:9999;
`;

ownerPanel.innerHTML = `
<h2>👤 Owner Profile</h2>
<hr><br>

<p><b>Name:</b> KM Rafi Chowdhury</p>
<p><b>Assistant:</b> Kamine AI</p>
<p><b>Version:</b> 1.0</p>
<p><b>Status:</b> Online ✅</p>

<br>

<button id="closeOwner">Close</button>
`;

document.body.appendChild(ownerPanel);

ownerBtn.onclick = () => {
    ownerPanel.style.display = "block";
};

document.getElementById("closeOwner").onclick = () => {
    ownerPanel.style.display = "none";
};
/* =====================================
   Kamine Part 9
   Owner PIN Lock
===================================== */

const OWNER_PIN = "1590"; // চাইলে পরে বদলাতে পারবি

window.addEventListener("load", () => {

    if (sessionStorage.getItem("kamineUnlocked")) return;

    setTimeout(() => {

        const pin = prompt("🔐 Enter Owner PIN");

        if (pin === OWNER_PIN) {

            sessionStorage.setItem("kamineUnlocked", "true");

            alert("✅ Welcome KM Rafi Chowdhury");

        } else {

            document.body.innerHTML = `
            <div style="
            display:flex;
            justify-content:center;
            align-items:center;
            height:100vh;
            background:#0b1220;
            color:white;
            font-family:Poppins;
            text-align:center;
            ">
            <div>
            <h1>🔒 Access Denied</h1>
            <p>Incorrect PIN</p>
            </div>
            </div>
            `;
        }

    },500);

});
