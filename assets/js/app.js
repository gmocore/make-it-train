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

$("#submit").click(function(e) {
  // prevent page from reloading on click
  e.preventDefault();
  // variables for form input values
  let trainNameInput = $("#train-name").val();
  let destinationInput = $("#destination").val();
  let firstTrainInput = $("#first-train-time").val();
  let frequencyInput = $("#frequency").val();
  let trainFrequency = frequencyInput;
  let firstTrainTime = moment(firstTrainInput, "HH:mm").format("HH:mm");
  // moment varables for manipulating time
  let firstTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(
    1,
    "years"
  );
  // calculates difference in converted time by minutes
  let diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
  // remainder of difference in time divided by frequency value
  let tRemainder = diffTime % trainFrequency;
  // calculates minutes to next train using math
  let tMinutesTillTrain = trainFrequency - tRemainder;
  // current time + minutes until next train
  let nextTrain = moment().add(tMinutesTillTrain, "minutes");

  // push stored values to database. this creates a new instance every time, and does not overwrite existing data
  database.ref().push({
    trainName: trainNameInput,
    destination: destinationInput,
    firstTrainTime: firstTrainInput,
    frequency: frequencyInput,
    nextArrival: moment(nextTrain).format("hh:mm"),
    minutesAway: tMinutesTillTrain
  });

  // clear inputs on submit
  trainNameInput = $("#train-name").val("");
  destinationInput = $("#destination").val("");
  firstTrainInput = $("#first-train-time").val("");
  frequencyInput = $("#frequency").val("");
});

// reads stored values in firebase
database.ref().on("child_added", snapshot => {
  console.log(snapshot.val());
  // variables for displaying data from firebase to the DOM
  const row = $("<tr>");
  const trainNameTd = $("<td>");
  const destinationTd = $("<td>");
  const frequencyTd = $("<td>");
  const nextArrivalTd = $("<td>");
  const minutesAwayTd = $("<td>");

  // sets text of table data to stored firebase values
  trainNameTd.text(snapshot.val().trainName);
  destinationTd.text(snapshot.val().destination);
  frequencyTd.text(snapshot.val().frequency);
  nextArrivalTd.text(snapshot.val().nextArrival);
  minutesAwayTd.text(snapshot.val().minutesAway);
  // append updated data to the table for the user to see on the page
  $(row).append(
    trainNameTd,
    destinationTd,
    frequencyTd,
    nextArrivalTd,
    minutesAwayTd
  );
  $("tbody").append(row);
});
