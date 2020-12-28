// Video of the random list

class WebLink{ // class method to implementing
     
     constructor(name, url){  
         this.webName = name;
         this.webUrl = url;
     }
 
 
}


var request = new XMLHttpRequest();
request.open('GET', 'songWebText.txt', false);
request.send();
   
let videoList = request.responseText.split("\n"); //Array list of the video list
let classList = [];

for(let i = 0; i < videoList.length ; i += 2){
     let temp = new WebLink (videoList[i], videoList[i+1]);
     classList.push(temp);
}

videoList = [];

var playedVideo = [];//Played video list
var count = 0;//Played counter

const toppic = document.getElementById("pvv");
const below = document.getElementById("lin"); 
 

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
     document.getElementById("tt").innerHTML = "last update(29/11/20) <br> Total Video currently = " + parseInt(classList.length, 10);  
}

document.addEventListener("keyup", function(event) {
     if (event.keyCode === 13) {
        goRandom();
     }
});



 
    
 
 
 
 
     
 
 
   