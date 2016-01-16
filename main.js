"use strict";

$(document).ready(init);

var $locationInput;
var $locationInputBtn;

var assumedLocation;

$.get("http://api.wunderground.com/api/055d327551912b82/geolookup/q/94107.json")
    .done(function(data){
    assumedLocation = data.location;
    $locationInput.val(assumedLocation.city + ", " + assumedLocation.state);
});



function updateLocation(){
  //get values from user input
  console.log("Clicky Clicky");
};



  function init(){
    $locationInput = $('#locationInput');
    $locationInputBtn = $('#locationInputBtn');
    $locationInputBtn.click(updateLocation);
    $locationInput.attr("value", "test");
}
