
    
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

  /////////////    TIME    //////////////
var momentDate = moment().format('dddd');
var showDate = $(".date-moment").html('<i class="far fa-calendar-alt"></i> ' + momentDate)

var momentDay = moment().format('LL');
var showDay = $(".day-moment").text(momentDay);

var momentTime = moment().format('LTS');
var showTime = $(".time-moment").text(momentTime);

setInterval(function () {
    $(".time-moment").text(moment().format('LTS'));
}, 1000);



  $(document).on("click", "#add-train-btn", function(event) {
      event.preventDefault();
      var Sound = new Audio('assets/images/go.mp3');
      Sound.play();
      
      
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
      
    
    // Back day
    var trainStartBackday = moment(tFirst, "hh:mm a").subtract(1, "days");
    console.log(tFirst)

    // Check different
    var trainMinDiff = moment().diff(trainStartBackday, "minutes")
    console.log(trainMinDiff)

    // the remainder is the last train have runned minutes until now.
    var trainLastMins = trainMinDiff % tfrequency
    console.log(trainLastMins)

    // minutes away for next train = frequency(total minutes) - remainder(last train have runned minutes)
    var trainNextMins = tfrequency - trainLastMins
    console.log(trainNextMins)


	    // time when next train arrivaled = now time + minutes away for next train
        var trainArrivalMins = moment().add(trainNextMins, "minutes")
        var trainArrivalTime = moment(trainArrivalMins).format("LT")
        console.log(trainArrivalMins)
        console.log(trainArrivalTime)


    // store keys of firebase
    var key = childSnapshot.key
    console.log(key)

var removeButton = '<button type="submit" class="" id="remove-button" data-key="' + key + '"><i class="fas fa-times"></i></button>'



  var newRow = $("<tr>").append(
    $("<td>").text(tName),
    $("<td>").text(tDestination),
    $("<td>").text(tfrequency + "-MIN"),
    $("<td>").text(trainArrivalTime),
    $("<td>").text(trainNextMins + " mins"),
    $("<td>").html(removeButton)

    
    );

    $("#train-table > tbody").append(newRow);
    
    $(document).on("click", "#remove-button", function () {
        database.ref().child($(this).attr("data-key")).remove();
        window.location.reload();
    })

});
  

