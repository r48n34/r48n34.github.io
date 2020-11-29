// Video of the random list

    //new method
    var request = new XMLHttpRequest();
    request.open('GET', 'songWebText.txt', false);
    request.send();
   
    var videoList = request.responseText.split("\n"); //Array list of the video list
    var playedVideo = [];//Played video list
 
    var count = 0;//Played counter
 
     //random to to a video
    function goRandom(){
        
         let num = Math.floor(Math.random() * videoList.length); //rand num of the array        
         
         //even = video name || odd = vdo link
         //if num = odd, no need to change num, else num need to +1 for get the link         
         var vName = (num & 1) ? videoList[num-1] : videoList[num++];
                     
         window.open(videoList[num], '_blank'); //Play video in a new windows
         playedVideo.push(videoList[num]);
 
         console.log(playedVideo[count++]);       
 
         document.getElementById("pvv").innerHTML = "Played Video : (" + count + ")";
         document.getElementById("lin").innerHTML += vName.link(videoList[num]) + "<br/>";
          
    }
 
    function total(){
         //let total = (videoList.length & 1) ? (videoList.length / 2) - 0.5 : (videoList.length / 2); // odd even method
         //let total = parseInt(videoList.length / 2, 10); // double to int method
         document.getElementById("tt").innerHTML = "last update(29/11/20) <br> Total Video currently = " + parseInt(videoList.length / 2, 10);  
    }

    document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        goRandom();
    }
    });
     
 
    
 
 
 
 
     
 
 
   