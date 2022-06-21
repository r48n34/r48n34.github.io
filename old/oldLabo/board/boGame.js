const cnv = canvas.getContext("2d");
let width = 1000;
let height = 800;
const offsetH = 100;
const offsetW = 100;

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
            await oneSec();
        }
    
    }
}

async function dr(){
    
    cnv.fillStyle = "black";

    for(let kk = 25; kk < height ; kk += offsetH ){

        for(let j = 25; j < width ; j += offsetW ){
            await oneSec();
            cnv.fillRect(j, kk, 50, 50);
        }
    
    }

    

}

dr();
