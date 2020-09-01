import document from "document";
import { locale } from "user-settings";

// Get a handle on the <text> element.


export let Localise = function(todayDate) {
  let self = this;
  
  let dateField = document.getElementById("dateField");
  
  const dayLabels = {
    'en-us': ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat' ],
    'fr-fr': ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam' ], 
    'de-de': ['Son','Mon','Mit','Don','Fre','Sam'],
    'it-it': ['dom','lun','mar','mer','gio','ven','sab'],
    'es-es': ['dom','lun','mar','mié','jue','vie','sáb'],
    'nl-nl': ['Zon', 'Maa','Din','Woe','Don','Vri','Zat'],
    'sv-se': ['sön','mån','tis','ons','tor','fre','lör']
    
  };
  
  const monthLabels =  {
    'en-us': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
    'fr-fr': ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec' ],
    'de-de': ['Jan', 'Feb', 'Marz', 'Apr', 'Mai', 'Jun', "Jul", 'Aug','Sep' ,'Okt', 'Nov', 'Dez'],
    'it-it': ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ag', 'Set', 'Ott','Nov', 'Dic'],
    'es-es': ['ene', 'feb', 'far', 'abr', 'may', 'jun','jul','ago','set','oct', 'nov', 'dic'],
    'nl-nl': ['Jan', 'Feb', 'Mar', 'Apr', 'Apr', 'Mei','Jun','Jul','Aug','Aug','Sep','Oct','Nov','Dec'],
    'sv-se': ['jan', 'jeb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec' ]
  };
  
  
  dateField.text = `${dayLabels[locale.language][todayDate.getDay()]} ${todayDate.getDate()} ${monthLabels[locale.language][todayDate.getMonth()]}`;  
}