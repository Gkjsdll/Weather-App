"use strict";

$(document).ready(init);

var $locationInput;
var $locationInputBtn;
var $times12hour;
var $temps12hour;
var $day12hour1;
var $severeConditions;
var $humidity;

var forecast;



function init(){
  $locationInput = $('#locationInput');
  $locationInputBtn = $('#locationInputBtn');
  $times12hour = $('#times12hour').children();
  $temps12hour = $('#temps12hour').children();
  $day12hour1 = $('#day12hour1');
  $severeConditions = $('#severeConditions');
  $humidity = $('#humidity');

  $locationInputBtn.click(updateLocation);

  $.get("http://api.wunderground.com/api/055d327551912b82/geolookup/q/autoip.json")
  .done(function(data){
    $locationInput.val(data.location.zip);
    updateLocation();
  });
}

function updateLocation(){
  zip12hour();
  severeConditions();
  humidity();
};

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
}

function severeConditions(){
  $severeConditions.children().remove();
  $.get("http://api.wunderground.com/api/055d327551912b82/currenthurricane/view.json")
  .done(function(data){
    for(var condition in data.currenthurricane){
      var conditionName = data.currenthurricane[condition].stormInfo.stormName_Nice;
      var conditionObj = $('<p>').text(conditionName);
      $severeConditions.append(conditionObj);
    }
  });
}

function humidity(){
  $humidity.children().remove();
  $.get("http://api.wunderground.com/api/055d327551912b82/conditions/q/CA/San_Francisco.json")
  .done(function(data){
    var relStr = "Relative humidity: " + data.current_observation.relative_humidity;
    var relObj = $('<p>').text(relStr);

    var humidityStr = "Feels like: " + data.current_observation.feelslike_string;
    var humidityObj = $('<p>').text(humidityStr);

    var dewPointStr = "Dewpoint: " + data.current_observation.dewpoint_string;
    var dewPointObj = $('<p>').text(dewPointStr);

    $humidity.append(relObj, humidityObj, dewPointObj);
  });
}
