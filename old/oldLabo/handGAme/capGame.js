var video = document.getElementById("video");
const LoadingScr = document.getElementById("LoadingScr");
const mainScr = document.getElementById("mainScr");

const context = canvas.getContext("2d");
const curr = document.getElementById("curr");
const gameScore = document.getElementById("gameScore");

let totalScore = 0;
let currText = "";
let isVideo = false;
let model;

let lb = ["point", "closed", ""];

const modelParams = {
    flipHorizontal: false, // flip e.g for video
    maxNumBoxes: 20, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.6, // confidence threshold for predictions.
};

async function loadingScr() {
    model = await handTrack.load(modelParams);
    isVideo = true;

    LoadingScr.style.display = "none";
    mainScr.style.display = "block";
    startVideo();
    //runDetection();
}

function startVideo() {

    handTrack.startVideo(video).then(function (status) {
        console.log("video started", status);

        if (status) {
        isVideo = true;
        runDetection();
        }

    });

}

window.onload = function () {
    loadingScr();
};

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
    //video.srcObject = stream;
    //video.play();
    });
}

let currBlockPol = 0; // current block position
let currSector = 0; // current player position
const blockPol = [60, 370, 620, 870];

function runDetection() {
    model.detect(video).then((predictions) => {

        console.log("Predictions: ", predictions);
        model.renderPredictions(predictions, canvas, context, video);
        context.fillStyle = "white";

        if (predictions.length >= 1) {
        let a = "";

        for (let i = 0; i < predictions.length; i++) {
            a += predictions[i].label + " ";
        }

        console.log(a);

        currText = predictions[0].label;
        curr.innerHTML = currText + " " + predictions[0].bbox[0];

        console.log(predictions[0].bbox[0]);
        //bbox (x,y, width, height)

        let xPol = predictions[0].bbox[0];
        //let yPol = predictions[0].bbox[1];

        if (xPol < 250) {
            curr.innerHTML += " A";
            currSector = 0;
        }
        else if (xPol >= 250 && xPol < 500) {
            curr.innerHTML += " B";
            currSector = 1;
        }
        else if (xPol >= 500 && xPol < 600) {
            curr.innerHTML += " C";
            currSector = 2;
        }
        else {
            curr.innerHTML += " D";
            currSector = 3;
        }

        context.fillRect(predictions[0].bbox[0], 710, 130, 10);
    }

    //62,375,625,875
    context.fillRect(250, 0, 10, 1000);
    context.fillRect(500, 0, 10, 1000);
    context.fillRect(750, 0, 10, 1000);

    if (currSector == currBlockPol) {
      gameRand();
      totalScore += 1;
      //gameScore.innerHTML = "Score: " + totalScore;
    }

    context.fillRect(blockPol[currBlockPol], 0, 100, 100);

    context.font = "48px";
    context.fillText("Score: " + totalScore, 10, 740);

    if (isVideo) {
      requestAnimationFrame(runDetection);
    }

  });
}


function gameRand() {
    let t = getRandomInt(4);

    while(t == currBlockPol){ // prevent dup
        t = getRandomInt(4);
    }

    currBlockPol = t;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
