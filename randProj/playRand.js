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

//classList = request.responseText; // if file is a JSON type

videoList = new Array();

let playedVideo = [];//Played video list

const time = request.getResponseHeader("Last-Modified").slice(4,25); //last mod time of txt
const toppic = document.getElementById("pvv");
const below = document.getElementById("lin");
const data =  document.getElementById("tt");

const linDetail = document.getElementById("linDetail");

function youTubeGetID(url){
     url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
     return undefined !== url[2]?url[2].split(/[^0-9a-z_\-]/i)[0]:url[0];
}

function goRandom(){
     
     let num = Math.floor(Math.random() * classList.length);
     let code = youTubeGetID(classList[num].webUrl);
     validVideoId(code,classList[num]);
    
          
}

function validVideoId(id,li) {    
     var img = new Image();
     img.src = "http://img.youtube.com/vi/" + id + "/mqdefault.jpg";
     img.onload = function () {
          this.width === 120 ? (below.innerHTML += li.webName.link(li.webUrl) + "[May invalid]" + "<br/>") : openVdo(li);                              
     }

}

function openVdo(li){

     let vName = li.webName;
     let video = li.webUrl;

     let code = youTubeGetID(li.webUrl);
     console.log(code);

     var youImg = new Image();
     youImg.src = "https://img.youtube.com/vi/" + code + "/0.jpg";
     console.log(youImg.src);

     window.open(video, '_blank'); //Play video in a new windows
     playedVideo.push(video);
 
     console.log(video);

     const k = `
            <div class="col-3 mt-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${vName.link(video)}</h5>
                        <hr>
                        <img src="${youImg.src}" width="200" height="100">
                    </div>
                </div>
            </div>
     `    
     linDetail.innerHTML += k;
     toppic.innerHTML = "Played Video : (" + playedVideo.length + ")";
     below.innerHTML += vName.link(video) + "<br/>";
     
}
 
window.onload = function total(){
     data.innerHTML = "last update: "+ time + "<br> Total Video = " + parseInt(classList.length, 10);  
}

document.addEventListener("keyup", function(event) {
     if (event.keyCode === 13) {
        goRandom();
     }
});



