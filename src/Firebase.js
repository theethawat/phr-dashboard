import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCCjlqtLbEIwqfhHXNIDhXIOOrx3u2IzM8",
  authDomain: "personal-health-connect-aa36c.firebaseapp.com",
  databaseURL: "https://personal-health-connect-aa36c.firebaseio.com",
  projectId: "personal-health-connect-aa36c",
  storageBucket: "personal-health-connect-aa36c.appspot.com",
  messagingSenderId: "716479950882",
  appId: "1:716479950882:web:51df5be3baf2728ae55a7b",
}

export default firebase.initializeApp(firebaseConfig)
