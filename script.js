const firebaseConfig = {
  apiKey: "AIzaSyBPf2yQQ1ixTG7y3RBqE5aJj_HcQ3OaoC8",
  authDomain: "kanine-rafi.firebaseapp.com",
  projectId: "kanine-rafi",
  storageBucket: "kanine-rafi.firebasestorage.app",
  messagingSenderId: "219986114815",
  appId: "1:219986114815:web:b1b549b6fdd991573434ca"
};

firebase.initializeApp(firebaseConfig);

function login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(() => alert("Login Successful!"))
    .catch((error) => alert(error.message));
}
