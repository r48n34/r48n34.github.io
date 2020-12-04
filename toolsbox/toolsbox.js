//Lazy to convert by hand, use js is better.

var stringOne = "";
var stringTwo = "";
var totalValue = 0; //Dec number

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

function saveValue(){
    let values = document.getElementById("inputOne").value;
    let index = document.getElementById("typesOption").selectedIndex;



    let types = "";

    if(index == 0){
        types = "Dec";
        totalValue += parseInt(values,10);
    }
    else if(index == 1){
        types = "Bin";
        totalValue += binToDec(values);
    }
    else{
        types = "Hex";
        totalValue += hexToDec(values);
    }
 
    document.getElementById("sv").innerHTML += "Values(" + types +") = "+ values + "  " + stringOne + "  "+ stringTwo + "<br>";
    document.getElementById("totalVal").innerHTML = "Total value = " + totalValue + " Bin = " + decToBin(totalValue) + "  Hex = " +  decToHex(totalValue);
    //console.log(totalValue);

}

function clearAllSv(){
    document.getElementById("sv").innerHTML = "";
    document.getElementById("totalVal").innerHTML = "";
    totalValue = 0;

}



function updateMe(){
    let values = document.getElementById("inputOne").value; //get values from "inputOne", assume the input is correct
  
    let index = document.getElementById("typesOption").selectedIndex; // 0 = dec, 1 = Bin, 2 = Hex


    if(index == 0){ // Is a dec
        values = justNumbers(values);
        console.log(decToBin(values) + " " + decToHex(values));

        stringOne = "Bin = " + decToBin(values);
        stringTwo = "Hex = " + decToHex(values);

        document.getElementById("text1").innerHTML = stringOne;
        document.getElementById("text2").innerHTML = stringTwo;
    }
    else if(index == 1){ //Is a bin        
        console.log(binToDec(values) + " " + binToHex(values));

        stringOne = "Dec = " + binToDec(values);
        stringTwo = "Hex = " + binToHex(values);

        document.getElementById("text1").innerHTML = stringOne;
        document.getElementById("text2").innerHTML = stringTwo;

        

    }
    else{ //Is a hex
        console.log(hexToBin(values) + " " + hexToDec(values));

        stringOne = "Bin = " + hexToBin(values);
        stringTwo = "Dec = " + hexToDec(values);

        document.getElementById("text1").innerHTML = stringOne;
        document.getElementById("text2").innerHTML = stringTwo;

    }

    document.getElementById("text0").innerHTML = "Input value = " + values;

    //printAll(values);
    console.log(index);
}

//console.log(decToBin(43) + " " + decToHex(69) + " " + binToDec(1010100110) + " " + hexToDec("FF") +" " + binToHex(1101011) +" " + hexToBin("F0"));