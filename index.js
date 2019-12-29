function writeUserData(user) {
  firebase.database().ref('users/' + user.uid).set({
    email: user.email
  });
}


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
    document.getElementById("todo").style.display = "block";
    document.getElementById("user").style.display = "block";
        
    currentUser = user;
    writeUserData(user);


    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      var email_verfied = user.emailVerified;

      if(email_verfied){
        document.getElementById("verify_btn").style.display = "none";
      }else{
        document.getElementById("verify_btn").style.display = "block";
      }
      document.getElementById("user_para").innerHTML = "User : " + email_id + "<br> Verfied : " + email_verfied;


    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

    document.getElementById("todo").style.display = "none";
    document.getElementById("user").style.display = "none";


  }
});





function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}


function create_account(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);
  });

}

function send_verification(){

  var user = firebase.auth().currentUser;

  user.sendEmailVerification().then(function() {
    // Email sent.
    window.alert("Verification Sent! Check your email!");
  }).catch(function(error) {
    // An error happened.
    window.alert("Err!");
  });
  


}

function forgot_password(){

  var userEmail = document.getElementById("email_field").value;
  
  var auth = firebase.auth();
  
var emailAddress = userEmail;

auth.sendPasswordResetEmail(emailAddress).then(function() {
  // Email sent.
  window.alert("Password reset link has been generated!");
}).catch(function(error) {
  // An error happened.
  window.alert("Err!");
});

}


function deleteacc(){

  var rand = Math.round(Math.random()*100000);
  if(window.prompt("Type the number to confirm \n " + "\t\t" + rand) == rand)
  {
    var user = firebase.auth().currentUser;
    var userProvidedPassword = window.prompt("Re-enter your Password");
    var credential = firebase.auth.EmailAuthProvider.credential(
      user.email, 
      userProvidedPassword
  );

// Prompt the user to re-provide their sign-in credentials

user.reauthenticateWithCredential(credential).then(function() {
  // User re-authenticated.
}).catch(function(error) {
  // An error happened.
});

user.delete().then(function() {
  // User deleted.
  window.alert("User deleted");
}).catch(function(error) {
  // An error happened.
  window.alert("User NOT deleted!");
});


  }else{
    window.alert("Err! Please type "+rand);
  }
  
}

function change_pass(){


var user = firebase.auth().currentUser;
    var userProvidedPassword = window.prompt("Enter your old Password : ");
    var credential = firebase.auth.EmailAuthProvider.credential(
      user.email, 
      userProvidedPassword
  );

// Prompt the user to re-provide their sign-in credentials

user.reauthenticateWithCredential(credential).then(function() {
  // User re-authenticated.
    var user = firebase.auth().currentUser;
  var newPassword = window.prompt("Enter your new Password : ");

  user.updatePassword(newPassword).then(function() {
    // Update successful.
    window.alert("Password Updated!");
  }).catch(function(error) {
    // An error happened.
    window.alert("Password NOT Updated!");
  });
  
}).catch(function(error) {
  // An error happened.
  window.alert("Password NOT Updated!");
});

}


function logout(){
  firebase.auth().signOut();
}

function addcab(h){
  firebase.database().ref('cabs/' + h.id).set(h);
}

$("#add_cabpool").click(function(){
  var cab = {
    id: $("#v1").val() + Date.now(),
    
    date: $("#v1").val(),
    time: $("#v2").val(),
    
    contact: $("#v5").val(),
    comments: $("#v6").val()
  }

  }
