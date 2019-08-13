const firebaseConfig = {
  apiKey: "AIzaSyCz-6_0v_w6yCo3eYw5s7Yj9030kXMs32g",
  authDomain: "firetest-1f338.firebaseapp.com",
  databaseURL: "https://firetest-1f338.firebaseio.com",
  projectId: "firetest-1f338",
  storageBucket: "firetest-1f338.appspot.com",
  messagingSenderId: "287293520459",
  appId: "1:287293520459:web:f542392c600d89e4"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

$("#submit").click(function(e) {
  e.preventDefault();
  let trainNameInput = $("#train-name").val();
  let destinationInput = $("#destination").val();
  let firstTrainInput = $("#first-train-time").val();
  let frequencyInput = $("#frequency").val();
  let trainFrequency = frequencyInput;
  let firstTrainTime = moment(firstTrainInput, "HH:mm").format("HH:mm");
  let firstTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(
    1,
    "years"
  );
  let currentTime = moment();
  let diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
  let tRemainder = diffTime % trainFrequency;
  let tMinutesTillTrain = trainFrequency - tRemainder;
  let nextTrain = moment().add(tMinutesTillTrain, "minutes");

  database.ref().push({
    trainName: trainNameInput,
    destination: destinationInput,
    firstTrainTime: firstTrainInput,
    frequency: frequencyInput,
    nextArrival: moment(nextTrain).format("hh:mm"),
    minutesAway: tMinutesTillTrain
  });
  trainNameInput = $("#train-name").val("");
  destinationInput = $("#destination").val("");
  firstTrainInput = $("#first-train-time").val("");
  frequencyInput = $("#frequency").val("");
});

database.ref().on("child_added", snapshot => {
  console.log(snapshot.val());
  const row = $("<tr>");
  const trainNameTd = $("<td>");
  const destinationTd = $("<td>");
  const frequencyTd = $("<td>");
  const nextArrivalTd = $("<td>");
  const minutesAwayTd = $("<td>");

  trainNameTd.text(snapshot.val().trainName);
  destinationTd.text(snapshot.val().destination);
  frequencyTd.text(snapshot.val().frequency);
  nextArrivalTd.text(snapshot.val().nextArrival);
  minutesAwayTd.text(snapshot.val().minutesAway);
  $(row).append(
    trainNameTd,
    destinationTd,
    frequencyTd,
    nextArrivalTd,
    minutesAwayTd
  );
  $("tbody").append(row);
});
