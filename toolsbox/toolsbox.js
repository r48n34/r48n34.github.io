//Lazy to convert by hand, use js is better.
let stringOne = "";
let stringTwo = "";
let totalValue = 0; //Dec number in total sum
let total = []; // each value saved 

let types = ""; // Current types
let currValues = 0; //current values in DEC

const typesOption = document.getElementById("typesOption"); //data types options
const input = document.getElementById("inputOne");// Input Box

const text0 = document.getElementById("text0"); // Input value (Input Box)
const text1 = document.getElementById("text1"); // Second input value
const text2 = document.getElementById("text2"); // Third input value

const savedText =document.getElementById("savedText"); //select box
const totalVal = document.getElementById("totalVal"); // Tota value op


function decToBin(num){ // 10 to 2
    return num.toString(2);
}

function decToHex(num){ //10 t0 16
    return num.toString(16);
}

function binToDec(num){ //2 to 10
    return parseInt(num, 2);
}

function binToHex(num){ // 2 to 16
    return parseInt(num, 2).toString(16).toUpperCase();
}

function hexToBin(num){ //16 to 2
    return (parseInt(num, 16).toString(2)).padStart(8, '0');
}

function hexToDec(num){ //16 to 10
    return parseInt(num, 16);
}

function justNumbers(str){ // Remove words
    var nums = str.replace(/[^0-9]/g,'');
    return parseInt(nums);
}

function printAll(num){ //debug function
    console.log(decToBin(num) + " " + decToHex(num) + " " + binToDec(num) + " " + hexToDec(num) +" " + binToHex(num) + " " + hexToBin(num));
}

function saveValue(){ //save value to below
    let values = input.value;

    total.push(currValues); //add to array
    totalValue += currValues; //update totalvalue 
    
    console.log(total);
    updateSave();

    let k = "Values (" + types +") = " + values + "  " + stringOne + "  " + stringTwo ;
    let option = document.createElement("option"); //new option object
    option.text = k;

    savedText.add(option); //add to box

    text0.innerHTML = text1.innerHTML = text2.innerHTML = "&nbsp";
    input.value = "";
    
}

function updateSave(){ // current data types + current value
   totalVal.innerHTML = "Total value = " + totalValue + " Bin = " + decToBin(totalValue) + "  Hex = " +  decToHex(totalValue);
       
}

function delSelected(){
    let index = savedText.selectedIndex >= 0 ? savedText.selectedIndex : 0 ; //default delete top item
    
    savedText.remove(index); //remove the selected index item from box

    total.splice(index,1); //remove one elements from array
    totalValue = total.reduce((a, b) => a + b, 0); //sum of the array

    updateSave(); //update values

}

function clearAllSv(){ //clear all values
    totalVal.innerHTML = "";
    
    totalValue = 0;
    total = [];

    const k = savedText.length; //fixed value

    for(let i = 0; i < k ; i++){ //clear all options from box
        savedText.remove(0);
    }

}


function updateMe(){ //change when ever data typed
    let values = input.value; //get values from "inputOne", assume the input is correct
  
    let index = typesOption.selectedIndex; // 0 = dec, 1 = Bin, 2 = Hex


    if(index == 0){ // Is a dec
        values = justNumbers(values);
        console.log(decToBin(values) + " " + decToHex(values));

        stringOne = "Bin = " + decToBin(values);
        stringTwo = "Hex = " + decToHex(values);
        types = "Dec";
        currValues = parseInt(values,10);
    }
    else if(index == 1){ //Is a bin        
        console.log(binToDec(values) + " " + binToHex(values));

        stringOne = "Dec = " + binToDec(values);
        stringTwo = "Hex = " + binToHex(values);
        types = "Bin";
        currValues = binToDec(values);

    }
    else{ //Is a hex
        console.log(hexToBin(values) + " " + hexToDec(values));

        stringOne = "Bin = " + hexToBin(values);
        stringTwo = "Dec = " + hexToDec(values);
        types = "Hex";
        currValues = hexToDec(values);

    }

    text0.innerHTML = "Input value = " + values;
    text1.innerHTML = stringOne;
    text2.innerHTML = stringTwo;
 
    console.log(index);
}

document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        saveValue()
    }
});
