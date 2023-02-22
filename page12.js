var firebaseConfig = {
    apiKey: "AIzaSyB6CMwkqV77uOMOswg7JaLWkMGjLOA3LX4",
    authDomain: "kafe-51912.firebaseapp.com",
    databaseURL: "https://kafe-51912-default-rtdb.firebaseio.com",
    projectId: "kafe-51912",
    storageBucket: "kafe-51912.appspot.com",
    messagingSenderId: "487624418851",
    appId: "1:487624418851:web:a1d9b5cff3fed92bf63396",
    measurementId: "G-R39J9MYEPZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialize database
const db = firebase.database();

// get user's data
const username = prompt("Ваша имя и спасибо за отзыв");

// submit form
// listen for submit event on the form and call the postChat function
document.getElementById("message-form").addEventListener("submit", sendMessage);

// send message to db
function sendMessage(e) {
    e.preventDefault();

    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;

    // clear the input box
    messageInput.value = "";

    //auto scroll to bottom
    document
        .getElementById("messages")
        .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

    // create db collection and send in the data
    db.ref("messages/" + timestamp).set({
        username,
        message,
    });
}

// display the messages
// reference the collection created earlier
const fetchChat = db.ref("messages/");

// check for new messages using the onChildAdded event listener
fetchChat.on("child_added", function(snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
      username === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;
});