import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'



var firebaseConfig = {
  apiKey: "AIzaSyCJuql5gytVnomUcT59QSemzn_gdhpWcjs",
  authDomain: "web-and-mobile-saylani-f7d01.firebaseapp.com",
   projectId: "web-and-mobile-saylani-f7d01",
  storageBucket: "web-and-mobile-saylani-f7d01.appspot.com",
  messagingSenderId: "763022988199",
  appId: "1:763022988199:web:b71c386ade6f48ee819c82",
  measurementId: "G-YQESRDS0VY"
};

firebase.initializeApp(firebaseConfig)


  export default firebase;
