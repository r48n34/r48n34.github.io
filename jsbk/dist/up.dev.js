"use strict";

var arr = []; // splited array with "\n"

var words = ""; //whole text
//var result = [];

var wordFinal = ""; // final text with names and url

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

  if (file.type.match('image.*')) {
    // if it's a image type, not in use
    var reader = new FileReader();
    reader.addEventListener('load', function (event) {
      output.src = event.target.result;
    });
    reader.readAsDataURL(file);
    return;
  }

  if (file.type.match('text.html')) {
    // if it's a text type with html
    var _reader = new FileReader();

    _reader.addEventListener('load', function (event) {
      var k = _reader.result;
      words = k;
    });

    _reader.readAsText(file);

    setTimeout(function () {
      load.innerHTML += "..";
    }, 1500);
    setTimeout(function () {
      toArray();
    }, 3000); //avoid time race

    return;
  }
}

function toArray() {
  // buffer function for next step
  arr = words.split("\n");
  fineWeb(arr);
}

function fineWeb(arr) {
  // get url and name from a array
  var reg = new RegExp("\\(?\\b(http://|www[.]|https://)[-A-Za-z0-9+&@#/%?=~_()|!:,.;]*[-A-Za-z0-9+&@#/%=~_()|]");

  for (var i = 0; i < arr.length; i++) {
    var target = arr[i]; //current line

    if (reg.test(target)) {
      var k = findname(target); // name 
      //console.log(k); 
      //result.push(k);

      wordFinal += k + "\n";
      var z = target.search(reg);
      var j = findURL(target, z); // url
      //console.log(j); 
      //result.push(j);

      wordFinal += j + "\n";
    }
  } //console.log(wordFinal);


  load.innerHTML = "";
  btn.style.display = "block"; //show button
}

function findname(str) {
  // Find names on bookmark
  var start = 0;
  var end = str.length - 4;
  var k = end;

  while (k-- > 0) {
    if (str.charAt(k) == '>' && str.charAt(k - 1) == '"') {
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
      break;
    }
  }

  return str.substring(start, end);
}

window.hihi = function hihi() {
  //button active    
  download("op_Text", wordFinal);
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