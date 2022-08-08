// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-analytics.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendSignInLinkToEmail, 
    signOut, sendEmailVerification, deleteUser, updatePassword, 
    sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js';


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
sendEmailVerification(auth.currentUser)
  .then(() => {
    console.log('email de cadastro enviado');
    // Email verification sent!
    // ...
  }).catch((error) => {
    console.log('nao enviado o email de cadastro');
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
const emailOld = document.getElementById('emailold');
const passOld = document.getElementById('passold');
const passNew = document.getElementById('passnew');
const btnAlt = document.getElementById('btnaltsenha');
const returnAlt = document.getElementById('retornoaltsenha');


btnAlt.addEventListener('click', () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, emailOld.value, passOld.value)
    .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    /* user = auth.currentUser; */
    updatePassword(user, passNew.value).then(() => {
      // Update successful.
    }).catch((error) => {
      // An error ocurred
      // ...
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    returnAlt.innerText = "Usuário/senha inválidos";
  });
    
    
});


//-----------------------------------------EXCLUIR USUÁRIO
const btnDelete = document.getElementById('btnexcluir');


btnDelete.addEventListener('click', () => {
   //confere se está logado para poder excluir (presumindo que o botão esteja na área de cadastro que só aparece logado)
    const auth = getAuth();
    const user = auth.currentUser;
    

if (user) {
  // User is signed in, see docs for a list of available properties
  // https://firebase.google.com/docs/reference/js/firebase.User
  // ...
  
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
} else {
  // No user is signed in.
  document.getElementById('retornoexcluir').innerText = "Refaça login";
}
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


//------------------------LOGIN COM FACEBOOK
//------------------------LOGIN COM TWITTER
//------------------------LOGIN COM GOOGLE

const btnGoogle = document.getElementById('btngoogle');

btnGoogle.addEventListener('click', () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
})
