// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, addDoc, getFirestore, getDocs, where, query, updateDoc, doc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const dbFirestore = getFirestore(app);
const auth = getAuth(app);

async function writeFireStore(table, data){
  try {
    const docRef = await addDoc(collection(dbFirestore, table), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function readFireStore(table, my_query){
  if(my_query){
    try{
      const m_query = query(collection(dbFirestore, table), where(my_query.var_name, my_query.operator, my_query.data));
      const querySnapshot = await getDocs(m_query);
      return querySnapshot;
    }catch(e){
      console.error("Error adding document: ", e);
    }
  }else{
    try {
      const querySnapshot = await getDocs(collection(dbFirestore, table));
      return querySnapshot;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}

async function updateFireStore(table, document_id, data){
  const updateRef = doc(dbFirestore, table, document_id)
  const reuslt = await updateDoc(updateRef, data).then(res => {
    console.log(res);
    return true;
  }).catch(err => {
    console.log(err);
    return false;
  })
  return reuslt;
}


function generateRecaptcha(button_id){
  window.recaptchaVerifier = new RecaptchaVerifier(button_id, {
    'size': 'invisible',
    'callback': (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      
    }
  }, auth);
}

function authGetPhoneCode(phone_num, button_id){
  auth.languageCode = 'ko';
  generateRecaptcha(button_id);
  const appVerifier = window.recaptchaVerifier;
  signInWithPhoneNumber(auth, `+82 ${phone_num}`, appVerifier).then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
  }).catch((error) => {
     console.log(error);
  // ...
  });
}

async function firebaseCreateAccount(email, password){
  const result = await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    return user;
    // ...
  })
  .catch((error) => {
    return null;
    // ..
  });
  return result;
}

async function firebaseLogin(email, password){
  const result = signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    return user;
    // ...
  })
  .catch((error) => {
    return null;
  });
  return result;
}

async function firebaseLogout(){
  const result =  await signOut(auth).then(() => {
    return true
  }).catch((error) => {
    return false;
  });
  return result;
}

async function authSendPhoneCode(phonecode){
  const code = phonecode;
  const result = await window.confirmationResult.confirm(code).then((result) => {
    return result.user;
  // ...
}).catch((error) => {
  // User couldn't sign in (bad verification code?)
  return null;
  // ...
});
return result;
}

async function uploadStorage(file){
  const storage = getStorage();
  const storageRef = ref(storage, `img/${file.name}`)
  const download_url = await uploadBytes(storageRef, file).then(res => {
    return getDownloadURL(res.ref).then(url => {
      return url;
    })
  }).catch(err => {
    console.log(err);
  })
  return download_url;
}

export {app, writeFireStore, readFireStore, uploadStorage, authGetPhoneCode, authSendPhoneCode, firebaseCreateAccount, firebaseLogin, firebaseLogout, updateFireStore};