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

const toppic = document.getElementById("pvv");
const below = document.getElementById("lin");
const data =  document.getElementById("tt"); 
 

function goRandom(){
        
     let num = Math.floor(Math.random() * classList.length); //rand num of the array        
                
     let vName = classList[num].webName;
     let video = classList[num].webUrl;
                    
     window.open(video, '_blank'); //Play video in a new windows
     playedVideo.push(video);
 
     console.log(video);       
 
     toppic.innerHTML = "Played Video : (" + playedVideo.length + ")";
     below.innerHTML += vName.link(video) + "<br/>";
          
}
 
function total(){
     data.innerHTML = "last update(29/11/20) <br> Total Video currently = " + parseInt(classList.length, 10);  
}

document.addEventListener("keyup", function(event) {
     if (event.keyCode === 13) {
        goRandom();
     }
});

  