// Video of the random list

    //new method
    var request = new XMLHttpRequest();
   request.open('GET', 'data.txt', false);
   request.send();
   
   var textData = request.responseText;

   var videoList = textData.split("\n"); //Array of the video list
   var playedVideo = [];

    var count = 0;

    //random to to a video
    function goRandom(){
        let num = Math.floor(Math.random() * videoList.length);
        //console.log(num);
        window.open(videoList[num], '_blank');
        playedVideo.push(videoList[num]);
        count ++;

        console.log(playedVideo);

        document.getElementById("pvv").innerHTML = "Played Video : (" + count + ")";
        document.getElementById("lin").innerHTML += count + ": " + videoList[num] + "<br />";
        

    }

    //Output total video data
    function total(){
        document.getElementById("tt").innerHTML = "Video DB last update(22/09/20) <br> Total Video currently = " + videoList.length;  
    }
    

   //console.log(videoList);




    


  