import clock from "clock";
import document from "document";
import { me as device } from "device";
import { HeartRateSensor } from "heart-rate";
import { battery } from "power";
import { me } from "appbit";
import { Localise }  from "./localise";
import { geolocation } from "geolocation";
import { BatteryMarker }  from "./battery_marker";
import {WeatherIcon} from "./weather";
import { today } from 'user-activity';
import { BodyPresenceSensor } from "body-presence";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import * as messaging from "messaging";
import * as fs from "fs";


let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
let months = ["JAN ", "FEB", "MAR", "APR", "MAY", "JUN ", "JUL ", "AUG", "SEP", "OCT", "NOV", "DEC"];


// Get a handle on the <text> element
const dateField = document.getElementById("dateField");
let hours2S = document.getElementById("hours2Special");
let hours1 = document.getElementById("hours1");
let hours2 = document.getElementById("hours2");
let mins1 = document.getElementById("mins1");;
let mins2 = document.getElementById("mins2");

let period = document.getElementById("period");
let dist = document.getElementById("dist");
let hrIcon = document.getElementById("hrIcon");
let hrField = document.getElementById("hrField");
let batField = document.getElementById("batField");
let floorsField = document.getElementById("floorsField");
let myTemp = document.getElementById("myTemp");
let myDescription = document.getElementById("myDescription");
let amField = document.getElementById("amField");
let stepsField9 = document.getElementById("stepsField9");
let calsField6 = document.getElementById("calsField6");
let distField4 = document.getElementById("distField4");

stepsField9.text=0;
distField4.text=0;
calsField6.text=0;
let distField = 0
let calsField = 0
let stepsField = 0
let dist = 0;
const sensors = [];

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

let settings = loadSettings();
function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  }
  catch (ex) {
    return {
      accentcolor: "white",
      markercolor: "teal"
    };
  }
}

function fetchWeather() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send a command to the companion
    messaging.peerSocket.send({
      command: 'weather'
    });
  }
}


// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  console.log("Connection error: " + err.code + " - " + err.message);
}


messaging.peerSocket.onopen = function() {
  // Fetch weather when the connection opens
  fetchWeather();
}

me.addEventListener("unload", saveSettings);
function saveSettings() {
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}

messaging.peerSocket.onmessage = evt => {
  if (evt.data) {
    processWeatherData(evt.data);
  }
  
  if (evt.data.newValue){
    switch (evt.data.key) {
      case "accentcolor":
        settings.accentcolor = JSON.parse(evt.data.newValue); 
        setColours(settings.accentcolor, settings.markercolor);
        break;
      case "markercolor":
        settings.markercolor = JSON.parse(evt.data.newValue); 
        setColours(settings.accentcolor, settings.markercolor);
        break;
    }    
  }
};


function setColours(accentcolour, markercolour) {
  let elements = document.getElementsByClassName("accentcolour");
  elements.forEach(function (element) {
    element.style.fill = accentcolour;
  });
  
  
  elements = document.getElementsByClassName("markercolour");
  elements.forEach(function (element) {
    element.style.fill = markercolour;
  });
}

if (HeartRateSensor) {
  const hrm = new HeartRateSensor({ frequency: 1 });
  hrm.addEventListener("reading", () => {
    hrField.text = JSON.stringify(
      hrm.heartRate ? hrm.heartRate : 0
    );
  });
  sensors.push(hrm);
  hrm.start();
} else {
  hrField.text = "--";
}


if (BodyPresenceSensor) {
  const bps = new BodyPresenceSensor();
  bps.addEventListener("reading", () => {
  });
  sensors.push(bps);
  bps.start();
} 

function setHour1(val){
   
}



function processWeatherData(data){
  if (data) {
    let weatherIcon = new WeatherIcon(data.description, data.main);
    if (preferences.temperature === "F")
    myTemp.text =  data.temperature + " °F";
    
  else
    if(isNaN(Math.floor(data.temperature))){myTemp.text = "- °C"}
    else {
      myTemp.text = Math.floor(data.temperature)+" °C";
    }
  } 
}

function stats(val){
 
  
}

//sets time for digital font
function setHours(val) {
  
}

function setMins(val) {
  drawDigit(Math.floor(val / 10), mins1);
  drawDigit(Math.floor(val % 10), mins2);
}

function draw0(){
  
}

function draw(val, place) {
  
}

//for Digital fonts, changes images for hours and minutes according to what the time is
function drawDigit(val, place) {
  place.style.opacity=1;
  place.href = `./resources/bold/${val}.png`;   
}

// Update the clock every second
clock.granularity = "seconds";

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let batteryMarker = new BatteryMarker(document);
  let Local = new Localise(evt.date);
  
  let hours = evt.date.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    if(hours>12)  period.text = "pm";
    else  period.text = "am";
    period.style.opacity=1;
    hours = hours % 12 || 12;
    
  } else {
    // 24h format
    period.style.opacity=0;
    hours = util.zeroPad(hours);
  }
  setHours(hours);
  let Mins = ("0" + evt.date.getMinutes()).slice(-2);
  setMins(Mins);
  batField.text = `${battery.chargeLevel}%`;
  stats(hours);
}

// Fetch the weather every 30 minutes
setInterval(fetchWeather, 1 * 1000 * 60);
setColours(settings.accentcolor, settings.markercolor);
