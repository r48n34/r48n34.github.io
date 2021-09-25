const cnv = canvas.getContext("2d");
let width = 1000;
let height = 800;
const offsetH = 100;
const offsetW = 100;

//cnv.fillStyle = "white";
//cnv.fillRect(0, 0, 100, 100);

//cnv.fillStyle = "orange";
//cnv.fillRect(100, 0, 100, 100);

function bgDraw(){
    let k = 0;
    for(let j = 0; j < height ; j += offsetH , k++){
    
        for (let i = 0; i < width; i += offsetW, k++){
            k % 2 === 0 ? cnv.fillStyle = "white" : cnv.fillStyle = "orange";
            cnv.fillRect(i, j, 100, 100);
        }
    
    }
}

bgDraw();


cnv.fillStyle = "black";
//cnv.fillRect(25,25,50,50);
//cnv.fillRect(125,25,50,50);
//cnv.fillRect(225,25,50,50);

//cnv.fillRect(25,125,50,50);

function oneSec(){
    return new Promise( resolve =>{
        setTimeout(() => { resolve("hello")},30);
    });
}

async function bgDrawWait(){
    let k = 0;
    for(let j = 0; j < height ; j += offsetH , k++){
    
        for (let i = 0; i < width; i += offsetW, k++){
            k % 2 === 0 ? cnv.fillStyle = "white" : cnv.fillStyle = "orange";
            cnv.fillRect(i, j, 100, 100);
            let jj = await oneSec();
        }
    
    }
}

async function dr(){
    
    cnv.fillStyle = "black";

    for(let kk = 25; kk < height ; kk += offsetH ){

        for(let j = 25; j < width ; j += offsetW ){
            let jj = await oneSec();
            cnv.fillRect(j, kk, 50, 50);
        }
    
    }

    

}

dr();
