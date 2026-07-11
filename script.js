// পিন ভেরিফিকেশন
function verifyPin() {
    const pin = document.getElementById('pin-input').value;
    if (pin === "1234") { // আপনার পিন
        showApp();
    } else {
        alert("ভুল পিন!");
    }
}

// বায়োমেট্রিক ভেরিফিকেশন (ফিঙ্গারপ্রিন্ট/ফেস লক)
async function verifyBiometric() {
    try {
        // ব্রাউজারের বায়োমেট্রিক সাপোর্ট চেক করা
        if (window.PublicKeyCredential) {
            const challenge = new Uint8Array([0x01, 0x02, 0x03]); // সিকিউরিটি চ্যালেঞ্জ
            const credential = await navigator.credentials.get({
                publicKey: {
                    challenge: challenge,
                    timeout: 60000,
                    userVerification: "required"
                }
            });

            if (credential) {
                showApp(); // সফল হলে অ্যাপ ওপেন হবে
            }
        } else {
            alert("আপনার ডিভাইসে বায়োমেট্রিক সুবিধা নেই।");
        }
    } catch (err) {
        console.error("বায়োমেট্রিক এরর:", err);
        alert("বায়োমেট্রিক ভেরিফিকেশন ব্যর্থ হয়েছে।");
    }
}

function showApp() {
    document.getElementById('owner-verification').style.display = 'none';
    document.getElementById('app').style.display = 'block';
}
