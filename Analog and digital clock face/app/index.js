import clock from "clock";
import document from "document";
import { units } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { display } from "display";
import { aod } from "aod";
import { me } from "appbit";
import { display } from "display";
import { BatteryIndicator }  from "./battery-indicator"
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
let separator = document.getElementById("separator");
let hours1 = document.getElementById("hours1");
let hours2 = document.getElementById("hours2");
let mins1 = document.getElementById("mins1");
let mins2 = document.getElementById("mins2");
const DateField = document.getElementById("DateField");
let dayField = document.getElementById("dayField");
let hrField = document.getElementById("hrField");
let stepsField = document.getElementById("stepsField");
let outercenterdot  = document.getElementById("outercenterdot");
let innercenterdot  = document.getElementById("innercenterdot");
let outercenterdotS = document.getElementById("outercenterdotS");
let innercenterdotS = document.getElementById("innercenterdotS");
let outercenterdotC = document.getElementById("outercenterdotC");
let innercenterdotC = document.getElementById("innercenterdotC");
let heart = document.getElementById("heart");
let backgroundGradient = document.getElementById("backgroundGradient");
let calsField = document.getElementById("calsField");
let calsMeter = document.getElementById("calsMeter");
let stepsMeter = document.getElementById("stepsMeter");
let batteryhand = document.getElementById("batteryhand");
let calshand = document.getElementById("calshand");
let stepshand = document.getElementById("stepshand");
let batteryPercent = document.getElementById("batteryPercent");
let batteryMeter = document.getElementById("batteryMeter");
let count = 0;
const sensors = [];

const hourhand   = document.getElementById("hourhand");
const minutehand = document.getElementById("minutehand");
const secondhand = document.getElementById("secondhand");
if(display.aodEnabled)   display.aodAllowed = true;
clock.granularity = "seconds";

let settings = loadSettings();
function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  }
  catch (ex) {
    return {
      accentcolor: "dodgerblue",
      markercolor: "lightgrey",
      showBackgroundGradient: false
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
  if(display.aodActive) element.style.fill = "white";
  else element.style.fill = accentcolour;
  });
  backgroundGradient.gradient.colors.c1 = accentcolour;

  elements = document.getElementsByClassName("markercolour");
  elements.forEach(function (element) {
  if(display.aodActive) element.style.fill = "white";
  else element.style.fill = markercolour;
  });
  
 
  elements = document.getElementsByClassName("circlecolour");
   elements.forEach(function (element) {
  if(display.aodActive) element.style.fill = "black";
  else element.style.fill = accentcolour;
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

//Set opacity
function setOpacity(opacity) {
  secondhand.style.opacity = opacity;
  outercenterdot.style.opacity = opacity;
  innercenterdot.style.opacity = opacity;
  outercenterdotC.style.opacity = opacity;
  innercenterdotC.style.opacity = opacity;
  outercenterdotS.style.opacity = opacity;
  innercenterdotS.style.opacity = opacity;
  batteryhand.style.opacity = opacity;
  hrField.style.opacity = opacity;
  heart.style.opacity = opacity;
  batteryMeter.style.opacity = opacity;
  stepshand.style.opacity = opacity;
  calshand.style.opacity = opacity;
  calsMeter.style.opacity = opacity;
  stepsMeter.style.opacity = opacity;
  if(display.aodAcive) separator.style.opacity = 0;
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

function setSeparator(val) {
  separator.style.display = (val % 2 === 0 ? "inline" : "none");
}

function setHours(val) {
  if (val > 9) {
    drawDigit(Math.floor(val / 10), hours1);
  } else {
    drawDigit("", hours1);
  }
  drawDigit(Math.floor(val % 10), hours2);
}

function setMins(val) {
  drawDigit(Math.floor(val / 10), mins1);
  drawDigit(Math.floor(val % 10), mins2);
}

function drawDigit(val, place) {
  place.image = `${val}.png`;
}

function updateClock() {
  let evt = new Date();
  if(display.aodActive === false){
    let batteryIndicator = new BatteryIndicator(document, settings.markercolor);
    let Hours = evt.getHours();

    hourhand.groupTransform.rotate.angle = (30 * (evt.getHours() % 12)) + (0.5 * evt.getMinutes());
    minutehand.groupTransform.rotate.angle = (6 * evt.getMinutes()) + (0.1 * evt.getSeconds());
    secondhand.groupTransform.rotate.angle = (6 * evt.getSeconds());
    
    if (units.clockDisplay === "12h") {
      // 12h format
      Hours = Hours % 12 || 12;
    } else {
      // 24h format
      Hours = util.zeroPad(Hours);
    }
    //let Mins = util.zeroPad(evt.getMinutes());
    let date = util.zeroPad(evt.getDate());

    setHours(Hours);

    // MINUTES
    let Mins = ("0" + evt.getMinutes()).slice(-2);
    setMins(Mins);

    // BLINK SEPARATOR
    setSeparator(evt.getSeconds());
    DateField.text = date;
    dayField.text = days[evt.getDay()];

    batteryPercent.text = `${battery.chargeLevel}%`;
    batteryMeter.sweepAngle = -2.7 * battery.chargeLevel;
    batteryhand.groupTransform.rotate.angle = 270-(2.7 * battery.chargeLevel);
    stepsField.text = today.adjusted.steps;
    calsField.text = today.adjusted.calories;
    refresh(calsMeter, stepsMeter);
    setColours(settings.accentcolor, settings.markercolor);
    setBackgroundGradient(settings.showBackgroundGradient, settings.accentcolor);
    setOpacity(1);
    batteryIndicator.draw();
  }

  else{
    if(count === 1){
      let batteryIndicator = new BatteryIndicator(document, "white");
      let Hours = evt.getHours();

      hourhand.groupTransform.rotate.angle = (30 * (evt.getHours() % 12)) + (0.5 * evt.getMinutes());
      minutehand.groupTransform.rotate.angle = (6 * evt.getMinutes()) + (0.1 * evt.getSeconds());

      if (units.clockDisplay === "12h") {
      // 12h format
        Hours = Hours % 12 || 12;
      } else {
        // 24h format
        Hours = util.zeroPad(Hours);
      }
      let date = util.zeroPad(evt.getDate());

      setHours(Hours);

    // MINUTES
    let Mins = ("0" + evt.getMinutes()).slice(-2);
    setMins(Mins);
      DateField.text = date;
      dayField.text = days[evt.getDay()];
      count = 0;
    }
    else{
      count = count+1;
    }
  }
}


clock.ontick = () => updateClock();

display.addEventListener("change", () => {
  // Stop all sensors and turn on AOD mode
  if(display.aodActive && display.aodAllowed) {
    sensors.map(sensor => sensor.stop());
    clock.ontick = () => updateClock();
    setColours(settings.accentcolor, settings.markercolor);
    setBackgroundGradient(settings.showBackgroundGradient === false, settings.accentcolor);
    setOpacity(0);
  }
  
  else{
    // Turn on sensors and wake display
    sensors.map(sensor => sensor.start());
    clock.granularity = "seconds";
    clock.ontick = () => updateClock();
  }
});