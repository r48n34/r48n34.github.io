"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var wordFinal = ""; // final text with names and url

var result = [];

var WebLink = function WebLink(name, url) {
  _classCallCheck(this, WebLink);

  this.webName = name;
  this.webUrl = url;
};

var inputElement = document.getElementById("uploader");
var output = document.getElementById('output');
var btn = document.getElementById("bt");
var btj = document.getElementById("btj");
var rn = document.getElementById("rn");
var load = document.getElementById("loading");
inputElement.addEventListener("change", handleFiles, false);

function handleFiles() {
  var fileList = this.files;
  var file = fileList[0];
  btn.style.display = btj.style.display = rn.style.display = "none";
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
      var n = findname(t);
      var r = findURL(t, t.search(reg));
      wordFinal += n + "\n" + r + "\n"; // name,\n,url,\n

      var temp = new WebLink(n, r);
      result.push(temp);
    }
  });
  load.innerHTML = ""; //clear 

  btn.style.display = btj.style.display = rn.style.display = "block"; //show button
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

window.down = function down(type) {
  //button active  
  var d = new Date();
  var text = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-" + d.getHours() + "-" + d.getMinutes() + "_Bookmark";

  if (type === 1) {
    //1 = txt
    download(text + "_txt", "txt");
  } else if (type === 2) {
    // 2 = json
    download(text + "_json", "json");
  }
};

function download(filename, type) {
  //download txt file function
  var element = document.createElement('a');

  if (type === "txt") {
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(wordFinal));
  } else if (type === "json") {
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(result)));
  }

  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

window.ran = function ran() {
  var num = Math.floor(Math.random() * result.length);
  console.log(result[num].webName + "\n" + result[num].webUrl);
  window.open(result[num].webUrl, '_blank');
};