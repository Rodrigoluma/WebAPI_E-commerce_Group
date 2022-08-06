// Import the functions you need from the SDKs you need

import initializeApp from "firebase/app";

import getAnalytics from "firebase/analytics";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCJ8c6jZWUw0IV3hNuEPlIWxzcisbml9KM",

  authDomain: "e-commercedbtechteam.firebaseapp.com",

  projectId: "e-commercedbtechteam",

  storageBucket: "e-commercedbtechteam.appspot.com",

  messagingSenderId: "1019856825453",

  appId: "1:1019856825453:web:081b8d1ccae146c44b2364",

  measurementId: "G-0229MS9RX2"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

// ------------------------------------------   CÓDIGO PARA INSERIR NO DB

/* import { getDatabase, ref, set } from "firebase/database";

function writeUserData(userId, nameCad, emailCad, passCad, photoCad) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: nameCad,
    email: emailCad,
    password: passCad,
    profile_picture : photoCad
  });
} */

const nameCad = document.getElementById('name').value;
const emailCad = document.getElementById('email');
const passCad = document.getElementById('password');
const photoCad = document.getElementById('imgAvatar').value;
const btnSend = document.getElementById('btnCad');

const emailLog = document.getElementById('emailLogin').value;
const passLog = document.getElementById('passLogin').value;
const btnLogin = document.getElementById('btnLogin');
//---------------------NOVO USER EMAIL/SENHA


btnSend.addEventListener('click', () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, emailCad.value, passCad.value)
  .then((userCredential) => {
    // Signed in
    console.log("user connected");
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('erro de cadastro');
    // ..
  });
});

//---------------------LOGIN USER EMAIL/SENHA

btnLogin.addEventListener('click', () => {
   

const auth = getAuth();
signInWithEmailAndPassword(auth, emailLog, passLog)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log('logado');
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('não logou');
  });
})
/* 
<!-- url do realtime database -->
<!-- https://console.firebase.google.com/u/1/project/e-commercedbtechteam/database/e-commercedbtechteam-default-rtdb/data/~2F -->


<!-- Conta de serviço Firebase
firebase-adminsdk-hkyhi@e-commercedbtechteam.iam.gserviceaccount.com
 -->

 */