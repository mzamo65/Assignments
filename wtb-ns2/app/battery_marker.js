import { battery } from "power";

//Battery fill
export let BatteryMarker = function(document) {  
  let self = this;
  let batFillEl = document.getElementById("bat-fill");
  let batFillWidth = 14;
    
  let level = battery.chargeLevel;
  batFillEl.width = Math.floor(batFillWidth * level / 100.)+3;
}