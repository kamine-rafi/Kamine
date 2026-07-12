// Firebase কনফিগারেশন
const firebaseConfig = {
  apiKey: "AIzaSyBPf2yQQ1ixTG7y3RBqE5aJj_HcQ3OaoC8",
  authDomain: "kanine-rafi.firebaseapp.com",
  projectId: "kanine-rafi",
  storageBucket: "kanine-rafi.firebasestorage.app",
  messagingSenderId: "219986114815",
  appId: "1:219986114815:web:b1b549b6fdd991573434ca"
};

// ইনিশিয়ালাইজেশন
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// লগইন লজিক
function loginWithGoogle() {
    auth.signInWithPopup(provider)
        .then(() => {
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('app-screen').style.display = 'block';
        })
        .catch(error => alert("লগইন এরর: " + error.message));
}

// মেসেজ পাঠানোর লজিক
function sendMessage() {
    const input = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const message = input.value.trim();
    
    if (message !== "") {
        const msgDiv = document.createElement('div');
        msgDiv.textContent = message;
        msgDiv.style.padding = "10px";
        msgDiv.style.margin = "5px";
        msgDiv.style.background = "#2b5278";
        msgDiv.style.borderRadius = "10px";
        msgDiv.style.color = "white";
        chatBox.appendChild(msgDiv);
        input.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}
