import * as messaging from "messaging";
import { settingsStorage } from "settings";
import { geolocation } from "geolocation";


var API_KEY = "4a65bb9acdcbbf9072e8c6d06666a5c1";


messaging.peerSocket.onopen = () => {
  restoreSettings();
};

messaging.peerSocket.onclose = () => {
  console.log("Companion Socket Closed");
};

settingsStorage.onchange = evt => {
  let data = {
    key: evt.key,
    newValue: evt.newValue
  };
  sendVal(data);
};

function queryOpenWeather() {
  geolocation.getCurrentPosition(locationSuccess, locationError);
  function locationSuccess(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var linkApi = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon="  + long + "&units=metric" + "&APPID=" + API_KEY;
    
  fetch(linkApi)
  .then(function (response) {
      response.json()
      .then(function(data) {
        // We just want some data
        
        var weather = {
          temperature: data["main"]["temp"], main: data["weather"][0]["main"], description: data["weather"][0]["description"]      
        }
        // Send the weather data to the device
        returnWeatherData(weather);
      });
  })
  .catch(function (err) {
    console.log("Error fetching weather: " + err);
  });
 };
 function locationError(error) {
  console.log("Error: " + error.code,
              "Message: " + error.message);
}
}

// Send the weather data to the device
function returnWeatherData(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send a command to the device
    messaging.peerSocket.send(data);
  } else {
    console.log("Error: Connection is not open");
  }
}

// Restore any previously saved settings and send to the device
function restoreSettings() {
  for (let index = 0; index < settingsStorage.length; index++) {   
    let key = settingsStorage.key(index);
    if (key) {
      let data = {
        key: key,
        value: settingsStorage.getItem(key)
      };
      sendVal(data);
    }
  }
}

// Listen for messages from the device
messaging.peerSocket.onmessage = function(evt) {
  if (evt.data && evt.data.command == "weather") {
    // The device requested weather data
    queryOpenWeather();
  }
}

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  console.log("Connection error: " + err.code + " - " + err.message);
}

// Send data to device using Messaging API
function sendVal(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}