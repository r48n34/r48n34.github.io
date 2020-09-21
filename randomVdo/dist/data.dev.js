"use strict";

// Video of the random list
//new method
var request = new XMLHttpRequest();
request.open('GET', 'data.txt', false);
request.send();
var textData = request.responseText; //original video list

var videoList = textData.split("\n"); //Array list of the video list

var playedVideo = []; //Played video list

var count = 0; //Played counter
//random to to a video

function goRandom() {
  var num = Math.floor(Math.random() * videoList.length); //rand num of the array
  //console.log(num);

  window.open(videoList[num], '_blank'); //Play video in a new windows

  playedVideo.push(videoList[num]);
  count++;
  console.log(playedVideo);
  document.getElementById("pvv").innerHTML = "Played Video : (" + count + ")";
  document.getElementById("lin").innerHTML += count + ": " + videoList[num] + "<br />";
}

var updates = "Video DB last update(22/09/20) <br> Total Video currently = ";

function total() {
  document.getElementById("tt").innerHTML = updates + videoList.length;
}