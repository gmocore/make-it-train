// enables firebase access
const firebaseConfig = {
  apiKey: "AIzaSyCz-6_0v_w6yCo3eYw5s7Yj9030kXMs32g",
  authDomain: "firetest-1f338.firebaseapp.com",
  databaseURL: "https://firetest-1f338.firebaseio.com",
  projectId: "firetest-1f338",
  storageBucket: "firetest-1f338.appspot.com",
  messagingSenderId: "287293520459",
  appId: "1:287293520459:web:f542392c600d89e4"
};

// sets up connection to firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

let trainName = "";
let destination = "";
let firstTrain = 0;
let frequency = 0;

// 2. Button for adding Trains
$("#submit").on("click", function(e) {
  e.preventDefault();

  trainName = $("#train-name")
    .val()
    .trim();

  destination = $("#destination")
    .val()
    .trim();

  firstTrain = $("#first-train-time")
    .val()
    .trim();

  frequency = $("#frequency")
    .val()
    .trim();

  // Clears all of the text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train-time").val("");
  $("#frequency").val("");

  //pushes to database
  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  });
});

database.ref().on(
  "child_added",
  function(childSnapshot) {
    // variables for displaying data to table

    const row = $("<tr>");
    const trainNameTd = $("<td>");
    const destinationTd = $("<td>");
    const frequencyTd = $("<td>");
    const nextArrivalTd = $("<td>");
    const minutesAwayTd = $("<td>");

    //calculations needed

    let firstTimeConverted = moment(
      childSnapshot.val().firstTrain,
      "hh:mm"
    ).subtract(1, "years");

    let timeDiff = moment().diff(moment(firstTimeConverted), "minutes");

    let remainder = timeDiff % childSnapshot.val().frequency;

    let minsUntilTrain = childSnapshot.val().frequency - remainder;

    let nextTrainTime = moment().add(minsUntilTrain, "minutes");

    trainNameTd.text(childSnapshot.val().trainName);
    destinationTd.text(childSnapshot.val().destination);
    frequencyTd.text(childSnapshot.val().frequency);
    nextArrivalTd.text(moment(nextTrainTime).format("hh:mm"));
    minutesAwayTd.text(minsUntilTrain);

    // Add each train's data into the table
    $(row).append(
      trainNameTd,
      destinationTd,
      frequencyTd,
      nextArrivalTd,
      minutesAwayTd
    );
    $("tbody").append(row);

    // Handle the errors
  },
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
);
