import firebase from 'firebase'
require('@firebase/firestore');

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAOXdLhNCqmam_QXFxGXYI15YVl3myv7ow",
    authDomain: "find-a-mechanic-fd99a.firebaseapp.com",
    projectId: "find-a-mechanic-fd99a",
    storageBucket: "find-a-mechanic-fd99a.appspot.com",
    messagingSenderId: "954852648155",
    appId: "1:954852648155:web:31d3fe9d6871d2be8318fe",
    measurementId: "G-PV4QQPK122"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();