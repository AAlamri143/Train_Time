
    
var config = {
    apiKey: "AIzaSyC5qEUoWHPED2pVjW1JdjBBYq97dDijCLU",
    authDomain: "train-abdullah.firebaseapp.com",
    databaseURL: "https://train-abdullah.firebaseio.com",
    projectId: "train-abdullah",
    storageBucket: "train-abdullah.appspot.com",
    messagingSenderId: "1064512184149"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  


  $(document).on("click", "#add-train-btn", function(event) {
      event.preventDefault();

      var trainInput = $("#train-name-input").val().trim();
      var destinInput = $("#destination-input").val().trim();
      var firstInput = $("#first-train-time-input").val().trim();
      var frequInput = $("#frequency-input").val().trim();

      var newTrain = {
          name: trainInput,
          destination: destinInput,
          first: firstInput,
          frequency: frequInput
      };

      database.ref().push(newTrain);

      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.first);
      console.log(newTrain.frequency);

      alert("Train successfully added");

      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#first-train-time-input").val("");
      $("#frequency-input").val("");
    });

  database.ref().on("child_added", function(childSnapshot) {
      console.log(childSnapshot.val());

      var tName = childSnapshot.val().name;
      var tDestination = childSnapshot.val().destination;
      var tFirst = childSnapshot.val().first;
      var tfrequency = childSnapshot.val().frequency;

      console.log(tName);
      console.log(tDestination);
      console.log(tFirst);
      console.log(tfrequency);
      
	
	

  // Prettify the employee start
//   var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

//   // Calculate the months worked using hardcore math
//   // To calculate the months worked
//   var empMonths = moment().diff(moment(empStart, "X"), "months");
//   console.log(empMonths);

//   // Calculate the total billed rate
//   var empBilled = empMonths * empRate;
//   console.log(empBilled);



  var newRow = $("<tr>").append(
    $("<td>").text(tName),
    $("<td>").text(tDestination),
    $("<td>").text(tFirst),
    $("<td>").text(tfrequency),
    
    );

    $("#train-table > tbody").append(newRow);
    
    
});
  

