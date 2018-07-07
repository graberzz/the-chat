import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBnZTs_h_o0Uw5m706dcTbP54VtSM5ZZYE",
  authDomain: "chat-8a443.firebaseapp.com",
  databaseURL: "https://chat-8a443.firebaseio.com",
  projectId: "chat-8a443",
  storageBucket: "chat-8a443.appspot.com",
  messagingSenderId: "660697500625"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
}

const database = firebase.database();

export { firebase };

export default database;
