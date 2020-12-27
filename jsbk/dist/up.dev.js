"use strict";

var wordFinal = ""; // final text with names and url
//var result = [];

var inputElement = document.getElementById("uploader");
var output = document.getElementById('output');
var btn = document.getElementById("bt");
var load = document.getElementById("loading");
inputElement.addEventListener("change", handleFiles, false);

function handleFiles() {
  var fileList = this.files;
  var file = fileList[0];
  btn.style.display = "none";
  load.innerHTML = "Loading";
  /*
  if(file.type.match('image.*')){ // if it's a image type, not in use
        const reader = new FileReader();        
      reader.addEventListener('load', event => {
          output.src = event.target.result;
      });
        reader.readAsDataURL(file);
      return;
  }
  */

  if (file.type.match('text.html')) {
    // if it's a text type with html
    var word = "";
    var reader = new FileReader();
    reader.addEventListener('load', function (event) {
      word = reader.result;
    });
    reader.readAsText(file);
    setTimeout(function () {
      load.innerHTML += "..";
    }, 1500); // loading animation

    setTimeout(function () {
      fineWeb(word);
    }, 3000); //avoid race condition

    return;
  }

  if (!file.type.match('text.html')) {
    load.innerHTML = "Wrong type!";
    return;
  }

  return;
}

function fineWeb(word) {
  // get url and name from a array 
  var reg = new RegExp("\\(?\\b(http://|www[.]|https://)[-A-Za-z0-9+&@#/%?=~_()|!:,.;]*[-A-Za-z0-9+&@#/%=~_()|]");
  var arr = word.split("\n"); // splited array with "\n"

  arr.forEach(function (t) {
    if (reg.test(t)) {
      wordFinal += findname(t) + "\n" + findURL(t, t.search(reg)) + "\n"; // name,\n,url,\n
    }
  });
  load.innerHTML = ""; //

  btn.style.display = "block"; //show button 
}

function findname(str) {
  // Find names on bookmark
  //search from end to start
  var start = 0;
  var end = str.length - 4; // a data must end with </A>, hence -4

  var k = end;

  while (k-- > 0) {
    if (str.charAt(k) == '>' && str.charAt(k - 1) == '"') {
      // a data will be satrt with ">
      start = k + 1;
      break;
    }
  }

  return str.substring(start, end - 1);
}

function findURL(str, start) {
  // find related url
  var end = start;

  while (end++ < str.length) {
    if (str.charAt(end) == '"' && str.charAt(end + 1) == ' ') {
      // a data must end with (" ) 
      break;
    }
  }

  return str.substring(start, end);
}

window.down = function down() {
  //button active  
  var d = new Date();
  var text = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-" + d.getHours() + "-" + d.getMinutes() + " Bookmark";
  download(text, wordFinal);
};

function download(filename, text) {
  //download txt file function
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}