"use strict";

// Video of the random list
var request = new XMLHttpRequest();
request.open('GET', 'data.txt', false);
request.send();
var videoList = request.responseText.split("\n"); //Array list of the video list

var playedVideo = []; //Played video list

var time = request.getResponseHeader("Last-Modified").slice(4, 25); //random to to a video

function goRandom() {
  var num = Math.floor(Math.random() * videoList.length); //rand num of the array

  window.open(videoList[num], '_blank'); //Play video in a new windows

  playedVideo.push(videoList[num]);
  console.log(playedVideo);
  var vName = videoList[num];
  document.getElementById("pvv").innerHTML = "Played Video : (" + playedVideo.length + ")";
  document.getElementById("lin").innerHTML += playedVideo.length + ": " + vName.link(videoList[num]) + "<br />";
}

window.onload = function total() {
  document.getElementById("tt").innerHTML = "Video DB last update: " + time + "<br> Total Video = " + videoList.length;
};

document.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    goRandom();
  }
});