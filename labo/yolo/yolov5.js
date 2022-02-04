// react code version and references by 

/*
    Step to run yolov5 model on your website (no server needed)
    Thanks https://github.com/zldrobit/tfjs-yolov5-example for references

    1. Train your model with yolov5

    2. Save your best.pt weights to your pc

    3. git the yolov5 to your pc if you have not done yet
    - git clone https://github.com/ultralytics/yolov5

    4. Run below comment in the yolov5 folder to export a tfjs model
    - python export.py --weights <your weights.pt file> --include tfjs
    e.g. python export.py --weights best.pt --include tfjs

    5. At that point, you will have a folder holding the model.json and other weights files

    6. Open a repository in github (NOT gitlab, is github), git push your folder to that repository

    7. Your jsdelivr link should be like this
    -  https://cdn.jsdelivr.net/gh/<your username>/<your respo>/<your model folder>/model.json

    8. Change the modelUrlPath, imgSize, label by your own data

    8. Done

*/

// model variables
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

// stats library
const stats = new Stats();

const imgSize = 640
const modelUrlPath = 'https://cdn.jsdelivr.net/gh/r48n34/self-tf-Model-storage/yolov5s_web_model/model.json'
const scoreThras = 0.4 // score lower then that will not display

const labels = ['person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus', 'train', 'truck', 'boat', 'traffic light',
               'fire hydrant', 'stop sign', 'parking meter', 'bench', 'bird', 'cat', 'dog', 'horse', 'sheep', 'cow',
               'elephant', 'bear', 'zebra', 'giraffe', 'backpack', 'umbrella', 'handbag', 'tie', 'suitcase', 'frisbee',
               'skis', 'snowboard', 'sports ball', 'kite', 'baseball bat', 'baseball glove', 'skateboard', 'surfboard',
               'tennis racket', 'bottle', 'wine glass', 'cup', 'fork', 'knife', 'spoon', 'bowl', 'banana', 'apple',
               'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog', 'pizza', 'donut', 'cake', 'chair', 'couch',
               'potted plant', 'bed', 'dining table', 'toilet', 'tv', 'laptop', 'mouse', 'remote', 'keyboard', 'cell phone',
               'microwave', 'oven', 'toaster', 'sink', 'refrigerator', 'book', 'clock', 'vase', 'scissors', 'teddy bear',
               'hair drier', 'toothbrush']



async function getMedia() {
    let stream = null;

    let constraints = window.constraints = {
        audio: false,
        video: {
            facingMode: "environment" 
        }
    };
  
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log(stream)

      window.stream = stream
      video.srcObject = stream

    } catch(err) {
        console.log(err);
    }
}


// creata load model and active cameras
async function loadModel(){

    model = await tf.loadGraphModel(modelUrlPath);

    // Set up canvas w and h
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    predictModel();

    const capBtn = document.getElementById("capBtn");

    capBtn.addEventListener("click", async () => {

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

video.addEventListener('loadeddata', async () => {
    console.log('Yay!');
    loadModel();
});

window.onload = async () => {
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( stats.dom );

    getMedia();
}

var requestAnimationFrameCross = window.webkitRequestAnimationFrame ||
        window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame || window.msRequestAnimationFrame;

async function predictModel(){
    
    stats.begin();

    // Prevent memory leaks by using tidy 
    let imgPre = await tf.tidy(() => { 
        return tf.browser.fromPixels(video)
            .resizeNearestNeighbor([imgSize, imgSize])
            .toFloat()
            .div(tf.scalar(255.0)) 
            .expandDims();
    });
    
    const result = await model.executeAsync(imgPre);

    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";

    const [boxes, scores, classes, valid_detections] = result;
    const boxes_data = boxes.dataSync();
    const scores_data = scores.dataSync();
    const classes_data = classes.dataSync();
    const valid_detections_data = valid_detections.dataSync()[0];

    // Prevent memory leaks also
    await tf.dispose(result);
    await tf.dispose(imgPre);
    await tf.disposeVariables(result);

    ctx.drawImage(video, 0, 0);

    for (let i = 0; i < valid_detections_data; ++i) {

        if( scores_data[i] <= scoreThras){
            continue;
        }

        let [x1, y1, x2, y2] = boxes_data.slice(i * 4, (i + 1) * 4);

        x1 *= canvas.width;
        x2 *= canvas.width;
        y1 *= canvas.height;
        y2 *= canvas.height;

        const width = x2 - x1;
        const height = y2 - y1;
        const klass = labels[classes_data[i]];
        const score = scores_data[i].toFixed(2);

        // Draw the bounding box. (draw box)
        ctx.strokeStyle = "#00FFFF";
        ctx.lineWidth = 4;
        ctx.strokeRect(x1, y1, width, height);

        // Draw the label background. (draw label bg)
        ctx.fillStyle = "#00FFFF";
        const textWidth = ctx.measureText(klass + ":" + score).width;
        const textHeight = parseInt(font, 10); // base 10
        ctx.fillRect(x1, y1, textWidth + 4, textHeight + 4);

        // Draw the text last to ensure it's on top. (draw label)
        ctx.fillStyle = "#000000";
        ctx.fillText(klass + ":" + score, x1, y1);  

    }

    stats.end();
    requestAnimationFrameCross(predictModel);        
}
