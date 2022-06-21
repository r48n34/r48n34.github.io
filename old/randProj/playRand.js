// Video of the random list
class WebLink{ // class method to implementing
     
     constructor(name, url){  
         this.webName = name;
         this.webUrl = url;
     }
 
}

var request = new XMLHttpRequest();
request.open('GET', 'songWebText.txt', false); // if file is a raw txt with line
request.send();
   
let videoList = request.responseText.split("\n"); //Array list of the video list
let classList = [];

for(let i = 0; i < videoList.length ; i += 2){
     classList.push(new WebLink (videoList[i], videoList[i+1]));
}


videoList = new Array();
let playedVideo = [];//Played video list

const time = request.getResponseHeader("Last-Modified").slice(4,25); //last mod time of txt
const toppic = document.getElementById("pvv"); //Played video text
const below = document.getElementById("lin"); // Played youtube name
const data = document.getElementById("tt"); //last update

const his = document.getElementById("his"); //history div
const hisBtn = document.getElementById("hisBtn"); //history div button
const hisClearBtn = document.getElementById("hisClearBtn"); //history div button

const linDetail = document.getElementById("linDetail"); // div box

let historyArray = []; //local info
let t = JSON.parse(localStorage.getItem('record'));
if(t != null){
     historyArray = [...t];
     genHistory();
}

function youTubeGetID(url){
     url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
     return undefined !== url[2]?url[2].split(/[^0-9a-z_\-]/i)[0]:url[0];
}

function goRandom(){
     
     let num = Math.floor(Math.random() * classList.length);
     let code = youTubeGetID(classList[num].webUrl);
     validVideoId(code, classList[num]);   
          
}

function validVideoId(id,li) {    
     var img = new Image();
     img.src = "http://img.youtube.com/vi/" + id + "/mqdefault.jpg";
     img.onload = function () {
          this.width === 120 ? (below.innerHTML = li.webName.link(li.webUrl) + "[May invalid]" + "<br/>") : openVdo(li);                              
     }

}

function openVdo(li){

     let yourImg = "https://img.youtube.com/vi/" + youTubeGetID(li.webUrl) + "/0.jpg";

     window.open(li.webUrl, '_blank'); //Play video in a new windows
     playedVideo.push(li.webUrl);

     const k = `
            <div class="col-3 mt-4">
               <div class="card">
                    <div class="card-body">              
                        <h5 class="card-title">${li.webName.link(li.webUrl)}</h5>
                        <hr>
                        <img src="${yourImg}" width="230" height="auto">                     
                    </div>
               </div>
            </div>
     `    
     linDetail.innerHTML += k;
     toppic.innerHTML = "Played Video : (" + playedVideo.length + ")";
     below.innerHTML = li.webName.link(li.webUrl);

     historyArray.push(li);
     localStorage.setItem('record', JSON.stringify(historyArray) );

     let temp = `<h2>Name: ${li.webName}</h2> <h2>URL: ${li.webUrl}</h2> </br>`
     his.innerHTML += temp;
     
}
 
window.onload = function total(){
     data.innerHTML = "last update: "+ time + "<br> Total Video = " + parseInt(classList.length, 10);  
}

function genHistory(){

     for(i of Object.keys(historyArray)){
          let temp = `<h2>Name: ${historyArray[i].webName}</h2> <h2>URL: ${historyArray[i].webUrl}</h2> </br>`
          his.innerHTML += temp;
     }

}

hisClearBtn.onclick = function(){
     try{
          localStorage.removeItem('record');
          alert("Clear success. F5 to refresh.");
     }
     catch(e){
          alert("Clear fail.");
     }
}

document.addEventListener("keyup", function(event) {
     if (event.keyCode === 13) {
        goRandom();
     }
});