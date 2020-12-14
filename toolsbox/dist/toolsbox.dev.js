"use strict";

//Lazy to convert by hand, use js is better.
var stringOne = "";
var stringTwo = "";
var totalValue = 0; //Dec number in total sum

var total = []; // each value saved 

var types = ""; // Current types

var currValues = 0; //current values in DEC

function decToBin(num) {
  // 10 to 2
  return num.toString(2);
}

function decToHex(num) {
  //10 t0 16
  return num.toString(16);
}

function binToDec(num) {
  //2 to 10
  return parseInt(num, 2);
}

function binToHex(num) {
  // 2 to 16
  return parseInt(num, 2).toString(16).toUpperCase();
}

function hexToBin(num) {
  //16 to 2
  return parseInt(num, 16).toString(2).padStart(8, '0');
}

function hexToDec(num) {
  //16 to 10
  return parseInt(num, 16);
}

function justNumbers(str) {
  // Remove words
  var nums = str.replace(/[^0-9]/g, '');
  return parseInt(nums);
}

function printAll(num) {
  //debug function
  console.log(decToBin(num) + " " + decToHex(num) + " " + binToDec(num) + " " + hexToDec(num) + " " + binToHex(num) + " " + hexToBin(num));
}

function saveValue() {
  //save value to below
  var values = document.getElementById("inputOne").value; //let index = document.getElementById("typesOption").selectedIndex;

  totalValue += currValues; //update totalvalue 

  total.push(currValues); //add to array

  console.log(total);
  updateSave();
  var k = "Values(" + types + ") = " + values + "  " + stringOne + "  " + stringTwo; //let j = "Total value = " + totalValue + " Bin = " + decToBin(totalValue) + "  Hex = " +  decToHex(totalValue);

  var option = document.createElement("option"); //new option object

  option.text = k;
  var x = document.getElementById("savedText");
  x.add(option); //add to box
}

function updateSave() {
  // current data types + current value
  // document.getElementById("sv").innerHTML += "Values(" + types +") = "+ values + "  " + stringOne + "  "+ stringTwo + "<br>";
  document.getElementById("totalVal").innerHTML = "Total value = " + totalValue + " Bin = " + decToBin(totalValue) + "  Hex = " + decToHex(totalValue); //console.log(total);
}

function delSelected() {
  var index = document.getElementById("savedText").selectedIndex;
  document.getElementById("savedText").remove(index); //remove the selected index item from box

  total.splice(index, 1); //remove one elements from array

  totalValue = total.reduce(function (a, b) {
    return a + b;
  }, 0); //sum of the array

  updateSave(); //update values
}

function clearAllSv() {
  //clear all values
  document.getElementById("sv").innerHTML = "";
  document.getElementById("totalVal").innerHTML = "";
  totalValue = 0;
  total = [];
  var x = document.getElementById("savedText");
  var k = x.length;

  for (var i = 0; i < k; i++) {
    //clear all options from box
    x.remove(0);
  }
}

function updateMe() {
  //change when ever data typed
  var values = document.getElementById("inputOne").value; //get values from "inputOne", assume the input is correct

  var index = document.getElementById("typesOption").selectedIndex; // 0 = dec, 1 = Bin, 2 = Hex

  if (index == 0) {
    // Is a dec
    values = justNumbers(values);
    console.log(decToBin(values) + " " + decToHex(values));
    stringOne = "Bin = " + decToBin(values);
    stringTwo = "Hex = " + decToHex(values);
    document.getElementById("text1").innerHTML = stringOne;
    document.getElementById("text2").innerHTML = stringTwo;
    types = "Dec";
    currValues = parseInt(values, 10);
  } else if (index == 1) {
    //Is a bin        
    console.log(binToDec(values) + " " + binToHex(values));
    stringOne = "Dec = " + binToDec(values);
    stringTwo = "Hex = " + binToHex(values);
    document.getElementById("text1").innerHTML = stringOne;
    document.getElementById("text2").innerHTML = stringTwo;
    types = "Bin";
    currValues = binToDec(values);
  } else {
    //Is a hex
    console.log(hexToBin(values) + " " + hexToDec(values));
    stringOne = "Bin = " + hexToBin(values);
    stringTwo = "Dec = " + hexToDec(values);
    document.getElementById("text1").innerHTML = stringOne;
    document.getElementById("text2").innerHTML = stringTwo;
    types = "Hex";
    currValues = hexToDec(values);
  }

  document.getElementById("text0").innerHTML = "Input value = " + values; //printAll(values);

  console.log(index);
}

document.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    saveValue();
  }
}); //console.log(decToBin(43) + " " + decToHex(69) + " " + binToDec(1010100110) + " " + hexToDec("FF") +" " + binToHex(1101011) +" " + hexToBin("F0"));