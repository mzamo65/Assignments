import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { units } from "user-settings";
import { me } from "appbit";
import * as messaging from "messaging";
import * as fs from "fs";

// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
let min1 = document.getElementById("min1");
let min2 = document.getElementById("min2");
let hr1 = document.getElementById("hr1");
let hr2 = document.getElementById("hr2");
let min1d = document.getElementById("min1-digital");
let min2d = document.getElementById("min2-digital");
let hr1d = document.getElementById("hr1-digital");
let hr2d = document.getElementById("hr2-digital");
let backgroundGradientx = document.getElementById("backgroundGradientx");

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";


let settings = loadSettings();
function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  }
  catch (ex) {
    return {
      font: "Fabrikat-Black",
      accentcolor: "dodgerblue",
      markercolor: "lightgrey",
      showBackgroundGradient: true,
      showBackgroundGrid: true
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
      case "font":
        settings.font = JSON.parse(evt.data.newValue); 
        setFont(settings.font);
        break;
      case "accentcolor":
        settings.accentcolor = JSON.parse(evt.data.newValue); 
        setColours(settings.accentcolor, settings.markercolor, settings.showBackgroundGradient);
        break;
      case "markercolor":
        settings.markercolor = JSON.parse(evt.data.newValue); 
        setColours(settings.accentcolor, settings.markercolor, settings.showBackgroundGradient);
        break;
      case "showBackgroundGradient":
        settings.showBackgroundGradient = JSON.parse(evt.data.newValue); 
        setBackgroundGradient(settings.showBackgroundGradient, settings.accentcolor);
        break;
      case "showBackgroundGrid":
        settings.showBackgroundGrid = JSON.parse(evt.data.newValue); 
        setBackgroundGrid(settings.showBackgroundGrid, settings.accentcolor);
        break;
    }    
  }
};

// Sets the colours for the watch
function setColours(accentcolour, markercolour, showBackgroundGradient) {
  let elements = document.getElementsByClassName("accentcolour");
  elements.forEach(function (element) {
    if(settings.showBackgroundGrid && element.style) element.style.fill = accentcolour;
    if(element.gradient && showBackgroundGradient) element.gradient.colors.c1 = accentcolour;  
  });

  let elements = document.getElementsByClassName("markercolour");
  elements.forEach(function (element) {
    if(element.gradient) element.gradient.colors.c1 = markercolour;
    else element.style.fill = markercolour;
  });
}

// Colour the background gradient
function setBackgroundGradient(showBackgroundGradient, accentColour) {
  backgroundGradientx.gradient.colors.c1 = (showBackgroundGradient ? accentColour : "black");
}

// Makes the background grid visible/invisible
function setBackgroundGrid(showBackgroundGrid, accentColour) {
  let elements = document.getElementsByClassName("bg1");
  elements.forEach(function (element) {
    element.style.fill = (showBackgroundGrid ? accentColour : "black");
  });
  
  let elements = document.getElementsByClassName("bg2");
  elements.forEach(function (element) {
    element.style.fill = (showBackgroundGrid ? accentColour : "black");
  });
  
}

// Sets the font for the time
function setFont(font){
  if (typeof(font) === "object")  font = font.values[0].value;
  
  // If digital font is selected make its background visible or invisible otherwise
  let elements2 = document.getElementsByClassName("bg");
     elements2.forEach(function (element2) {
       if(font === "digital") element2.style.opacity = 0.1;
       else element2.style.opacity = 0;
  });
  
  //make the digital font visible if selected and invisible otherwise
  let elements = document.getElementsByClassName("time");
  elements.forEach(function (element) {
   if(font === "digital"){
     element.style.opacity = 1;
   }
   else{
     element.style.opacity = 0;
   }
  });
  
  // make non-digital fonts visible if selected and invisible otherwise
  let elements = document.getElementsByClassName("num");
  elements.forEach(function (element) {
    if(font === "digital"){
      element.style.opacity = 0;
    }
    else{
      element.style.opacity = 1;
      element.style.fontFamily = font;
    }
  });
}

//sets time for non-digital fonts
function setHours(val) {
  if (val > 9) {
    drawDigit(Math.floor(val / 10), hr1);
  } else {
    drawDigit("0", hr1);
  }
  drawDigit(Math.floor(val % 10), hr2);
}

//sets the minutes for digital fonts
function setMinsd(val) {
  drawDigital(Math.floor(val / 10), min1d);
  drawDigital(Math.floor(val % 10), min2d);
}

//sets time for digital font
function setHoursd(val) {
  if (val > 9) {
    drawDigital(Math.floor(val / 10), hr1d);
  } else {
    drawDigital("0", hr1d);
  }
  drawDigital(Math.floor(val % 10), hr2d);
}

// Sets the minutes for non-digital fonts
function setMins(val) {
  drawDigit(Math.floor(val / 10), min1);
  drawDigit(Math.floor(val % 10), min2);
}

//for Digital fonts, changes images for hours and minutes according to what the time is
function drawDigital(val, place) {
  place.href = `./resources/digital/${val}.png`; 
}
// For non-digital fonts
function drawDigit(val, place) {
  place.text = val;
}

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  if (typeof(settings.font) === "object") let font = settings.font.values[0].value;
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  
  // Checks if font is digital or not
  if(font!== "digital"){
    setHours(hours);
    let Mins = ("0" + evt.date.getMinutes()).slice(-2);
    setMins(Mins);
  }
  
  else{
    setHoursd(hours);
    let Mins = ("0" + evt.date.getMinutes()).slice(-2);
    setMinsd(Mins);
  }
}

//run settings elements
setFont(settings.font);
setBackgroundGrid(settings.showBackgroundGrid, settings.accentcolor);
setColours(settings.accentcolor, settings.markercolor, settings.showBackgroundGradient);
setBackgroundGradient(settings.showBackgroundGradient, settings.accentcolor);