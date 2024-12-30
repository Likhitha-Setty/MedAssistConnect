
const firebaseConfig = {
  apiKey: "AIzaSyCG2yNt_4-tWn4AUGNTLJy3Q6tQkUOBqVA",
  authDomain: "medassistconnect-e1a58.firebaseapp.com",
  projectId: "medassistconnect-e1a58",
  storageBucket: "medassistconnect-e1a58.appspot.com",
  messagingSenderId: "1067691474268",
  appId: "1:1067691474268:web:ac39e06e9950d742ff1599"
};


firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const usersRef = db.ref('users');

const signUpForm = document.querySelector('.sign-up form');
const signInForm = document.querySelector('.sign-in form');
registerBtn.addEventListener('click', () => {
  container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
  container.classList.remove("active");
});

// Function to handle sign up
const handleSignUp = (event) => {
  event.preventDefault();
  
  const name = signUpForm.querySelector('#name').value;
  const email = signUpForm.querySelector('#email').value;
  const password = signUpForm.querySelector('#password').value;

  // Sign up with Firebase Authentication
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Add additional user data to Realtime Database
      const userId = userCredential.user.uid;
      usersRef.child(userId).set({
        name: name,
        email: email,
        password: password
      }).then(() => {
        alert('User created successfully!');
        signUpForm.reset(); // Reset form after successful sign up
      }).catch((error) => {
        console.error('Error adding user data: ', error);
        alert('Error creating user.');
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
};

// Function to handle sign in
const handleSignIn = (event) => {
    event.preventDefault();
    
    const email = signInForm.querySelector('email').value;
    const password = signInForm.querySelector('password').value;
  
    // Sign in with Firebase Authentication
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const userId = userCredential.user.uid;
        usersRef.child(userId).once('value', (snapshot) => {
          const userData = snapshot.val();
          if (userData && userData.email === email && userData.password === password) {
            alert('Sign in successful!');
            signInForm.reset(); // Reset form after successful sign in
          } else {
            alert('Invalid credentials');
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
// Event listeners for sign up and sign in forms
signUpForm.addEventListener('submit', handleSignUp);
signInForm.addEventListener('submit', handleSignIn);