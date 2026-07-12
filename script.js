// ১. Firebase কনফিগারেশন
const firebaseConfig = {
  apiKey: "AIzaSyBPf2yQQ1ixTG7y3RBqE5aJj_HcQ3OaoC8",
  authDomain: "kanine-rafi.firebaseapp.com",
  projectId: "kanine-rafi",
  storageBucket: "kanine-rafi.firebasestorage.app",
  messagingSenderId: "219986114815",
  appId: "1:219986114815:web:b1b549b6fdd991573434ca",
  measurementId: "G-GTFQ5YFLEF"
};

// Firebase ইনিশিয়ালাইজেশন
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// ২. অ্যাপ লোড হওয়ার পর স্ক্রিন কন্ট্রোল
window.onload = () => {
    // লোডিং স্ক্রিন সরিয়ে পিন ভেরিফিকেশন স্ক্রিন দেখানো
    document.getElementById('status-screen').style.display = 'none';
    document.getElementById('owner-verification').style.display = 'block';
};

// ৩. পিন ভেরিফিকেশন লজিক
function verifyPin() {
    const pin = document.getElementById('pin-input').value;
    if (pin === "1234") {
        showApp();
    } else {
        alert("ভুল পিন! দয়া করে সঠিক পিন দিন।");
    }
}

// ৪. বায়োমেট্রিক লজিক (সিমুলেটেড)
function verifyBiometric() {
    // যেহেতু ব্রাউজারে সরাসরি ফিঙ্গারপ্রিন্ট সেন্সর এক্সেস জটিল, 
    // এটি আপাতত একটি কনফার্মেশন প্রম্পট হিসেবে কাজ করবে
    const confirmed = confirm("আপনার ডিভাইসের বায়োমেট্রিক স্ক্যানার ব্যবহার করুন");
    if (confirmed) {
        showApp();
    }
}

// ৫. Google লগইন লজিক
function loginWithGoogle() {
    auth.signInWithPopup(provider)
        .then((result) => {
            showApp();
        })
        .catch((error) => {
            alert("লগইন ব্যর্থ: " + error.message);
        });
}

// ৬. অ্যাপ স্ক্রিনে যাওয়ার ফাংশন
function showApp() {
    document.getElementById('owner-verification').style.display = 'none';
    document.getElementById('app-screen').style.display = 'block';
}
