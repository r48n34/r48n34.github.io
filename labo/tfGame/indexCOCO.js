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


const cameraMessage = document.getElementById("cameraMessage");
const videoSource = document.getElementById("videoSource");

let globalId;
async function getResult(){
    let res = await navigator.mediaDevices.enumerateDevices();
    console.log(res)

    for(let i of res){
        videoSource.innerHTML += ` <option value="${i.deviceId}">${i.label}</option>`;
    }

    videoSource.addEventListener('change', async ()=>{
        globalId = videoSource.value;
        console.log(globalId);
        getMedia();
    })

}

getResult();


getMedia();
async function getMedia() {
    let stream = null;

    var constraints = window.constraints = {
        audio: false,
        video: {
            deviceId: globalId,
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

// creata load model and active cameras
async function loadModel(){
    //SINGLEPOSE_LIGHTNING = faster , SINGLEPOSE_THUNDER = acc up
    model = await cocoSsd.load();

    // Set up canvas w and h
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Set fps for canvas draw
    const targetFps = 28;
    const timeInvert = Math.floor(1000 / targetFps);

    // draw each timeInvert  seconds
    setInterval(predictModel, timeInvert);

}

async function predictModel(){

    return new Promise( async (rec,rej) =>{
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

        rec(); 

    })

}

video.addEventListener('loadeddata', async (event) => {
    console.log('Yay!');
    loadModel();
});

