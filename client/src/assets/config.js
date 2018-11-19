import firebase from 'firebase'

let config = {
    apiKey: "AIzaSyCJon8KmFm6ToYXiRWSodIWkSQS1LxZYzk",
    authDomain: "h8ikeblog.firebaseapp.com",
    databaseURL: "https://h8ikeblog.firebaseio.com",
    projectId: "h8ikeblog",
    storageBucket: "h8ikeblog.appspot.com",
    messagingSenderId: "812059727567"
};

firebase.initializeApp(config);
const database = firebase.database();



export default database