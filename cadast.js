// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-analytics.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendSignInLinkToEmail, 
    signOut, reauthenticateWithCredential, deleteUser, updatePassword, 
    sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js';


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


const emailCad = document.getElementById('email');
const passCad = document.getElementById('password');
const btnSend = document.getElementById('btnCad');
const returnCad = document.getElementById('retornocad');

//---------------------NOVO USER EMAIL/SENHA


btnSend.addEventListener('click', () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, emailCad.value, passCad.value)
  .then((userCredential) => {
    // Signed in
    returnCad.innerText = 'Cadastrado com sucesso!';
    
    const user = userCredential.user;
    
    // ...ENVIO DE EMAIL DE VERIFICAÇÃO
    const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: 'https://rodrigoluma.github.io/WebAPI_E-commerce_Group/',
        // This must be true.
        handleCodeInApp: true,
        iOS: {
          bundleId: 'com.example.ios'
        },
        android: {
          packageName: 'com.example.android',
          installApp: true,
          minimumVersion: '12'
        },
        dynamicLinkDomain: 'example.page.link'
      };
    sendSignInLinkToEmail(auth, emailCad.value, actionCodeSettings)
  .then(() => {
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', email);
    console.log('email enviado');
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('email nao enviado erro: ' + errorCode + errorMessage);
    // ...
  });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    returnCad.innerText = "Usuário já cadastrado!"
    
    // ..
  });

});

//---------------------LOGIN USER EMAIL/SENHA

const emailLog = document.getElementById('emailLogin');
const passLog = document.getElementById('passLogin');
const btnLogin = document.getElementById('btnLogin');
const returnLog = document.getElementById('retornologin');
const divLogin = document.querySelector('.divLogin');
const divLogout = document.querySelector('.divLogado');
const divExcluir = document.getElementById('divexcluir');
const divAltSenha = document.getElementById('divaltsenha');

btnLogin.addEventListener('click', () => {


const auth = getAuth();
signInWithEmailAndPassword(auth, emailLog.value, passLog.value)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    returnLog.innerText = "Login realizado!"
    // troca por botão deslogar
    divLogin.style.display = "none";
divLogout.style.display = "block";
divExcluir.style.display = "block";
divAltSenha.style.display = "block";
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    returnLog.innerText = "Usuário/Senha inválidos!"
  });

});

//-------------------------------------------DESLOGAR
const btnLogout = document.getElementById('btndeslogar');

btnLogout.addEventListener('click', () => {
    const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
  divLogin.style.display = "block";
divLogout.style.display = "none";
divExcluir.style.display = "none";
divAltSenha.style.display = "none";

}).catch((error) => {
  // An error happened.
});

});

//---------------------ALTERAR SENHA DE CADASTRO
const passOld = document.getElementById('passold');
const passNew = document.getElementById('passnew');
const btnAlt = document.getElementById('btnaltsenha');
const returnAlt = document.getElementById('retornoaltsenha');


btnAlt.addEventListener('click', () => {
    
    

})


//-----------------------------------------EXCLUIR USUÁRIO
const btnDelete = document.getElementById('btnexcluir');


btnDelete.addEventListener('click', () => {
    
    const auth = getAuth();
    const user = auth.currentUser;
    
    deleteUser(user).then(() => {
      // User deleted.
      divLogin.style.display = "block";
    divLogout.style.display = "none";
    divExcluir.style.display = "none";
    divAltSenha.style.display = "none";

    }).catch((error) => {
      // An error ocurred
      // ...
    });
});


//---------------------------CASO ESQUEÇA A SENHA:

const resetPassword = document.getElementById('emailreset');
const btnReset = document.getElementById('btnreset');
const returnReset = document.getElementById('retornoreset');

btnReset.addEventListener('click', () => {
    const auth = getAuth();
        sendPasswordResetEmail(auth, resetPassword.value)
          .then(() => {
            // Password reset email sent!
            // log serve para acompanhar o resultado
            returnReset.innerText = "Email enviado para resetar a senha"
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // log servindo só para acompanhar o resultado
            returnReset.innerText = "Erro - console"
            console.log('Erro ao enviar Email -errorCode:' + errorCode + " errorMessage: " + errorMessage);
          });
});
