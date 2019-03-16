

 var config = {
    apiKey: "AIzaSyBmdDAlmhKUmFOIg_owIWpBdE7lAwtRsYw",
    authDomain: "trainscheduletime.firebaseapp.com",
    databaseURL: "https://trainscheduletime.firebaseio.com",
    projectId: "trainscheduletime",
    storageBucket: "trainscheduletime.appspot.com",
    messagingSenderId: "781679347135"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  var trainName = "";
  var destination ="";
  var frequency= "";
  var trainTime= 0;

  
  database.ref().on("value", function(snapshot) {
    if (snapshot.child("trainName").exists() && snapshot.child("destination").exists() && snapshot.child("trainTime").exists() && snapshot.child("frequency").exists() ) {
    
        trainName = snapshot.val().trainName;
        destination = parseInt(snapshot.val().destination);
        trainTime = snapshot.val().trainTime;
        frequency = snapshot.val().frequency;
      }

}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
 
});

  $("#submit-bid").on("click", function(event) {
    // Don't refresh the page!
    event.preventDefault();
console.log("button clicked")

    trainName = $("#trainName-input").val().trim();
    destination = $("#destination-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    trainTime = $("#trainTime-input").val().trim();

    database.ref().set({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      trainTime:trainTime
    });

  });
