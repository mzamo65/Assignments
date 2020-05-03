import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import { me } from "appbit";
import { BodyPresenceSensor } from "body-presence";
import * as messaging from "messaging";
import * as util from "../common/utils";
import * as fs from "fs";


const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

// Update the clock every minute

let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");
const dayandDateField = document.getElementById("dayandDateField");
let hrField = document.getElementById("hrField");

const hourhand = document.getElementById("hourhand");
const minutehand = document.getElementById("minutehand");
const secondhand = document.getElementById("secondhand");


// Rotate the hands every tick


// Update the clock every tick event


let settings = loadSettings();
function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  }
  catch (ex) {
    return {
      clockDisplay: "12h"
    };
  }
}

me.addEventListener("unload", saveSettings);
function saveSettings() {
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
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
  let today = evt.date;
  let Hours = today.getHours();
  
  hourhand.groupTransform.rotate.angle = (30 * (evt.date.getHours() % 12)) + (0.5 * evt.date.getMinutes());
  minutehand.groupTransform.rotate.angle = (6 * evt.date.getMinutes()) + (0.1 * evt.date.getSeconds());
  secondhand.groupTransform.rotate.angle = (6 * evt.date.getSeconds());  

  if (settings.clockDisplay === "12h") {
    // 12h format
    Hours = Hours % 12 || 12;
  } else {
    // 24h format
    Hours = util.zeroPad(Hours);
  }
  let Mins = util.zeroPad(today.getMinutes());
  let date = util.zeroPad(today.getDate());
  myLabel.text = `${Hours}:${Mins}`;
  dayandDateField.text = `${days[evt.date.getDay()]} ${date}`;
}
