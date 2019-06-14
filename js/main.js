  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB1AMMWAzFOaJFhs3LHZA5ooN0G00mUZHo",
    authDomain: "res-web.firebaseapp.com",
    databaseURL: "https://res-web.firebaseio.com",
    projectId: "res-web",
    storageBucket: "res-web.appspot.com",
    messagingSenderId: "836831269770"
  };
  firebase.initializeApp(config);
  
function send() {
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var phone = document.getElementById('phone').value;
  var textarea = document.getElementById('comment').value;

  let feedback = {
    name: name,
    email: email,
    phone: phone,
    Comments: textarea
  }
  firebase.database().ref("/").child('feedback/').setItem(feedback)
    .then((success) => {
      window.alert("Your request have been submitted successfully")
    })
    .catch((error) => {
      var errMessage = error.message;
      var errCode = error.code;
      console.log(errMessage);


    })
}