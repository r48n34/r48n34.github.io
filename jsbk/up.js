var arr = [];// splited array with "\n"
var words = ""; //whole text

//var result = [];
var wordFinal = ""; // final text with names and url

const inputElement = document.getElementById("uploader");
const output = document.getElementById('output');
const btn = document.getElementById("bt");
const load = document.getElementById("loading");


inputElement.addEventListener("change", handleFiles, false);

function handleFiles() {
 
    const fileList = this.files;
    const file = fileList[0];

    btn.style.display = "none";
    load.innerHTML = "Loading";


    if(file.type.match('image.*')){ // if it's a image type, not in use

        const reader = new FileReader();        
        reader.addEventListener('load', event => {
            output.src = event.target.result;
        });

        reader.readAsDataURL(file);
        return;
    }

    if(file.type.match('text.html')){ // if it's a text type with html
        
        const reader = new FileReader();           
        reader.addEventListener('load', event => {
            let k = reader.result;
            words = k;

        });

        
        reader.readAsText(file);
        
        setTimeout(() => { load.innerHTML += ".."; }, 1500);

        setTimeout(() => { toArray(); }, 3000); //avoid time race
        return;
    }
   
       
}


function toArray(){ // buffer function for next step
    arr = words.split("\n");
    fineWeb(arr);

}


function fineWeb(arr){ // get url and name from a array
    let reg = new RegExp("\\(?\\b(http://|www[.]|https://)[-A-Za-z0-9+&@#/%?=~_()|!:,.;]*[-A-Za-z0-9+&@#/%=~_()|]");

    for(let i = 0; i< arr.length; i++){
        let target = arr[i]; //current line

        if(reg.test(target)){          
            
            let k = findname(target); // name 
            //console.log(k); 
            //result.push(k);
            wordFinal += k + "\n";

            let z = target.search(reg);

            let j = findURL(target, z); // url
            //console.log(j); 
            //result.push(j);
            wordFinal += j + "\n";
            
        }

    }

    //console.log(wordFinal);
    load.innerHTML = "";
    btn.style.display = "block"; //show button

    

}

function findname(str){ // Find names on bookmark
    let start = 0;
    let end = str.length - 4;
    let k = end;

    while(k -- > 0){
        if(str.charAt(k) == '>' && str.charAt(k-1) == '"'){
            start = k + 1;
            break;
        }
        
    }

    return str.substring(start,end-1);
}

function findURL(str, start){ // find related url
    let end = start;

    while (end ++ < str.length){
        if(str.charAt(end) == '"' && str.charAt(end + 1) == ' '){
            break;
        }      
    }

    return str.substring(start,end);

}


window.hihi = function hihi() { //button active    
    download("op_Text", wordFinal );
}

function download(filename, text) { //download txt file function
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}
