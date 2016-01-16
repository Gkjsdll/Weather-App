"use strict";

$(document).ready(init);

var $locationInput;
var $locationInputBtn;
var $times12hour;
var $temps12hour;
var $day12hour1;

var assumedLocation;
var forecast;

function updateLocation(){
  console.log("Clicky Clicky");
  zip12hour();
};


function init(){
  $locationInput = $('#locationInput');
  $locationInputBtn = $('#locationInputBtn');
  $times12hour = $('#times12hour').children();
  $temps12hour = $('#temps12hour').children();
  $day12hour1 = $('#day12hour1');

  $locationInputBtn.click(updateLocation);

  $.get("http://api.wunderground.com/api/055d327551912b82/geolookup/q/autoip.json")
  .done(function(data){
    assumedLocation = data.location;
    $locationInput.val(assumedLocation.city + ", " + assumedLocation.state);
    $locationInput.val("");
    zip12hour();
  });
  severeConditions();
}

function zip12hour(){
  $.get("http://api.wunderground.com/api/055d327551912b82/hourly/q/" + $locationInput.val() + ".json")
  .done(function(data){
    forecast = data.hourly_forecast;
    if(forecast[0].FCTTIME.weekday_name !== forecast[11].FCTTIME.weekday_name){
      $day12hour1.text(forecast[0].FCTTIME.weekday_name + " – " + forecast[11].FCTTime.weekday_name);
    }
    else{
      $day12hour1.text(forecast[0].FCTTIME.weekday_name);
    }
    for(var hour in forecast.splice(0, 12)){
      $times12hour.eq(hour).text(forecast[hour].FCTTIME.civil);
      $temps12hour.eq(hour).text(forecast[hour].temp.metric + "\u00B0c");
    };
  });
  console.log("zip12hour executed");
}

function severeConditions(){
  $.get("http://api.wunderground.com/api/055d327551912b82/currenthurricane/view.json")
  .done(function(data){
    debugger;
    for(var condition in data.currenthurricane){
      var conditionName = data.currenthurricane[condition].stormInfo.stormName_Nice;

    }
  });
  console.log("severeConditions executed");
}
