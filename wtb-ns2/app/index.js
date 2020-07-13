//Clock imports
import clock from "clock";
import document from "document";
import { me } from "appbit";
import { battery } from "power";
import { today } from 'user-activity';
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { BatteryMarker }  from "./battery_marker";
import * as util from "../common/utils";
import { BodyPresenceSensor } from "body-presence";
import * as messaging from "messaging";
import * as fs from "fs";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

// Update the clock every minute
clock.granularity = "seconds";

// Fields

let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
let months = ["JAN ", "FEB", "MAR", "APR", "MAY", "JUN ", "JUL ", "AUG", "SEP", "OCT", "NOV", "DEC"];

let shadow = document.getElementById("shadow");
let maskg = document.getElementById("maskg");
let separator = document.getElementById("separator");
let hours1 = document.getElementById("hours1");
let hours2 = document.getElementById("hours2");
const dateField = document.getElementById("dateField");
let mins1 = document.getElementById("mins1");
let mins2 = document.getElementById("mins2");
let stepsField2 = document.getElementById("stepsField2");
let calsField2 = document.getElementById("calsField2");
let stepsField1 = document.getElementById("stepsField1");
let calsField1 = document.getElementById("calsField1");
let hrField = document.getElementById("hrField");
let batField = document.getElementById("batField");
let batFill = document.getElementById("bat-fill");
let icon = document.getElementById("icon");
const sensors = [];
let backgroundGradient = document.getElementById("backgroundGradient");


let settings = loadSettings();
function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  }
  catch (ex) {
    return {
      dis: "d1",
      top: "none",
      sep: true,
      accentcolor: "orange",
      markercolor: "deepskyblue"
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
      case "dis":
        settings.dis = JSON.parse(evt.data.newValue); 
        changeDisplay(settings.dis);
        break;
      case "top":
        settings.top = JSON.parse(evt.data.newValue); 
        fieldSelect(settings.top);
        break;
       case "sep":
        settings.sep = JSON.parse(evt.data.newValue); 
        setSeparator(settings.sep);
        break; 
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



function setColours(accentcolour, markercolour, dis) {
  if (typeof(settings.dis) === "object")  let dis = settings.dis.values[0].value;
  
  let elements = document.getElementsByClassName("markercolour");
  elements.forEach(function (element) {
    if(element.gradient) element.gradient.colors.c1 = markercolour;
    else element.style.fill = markercolour;
  });
  
  let elements = document.getElementsByClassName("accentcolour");
  elements.forEach(function (element) {
    if (dis === "d2"){
      hours1.style.fill = accentcolour;
      hours2.style.fill = accentcolour;
      shadow.gradient.opacity.o1 = 1;
    }
    
    else if(dis === "d1"){
      hours1.style.fill = markercolour;
      hours2.style.fill = markercolour;
      maskg.gradient.colors.c1 = markercolour;
      maskg.gradient.colors.c2 = accentcolour;
      shadow.gradient.opacity.o1= 0;
    }
    if(element.gradient && dis === "d2") element.gradient.colors.c1 = markercolour
    else if(element.gradient && dis === "d1") element.gradient.colors.c1 = accentcolour
    else if(element.style && dis === "d1") element.style.fill = accentcolour;
    else if(element.style && dis === "d2") element.style.fill = accentcolour;
    else{
      if(element.gradient) element.gradient.colors.c1 = accentcolour
      if(element.style) element.style.fill = accentcolour;
    }
  });
}

function setSeparator(val, bool) {
  if(bool) separator.style.display = (val % 2 === 0 ? "inline" : "none");
  else separator.style.opacity = 1;
}

function changeDisplay(dis){
  if (typeof(dis) === "object")  dis = dis.values[0].value;
  
  
  let elements = document.getElementsByClassName("d1");
    elements.forEach(function (element) {
      if(dis === "d1") element.style.opacity = 1;
      else element.style.opacity = 0;
  });
  
  let elements = document.getElementsByClassName("d2");
    elements.forEach(function (element) {
      if(dis === "d2") element.style.opacity = 1;
      else element.style.opacity = 0;
  });
  setColours(settings.accentcolor, settings.markercolor);
}

function fieldSelect(element){
  if (typeof(element) === "object")  element = element.values[0].value;
  
  if(element === "none"){
    icon.style.opacity = 0;
    hrField.style.opacity=0;
    batField.style.opacity=0;
    batFill.style.opacity=0;
    let elements = document.getElementsByClassName("hr");
    elements.forEach(function (element) {
      if(element.gradient) element.gradient.opacity.o1 = 1;
      else element.style.opacity = 1;
    });
  }
  
  else if(element === "hr"){
    icon.style.opacity = 1;
    hrField.style.opacity= 1;
    batField.style.opacity=0;
    batFill.style.opacity=0;
    icon.href="stat_hr_open_48px.png";
    let elements = document.getElementsByClassName("hr");
    elements.forEach(function (element) {
      if(element.gradient) element.gradient.opacity.o1 = 0;
      else element.style.opacity = 0;
    });
  }
  
  else if(element === "bat"){
    icon.style.opacity = 1;
    icon.href = "battery_24px.png";
    hrField.style.opacity = 0;
    batField.style.opacity = 1;
    batFill.style.opacity = 1;
    batField.text = `${battery.chargeLevel}%`;
    let elements = document.getElementsByClassName("hr");
    elements.forEach(function (element) {
      if(element.gradient) element.gradient.opacity.o1 = 0;
      else element.style.opacity = 0;
    });
  }
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


function setHours(val) {
  if (val > 9) {
    drawDigit(Math.floor(val / 10), hours1);
  } else {
    drawDigit("0", hours1);
  }
  drawDigit(Math.floor(val % 10), hours2);
}

function setMins(val) {
  drawDigit(Math.floor(val / 10), mins1);
  drawDigit(Math.floor(val % 10), mins2);
}

function drawDigit(val, place) {
  place.href = `./resources/digital/${val}.png`;
}

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  if (typeof(settings.dis) === "object")  let element = settings.dis.values[0].value;
  
  let batteryMarker = new BatteryMarker(document);
  let hours = evt.date.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  setHours(hours);
  let Mins = ("0" + evt.date.getMinutes()).slice(-2);
  setMins(Mins);
  dateField.text = `${days[evt.date.getDay()]} ${evt.date.getDate()} ${months[evt.date.getMonth()]}`;
  

  stepsField1.text = today.adjusted.steps;
  calsField1.text = today.adjusted.calories;

  stepsField2.text = today.adjusted.steps;
  calsField2.text = today.adjusted.calories;
  
  fieldSelect(settings.top);
  setSeparator(evt.date.getSeconds(), settings.sep);
}

setColours(settings.accentcolor, settings.markercolor);
changeDisplay(settings.dis);
fieldSelect(settings.top);