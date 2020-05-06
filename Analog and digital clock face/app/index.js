import clock from "clock";
import document from "document";
import { units } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { me } from "appbit";
import { display } from "display";
import { BodyPresenceSensor } from "body-presence";
import { today } from 'user-activity';
import { goals } from "user-activity";
import * as messaging from "messaging";
import { battery } from "power";
import * as util from "../common/utils";
import * as fs from "fs";


const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

// Update the clock every minute

let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");
const DateField = document.getElementById("DateField");
let dayField = document.getElementById("dayField");
let hrField = document.getElementById("hrField");
let stepsField = document.getElementById("stepsField");
let backgroundGradient = document.getElementById("backgroundGradient");
let calsField = document.getElementById("calsField");
let calsMeter = document.getElementById("calsMeter");
let stepsMeter = document.getElementById("stepsMeter");
let batteryhand = document.getElementById("batteryhand");
let calshand = document.getElementById("calshand");
let stepshand = document.getElementById("stepshand");
let batteryPercent = document.getElementById("batteryPercent");
let batteryMeter = document.getElementById("batteryMeter");

const hourhand = document.getElementById("hourhand");
const minutehand = document.getElementById("minutehand");
const secondhand = document.getElementById("secondhand");

let settings = loadSettings();
function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  }
  catch (ex) {
    return {
      accentcolor: "dodgerblue",
      markercolor: "lightgrey",
      showBackgroundGradient: true
    };
  }
}

me.addEventListener("unload", saveSettings);
function saveSettings() {
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}

messaging.peerSocket.onmessage = evt => {
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
      case "showBackgroundGradient":
        settings.showBackgroundGradient = JSON.parse(evt.data.newValue); 
        setBackgroundGradient(settings.showBackgroundGradient, settings.accentcolor);
        break;
    }    
  }
};

function setColours(accentcolour, markercolour) {
  let elements = document.getElementsByClassName("accentcolour");
  elements.forEach(function (element) {
  element.style.fill = accentcolour;
  });
  backgroundGradient.gradient.colors.c1 = accentcolour;

  elements = document.getElementsByClassName("markercolour");
  elements.forEach(function (element) {
  element.style.fill = markercolour;
  });
}

function setBackgroundGradient(showBackgroundGradient, accentColour) {
  backgroundGradient.gradient.colors.c1 = (showBackgroundGradient ? accentColour : "black");
}

function refresh(calsField, stepsField) {
  let currentDataProg = (today.adjusted.calories || 0);
  let currentDataGoal = goals.calories;
  let currentDataArc = (currentDataProg / currentDataGoal) * 100;
  
  if (currentDataArc > 100) {
    currentDataArc = 100;
  }
  
  calsMeter.sweepAngle = -2.7 * currentDataArc;
  calshand.groupTransform.rotate.angle = 270-(2.7*currentDataArc);
  
  currentDataProg = (today.adjusted.steps || 0);
  currentDataGoal = goals.steps;
  currentDataArc = (currentDataProg / currentDataGoal) * 100;
  
  if (currentDataArc > 100) {
    currentDataArc = 100;
  }
  
  stepsMeter.sweepAngle = -2.7 * currentDataArc;
  stepshand.groupTransform.rotate.angle = 270-(2.7*currentDataArc);

}

let hrm = new HeartRateSensor();
hrm.onreading = () => {
  hrField.text = hrm.heartRate;
};

let body = new BodyPresenceSensor();
body.onreading = () => {
  if (!body.present) {
    hrm.stop();
    hrField.text = "--";
  } else {
    hrm.start();
  }
};
body.start();


clock.granularity = "seconds";
// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let Hours = evt.date.getHours();
  
  hourhand.groupTransform.rotate.angle = (30 * (evt.date.getHours() % 12)) + (0.5 * evt.date.getMinutes());
  minutehand.groupTransform.rotate.angle = (6 * evt.date.getMinutes()) + (0.1 * evt.date.getSeconds());
  secondhand.groupTransform.rotate.angle = (6 * evt.date.getSeconds());  

  if (units.clockDisplay === "12h") {
    // 12h format
    Hours = Hours % 12 || 12;
  } else {
    // 24h format
    Hours = util.zeroPad(Hours);
  }
  let Mins = util.zeroPad(evt.date.getMinutes());
  let date = util.zeroPad(evt.date.getDate());
  
  myLabel.text = `${Hours}:${Mins}`;
  DateField.text = date;
  dayField.text = days[evt.date.getDay()]
  batteryPercent.text = `${battery.chargeLevel}%`
  batteryMeter.sweepAngle = -2.7 * battery.chargeLevel;
  batteryhand.groupTransform.rotate.angle = 270-(2.7*battery.chargeLevel);
  stepsField.text = today.adjusted.steps;
  calsField.text = today.adjusted.calories;
 
}

refresh(calsMeter, stepsMeter);
setColours(settings.accentcolor, settings.markercolor);
setBackgroundGradient(settings.showBackgroundGradient, settings.accentcolor);