const firebaseConfig = {
  apiKey: "AIzaSyBPf2yQQ1ixTG7y3RBqE5aJj_HcQ3OaoC8",
  authDomain: "kanine-rafi.firebaseapp.com",
  projectId: "kanine-rafi",
  storageBucket: "kanine-rafi.firebasestorage.app",
  messagingSenderId: "219986114815",
  appId: "1:219986114815:web:b1b549b6fdd991573434ca"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// স্ক্রিন কন্ট্রোল
window.onload = () => {
    document.getElementById('status-screen').style.display = 'none';
    document.getElementById('login-screen').style.display = 'block';
};

function loginWithGoogle() {
    auth.signInWithPopup(provider)
        .then(() => {
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('app-screen').style.display = 'block';
        })
        .catch(e => alert("Error: " + e.message));
}
