
//Firebase connection
var config = {
  apiKey: "AIzaSyBmdDAlmhKUmFOIg_owIWpBdE7lAwtRsYw",
  authDomain: "trainscheduletime.firebaseapp.com",
  databaseURL: "https://trainscheduletime.firebaseio.com",
  projectId: "trainscheduletime",
  storageBucket: "trainscheduletime.appspot.com",
  messagingSenderId: "781679347135"
};
firebase.initializeApp(config);

//Global Variables
var database = firebase.database();
var trainName = "";
var destination = "";
var frequency = "";
var trainTime = 0;
var minutesAway = 0;



database.ref().on("child_added", function (snapshot) {
  if (snapshot.child("trainName").exists() && snapshot.child("destination").exists() && snapshot.child("trainTime").exists() && snapshot.child("frequency").exists()) {
  //  console.log(snapshot.val());
  
    trainName = snapshot.val().trainName;
    destination = snapshot.val().destination;
    frequency = snapshot.val().frequency;
    trainTime = snapshot.val().trainTime;
    minutesAway = snapshot.val().minutesAway;
    
    trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
   
//    var currentTime = moment();
    var diffTime = moment().diff(moment(trainTimeConverted), "minutes");

    var remainder = diffTime % frequency;

    // Minute Until Train
    var minutesTillTrain = frequency - remainder;

    // Next Train
    var nextTrain = moment().add(minutesTillTrain, "minutes");

    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextTrain),
      $("<td>").text(minutesTillTrain),
    );
    $(".table > tbody").append(newRow);
  }

}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);

});

$("#submit-bid").on("click", function (event) {
  // Don't refresh the page!
  event.preventDefault();

  trainName = $("#trainName-input").val().trim();
  destination = $("#destination-input").val().trim();
  frequency = $("#frequency-input").val().trim();
  trainTime = $("#trainTime-input").val().trim();

    database.ref().push({
    trainName: trainName,
    destination: destination,
    frequency: frequency,
    trainTime: trainTime,


  });
  $("#trainName-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
  $("#trainTime-input").val("");
  $("#minutesAways-input").val("");
});
