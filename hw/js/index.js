const bottomText = document.getElementById("bottomText"); // get the bottom h4 text id
const tod = getToday(); // get current date string from utili.js function getToday()

bottomText.innerHTML = 'ITE3006: IT Essentials - Web (Today is: ' + tod + ')'; // insert the text to regarding #bottomText elements