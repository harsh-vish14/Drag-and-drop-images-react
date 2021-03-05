import firebase from 'firebase'
const config = {
  apiKey: "AIzaSyAtvmYQmaMrv9h0DM1AImtEN1IfUCTrRTs",
  authDomain: "images-to-link-converter.firebaseapp.com",
  projectId: "images-to-link-converter",
  storageBucket: "images-to-link-converter.appspot.com",
  messagingSenderId: "1060353689833",
  appId: "1:1060353689833:web:dd8efa1b7c8072af120878"
};

const firebaseApp = firebase.initializeApp(config);
const storage = firebaseApp.storage()
export default storage;