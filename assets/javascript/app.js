// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyC5_VYXJmgHpb98iF5FnsE28owoiFyKmow",
  authDomain: "shayan-test-e6555.firebaseapp.com",
  databaseURL: "https://shayan-test-e6555.firebaseio.com",
  projectId: "shayan-test-e6555",
  storageBucket: "shayan-test-e6555.appspot.com",
  messagingSenderId: "697154416393"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // // Grabs user input
  // var empName = $("#employee-name-input").val().trim();
  // var empRole = $("#role-input").val().trim();
  // var empStart = $("#start-input").val().trim();
  // var empRate = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = { 
    name: $("#train-name-input").val().trim(),
    dest: $("#destination-input").val().trim(),
    start: $("#start-input").val().trim(),
    rate: $("#rate-input").val().trim(),
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain);

  alert("Employee successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var trainStart = childSnapshot.val().start;
  var trainRate = childSnapshot.val().rate;

  // Employee Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainStart);
  console.log(trainRate);

  var convertedTime = moment(trainStart, "hh:mm").subtract(1, "years");
  console.log(convertedTime);

  //calculate diff btw train start time and current time

var timeDiff = moment().diff(moment(convertedTime),"minutes");
var timeApart = timeDiff%trainRate; // % gives remainder of a division
var timeLeft = trainRate-timeApart; 
var nextArrival = moment().add(timeLeft, "m").format("LT")



var newRow = $("<tr>").append(
  $("<td>").text(trainName),
  $("<td>").text(trainDest),
  $("<td>").text(trainRate),
  $("<td>").text(nextArrival),
  $("<td>").text(timeLeft),
)
  // // Prettify the employee start
  // var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

  // // Calculate the months worked using hardcore math
  // // To calculate the months worked
  // var empMonths = moment().diff(moment(empStart, "X"), "months");
  // console.log(empMonths);

  // // Calculate the total billed rate
  // var empBilled = empMonths * empRate;
  // console.log(empBilled);

  // // Create the new row
  
  // var newRow = $("<tr>").append(
  //   $("<td>").text(empName),
  //   $("<td>").text(empRole),
  //   $("<td>").text(empStartPretty),
  //   $("<td>").text(empMonths),
  //   $("<td>").text(empRate),
  //   $("<td>").text(empBilled)
  
  // );

  // Append the new row to the table
  $("#schedule-table").append("<tr> <td>" + trainName + "</td>  " + "<td>" + trainDest + "</td></tr>");
  
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case




