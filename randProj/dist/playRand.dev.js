"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Video of the random list
var WebLink = // class method to implementing
function WebLink(name, url) {
  _classCallCheck(this, WebLink);

  this.webName = name;
  this.webUrl = url;
};

var request = new XMLHttpRequest();
request.open('GET', 'songWebText.txt', false);
request.send();
var videoList = request.responseText.split("\n"); //Array list of the video list

var classList = [];

for (var i = 0; i < videoList.length; i += 2) {
  var temp = new WebLink(videoList[i], videoList[i + 1]);
  classList.push(temp);
}

videoList = [];
var playedVideo = []; //Played video list

var toppic = document.getElementById("pvv");
var below = document.getElementById("lin");
var data = document.getElementById("tt");

function goRandom() {
  var num = Math.floor(Math.random() * classList.length); //rand num of the array        

  var vName = classList[num].webName;
  var video = classList[num].webUrl;
  window.open(video, '_blank'); //Play video in a new windows

  playedVideo.push(video);
  console.log(video);
  toppic.innerHTML = "Played Video : (" + playedVideo.length + ")";
  below.innerHTML += vName.link(video) + "<br/>";
}

function total() {
  data.innerHTML = "last update(29/11/20) <br> Total Video currently = " + parseInt(classList.length, 10);
}

document.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    goRandom();
  }
});