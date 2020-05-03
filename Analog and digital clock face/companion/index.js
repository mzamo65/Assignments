import * as messaging from "messaging";
import { settingsStorage } from "settings";

messaging.peerSocket.onopen = () => {
  restoreSettings();
};

messaging.peerSocket.onclose = () => {
  console.log("Companion Socket Closed");
};

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

// Send data to device using Messaging API
function sendVal(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}