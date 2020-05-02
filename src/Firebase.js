import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import configFile from "./firebaseConfig.json"
const firebaseConfig = configFile
export default firebase.initializeApp(firebaseConfig)
