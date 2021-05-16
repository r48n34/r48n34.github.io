// Video of the random list
let request = new XMLHttpRequest();
request.open('GET', 'data.txt', false);
request.send();

function youTubeGetID(url){
    url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return undefined !== url[2]?url[2].split(/[^0-9a-z_\-]/i)[0]:url[0];
}
        
let videoList = request.responseText.split("\n"); //Array list of the video list
let playedVideo = [];//Played video list

const time = request.getResponseHeader("Last-Modified").slice(4,25);

//random to to a video
async function goRandom(){
    let num = Math.floor(Math.random() * videoList.length); //rand num of the array
        
    window.open(videoList[num], '_blank'); //Play video in a new windows
    playedVideo.push(videoList[num]);
    
    console.log(playedVideo);

    let vName = videoList[num];
    let code = youTubeGetID(videoList[num]);
    let myImg = "https://img.youtube.com/vi/" + code + "/0.jpg";
    let n = await getName(code);

    const k = `
    <div class="col-3 mt-4">
       <div class="card">
            <div class="card-body">              
                <h5 class="card-title">${n.title.link(videoList[num])}</h5>
                <hr>
                <img src="${myImg}" width="230" height="auto">                     
            </div>
       </div>
    </div>
`

    document.getElementById("pvv").innerHTML = "Played Video : (" + playedVideo.length + ")";
    document.getElementById("lin").innerHTML = playedVideo.length + ": " + vName.link(videoList[num]);
    document.getElementById("thum").innerHTML += k;
        
}

function getName(name){
    return new Promise((resolve, reject) => {
        fetch("https://noembed.com/embed?url=https://www.youtube.com/watch?v=" + name )
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log(myJson);
            resolve(myJson);
        });
        
    });
}

window.onload = function total(){
    document.getElementById("tt").innerHTML = "Video DB last update: " + time + "<br> Total Video = " + videoList.length;  
}
    
document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        goRandom();
    }
});
   




    


  