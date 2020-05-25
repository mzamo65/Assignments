import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import * as messaging from "messaging";
import { me } from "appbit";
import * as fs from "fs";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";


// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");
const leftGradient = document.getElementById("leftGradient");
const middleGradient = document.getElementById("middleGradient");
const rightGradient = document.getElementById("rightGradient");

let settings = loadSettings();
function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  }
  catch (ex) {
    return {
      right: "yellow",
      middle: "teal",
      left: "purple"
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
      case "right":
        settings.right = JSON.parse(evt.data.newValue); 
        setColours(settings.left, settings.middle, settings.right);
        break;
      case "middle":
        settings.middle = JSON.parse(evt.data.newValue); 
        setColours(settings.left, settings.middle, settings.right); 
        break;
      case "left":
        settings.left = JSON.parse(evt.data.newValue); 
        setColours(settings.left, settings.middle, settings.right);
        break;
     
    }    
  }
};

function setColours(left, middle, right) {
  leftGradient.gradient.colors.c1 = left;
  middleGradient.gradient.colors.c1 = middle;
  rightGradient.gradient.colors.c1 = right;
}

// Update the clock every minute
clock.granularity = "minutes";

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  myLabel.text = `${hours}:${mins}`;
}

setColours(settings.left, settings.middle, settings.right);