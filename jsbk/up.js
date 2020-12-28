var wordFinal = ""; // final text with names and url
var result = [];

class WebLink{

    constructor(name, url) {  
        this.webName = name;
        this.webUrl = url;
    }

}

const inputElement = document.getElementById("uploader");
const output = document.getElementById('output');
const btn = document.getElementById("bt");
const btj = document.getElementById("btj");
const rn = document.getElementById("rn");
const load = document.getElementById("loading");

inputElement.addEventListener("change", handleFiles, false);

function handleFiles() {
 
    const fileList = this.files;
    const file = fileList[0];

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

    if(file.type.match('text.html')){ // if it's a text type with html
        let word = "";    

        const reader = new FileReader();           
        reader.addEventListener('load', event => {
            word = reader.result;

        });
      
        reader.readAsText(file);
        
        setTimeout(() => { load.innerHTML += ".."; }, 1500); // loading animation
        setTimeout(() => { fineWeb(word); }, 3000); //avoid race condition

        return;
    }

    if(!file.type.match('text.html')){
        load.innerHTML = "Wrong type!";
        return;

    }

    return; 
       
}

function fineWeb(word){ // get url and name from a array 

    let reg = new RegExp("\\(?\\b(http://|www[.]|https://)[-A-Za-z0-9+&@#/%?=~_()|!:,.;]*[-A-Za-z0-9+&@#/%=~_()|]");

    let arr = word.split("\n"); // splited array with "\n"
    arr.forEach(function(t){       
        if(reg.test(t)){ 

            let n = findname(t);
            let r = findURL(t, t.search(reg));             
            wordFinal += n + "\n" + r + "\n"; // name,\n,url,\n

            let temp = new WebLink(n,r);
            result.push(temp);
        }
    });

    load.innerHTML = ""; //clear 
    btn.style.display = btj.style.display = rn.style.display = "block"; //show button

}

function findname(str){ // Find names on bookmark
    //search from end to start
    let start = 0;
    let end = str.length - 4; // a data must end with </A>, hence -4
    let k = end;

    while(k -- > 0){
        if(str.charAt(k) == '>' && str.charAt(k-1) == '"'){ // a data will be satrt with ">
            start = k + 1;
            break;
        }
        
    }

    return str.substring(start,end-1);
}

function findURL(str, start){ // find related url
    let end = start;

    while (end ++ < str.length){
        if(str.charAt(end) == '"' && str.charAt(end + 1) == ' '){ // a data must end with (" ) 
            break;
        }      
    }

    return str.substring(start,end);

}

window.down = function down(type) { //button active  
    let d = new Date();
    let text = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "-" + d.getHours() + "-" + d.getMinutes() + "_Bookmark" ;

    if(type === 1){ //1 = txt
        download(text + "_txt", "txt");
    }
    else if(type === 2){ // 2 = json
        download(text + "_json", "json");
    }

}


function download(filename, type) { //download txt file function
    var element = document.createElement('a');

    if(type === "txt"){
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(wordFinal));
    }
    else if(type === "json"){
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(result)));
    }
    
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}


window.ran = function ran(){
    let num = Math.floor(Math.random() * result.length);
    console.log(result[num].webName + "\n" + result[num].webUrl);
    window.open(result[num].webUrl, '_blank');
}
