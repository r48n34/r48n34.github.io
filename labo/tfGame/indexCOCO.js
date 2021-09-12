let model;

// webCam
const video = document.querySelector('video');

// webCam display
const canvas = document.getElementById('output');
const ctx = canvas.getContext('2d');

// debugMessage
const debugMessage = document.getElementById("debugMessage")
console.log("Width:", window.innerWidth)
console.log("Height:", window.innerHeight)


// video setup


//const cameraMessage = document.getElementById("cameraMessage");
//const videoSource = document.getElementById("videoSource");

var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

async function getMedia() {
    let stream = null;

    var constraints = window.constraints = {
        audio: false,
        video: {
            facingMode: "environment" 
        }
    };

    //let res = await navigator.mediaDevices.enumerateDevices();
  
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log(stream)

      window.stream = stream
      video.srcObject = stream

    } catch(err) {

    }
}

getMedia();

// creata load model and active cameras
async function loadModel(){
    //SINGLEPOSE_LIGHTNING = faster , SINGLEPOSE_THUNDER = acc up
    

    model = await cocoSsd.load();

    // Set up canvas w and h
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Set fps for canvas draw
    //const targetFps = 28;
    //const timeInvert = Math.floor(1000 / targetFps);

    // draw each timeInvert  seconds
    //setInterval(predictModel, timeInvert);
    predictModel();

    const capBtn = document.getElementById("capBtn");

    capBtn.addEventListener("click", async()=>{

        let imgURL = canvas.toDataURL("image/png");

        let dlLink = document.createElement('a');
        dlLink.download = "fileName";
        dlLink.href = imgURL;
        dlLink.dataset.downloadurl = ["image/png", dlLink.download, dlLink.href].join(':');

        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);
        
    })

}

async function predictModel(){
    
    stats.begin();
    
    // img , maxNumBoxes, minScore
    const result = await model.detect(video, 10, 0.45);
        
    ctx.drawImage(video, 0, 0);
    ctx.font = '40px Arial';
    ctx.lineWidth = 5;
    ctx.strokeStyle = "blue";
    ctx.fillStyle = "blue";

    for (let i = 0; i < result.length; i++) {
        ctx.beginPath();
        //three dots mean spread over object get all its properties
        ctx.rect(...result[i].bbox);     
        ctx.stroke();
        ctx.fillText(
            result[i].score.toFixed(3) + ' ' + result[i].class,
            result[i].bbox[0],
            result[i].bbox[1] - 5
        );
    }

    stats.end();
    window.requestAnimationFrame(predictModel);        
}

video.addEventListener('loadeddata', async (event) => {
    console.log('Yay!');
    loadModel();
});

