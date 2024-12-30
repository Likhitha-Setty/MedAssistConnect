const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


const firebaseConfig = {
    apiKey: "AIzaSyCG2yNt_4-tWn4AUGNTLJy3Q6tQkUOBqVA",
    authDomain: "medassistconnect-e1a58.firebaseapp.com",
    projectId: "medassistconnect-e1a58",
    storageBucket: "medassistconnect-e1a58.appspot.com",
    messagingSenderId: "1067691474268",
    appId: "1:1067691474268:web:ac39e06e9950d742ff1599"
  };
  


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

const signUpForm = document.querySelector('.sign-up form');
const signInForm = document.querySelector('.sign-in form');
const signUpButton = document.getElementById('signup');
const signInButton = document.getElementById('signin');

// Function to save user data to Firebase
function saveUserData(name, email) {
  // Get a key for a new user
  const newUserKey = database.ref().child('MedAssist').push().key;

  // Save the user's data to the database
  database.ref('MedAssist/' + newUserKey).set({
    name: name,
    email: email
  });
}

// Sign Up
signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = signUpForm.querySelector('#name').value;
  const email = signUpForm.querySelector('#email').value;
  const password = signUpForm.querySelector('#password').value;

  // Create user with email and password
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      saveUserData(name, email);
      alert("Account created successfully!");
      // You can redirect the user to another page here if needed
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

// Sign In
signInForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = signInForm.querySelector('#email').value;
  const password = signInForm.querySelector('#password').value;

  // Sign in user
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert("Signed in successfully!");
      // You can redirect the user to another page here if needed
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

// Toggle between sign up and sign in forms
signUpButton.addEventListener('click', () => {
  document.getElementById('container').classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
  document.getElementById('container').classList.remove('right-panel-active');
});