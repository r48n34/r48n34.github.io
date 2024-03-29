//main pages
const mainPage = document.getElementById("mainPage"); // div
const startBtnEasy = document.getElementById("startBtnEasy"); // button easy
const startBtnHard = document.getElementById("startBtnHard"); // button hard
const goCons = document.getElementById("goCons"); // button go this page

//stages transition
const stagePage = document.getElementById("stagePage"); // div
const stageMessage = document.getElementById("stageMessage"); // text

//cons
const com = document.getElementById("com"); // div this page
const consBack = document.getElementById("consBack"); // button back main
const consPlay = document.getElementById("consPlay"); // button play
const comErr = document.getElementById("comErr"); // error message

const s1RunTime = document.getElementById("s1RunTime"); // input box
const s2RunTime = document.getElementById("s2RunTime");
const s2Inverted = document.getElementById("s2Inverted");
const s3RunTime = document.getElementById("s3RunTime");
const s4RunTime = document.getElementById("s4RunTime");
const s4Inverted = document.getElementById("s4Inverted");

//stage 1
const stageOne = document.getElementById("stageOne"); //div
const runppl = document.getElementById("runppl"); //img
const stageOneTimer = document.getElementById("stageOneTimer"); //text

//stage 2
const stageTwo = document.getElementById("stageTwo"); //div
const actionPic = document.getElementById("actionPic"); // div of img container
const sTwoCount = document.getElementById("sTwoCount"); // text
const twoTopMessgae = document.getElementById("twoTopMessgae"); // text
const picMessage = document.getElementById("picMessage"); // text

//stage 3
const stageThree = document.getElementById("stageThree"); //div
const threeTimer = document.getElementById("threeTimer"); //text

const leftArr = document.getElementById("leftArr"); //img pos div
const downArr = document.getElementById("downArr");
const upArr = document.getElementById("upArr");
const rightArr = document.getElementById("rightArr");

const moveAct = document.getElementById("moveAct"); // cartoon div container

//stage 4
const stageFour = document.getElementById("stageFour"); // div
const fourTimer = document.getElementById("fourTimer"); // text

//end
const ending = document.getElementById("ending"); // div

//sound
const bgmFx = new Audio('/schoolMusic/bgm.mp3'); // bgm
const readyFx = new Audio('/schoolMusic/ready.mp3'); // ready
const goFx = new Audio('/schoolMusic/goo.mp3'); // go
const clapp = new Audio('/schoolMusic/clap.mp3'); // end clap

let bgmPlaying = false;

document.getElementById("musicPlayBtn").addEventListener("click" , () => {
    controlBgm();
})

function controlBgm(){
    bgmPlaying = !bgmPlaying;
    bgmPlaying ? bgmFx.play(): bgmFx.pause();
}

let stagePosition = 0; // current stage

let times = 0; // share timer
let isRunning = false;

//stage 1 running time
let runningtime = 20; 

//stage 2 variables
let actionImg = ["kintore_ojisan.png","walk_boy_run.png", "banzai_kids_girl2.png", "undou_sports_family_haha_musume.png", "sick_alcohol_chudoku.png", "tabako_denshi_ojisan.png", "taiiku_boushi_tate.png","ishi_keru_boy.png"]; //stage 2 patten
let textDescript = ["Lifting" , "Run", "Jump", "Bending", "Drinking wine", "Smoking", "Marching", "Kicking"];
let doingtime = 50;
let preNum = 0;
let actionInverted = 4;

//stage 3 variables
let arrowImg = ["left.png", "down.png", "up.png", "right.png"];
let arrowAction = ["pointLeft.png","taiiku_suwari_boy.png", "pointUp.png", "pointRight.png"];
let endMusicTime = 40;

//stage 4 variables
let specialBush = ["beerB.png","nosmoke2B.png","nosmokeB.png","smoke2B.png","smokeB.png","nosmoke2B.png","nosmoke2B.png"];
let bId = ["bushA","bushB","bushC"];
let st4Inverted = 4;
let st4EndTime = 40;

let stageFuncArr = [stageOneLoop, stageTwoLoop, stageThreeLoop, stageFourLoop];

var interval = setInterval(function() { // timer function
    if (isRunning) {

        times ++;
        console.log(times);
        stageFuncArr[stagePosition - 1]();
               
    } 
}, 1000);

function stageOneLoop(){
    stageOneTimer.innerHTML = times + "/" + runningtime + " seconds";

    if(times == runningtime + 1){ // done
        isRunning = false;
        times = 0;
        stageOneTimer.innerHTML = "Done! Great!"

        setTimeout(goStage, 4000, 2 ,stageOne);
        setTimeout(stageTwoGame, 8000);

    }
}

function stageTwoLoop(){
    if(times % actionInverted == 0){
        actionPic.innerHTML = "";

        var img = document.createElement('img');
        let num = Math.floor(Math.random() * actionImg.length);
        let srcName = "/gameImgs/" + actionImg[num];
        console.log(srcName);

        img.height = "400";
        img.src = srcName;

        actionPic.appendChild(img);
        
        if (preNum != num){
            twoTopMessgae.innerHTML = "Change!";
        }
        else{
            twoTopMessgae.innerHTML = "Hold!";
        }

        picMessage.innerHTML = textDescript[num];

        preNum = num;
        

    }

    sTwoCount.innerHTML = (times % actionInverted) + 1;

    if(times == doingtime){
        isRunning = false;
        times = 0;
        sTwoCount.innerHTML = "Done! Great!"

        setTimeout(goStage, 4000, 3 ,stageTwo);
        setTimeout(stageThreeGame, 8000);


    }

}

let threeHelper = [leftArr,downArr,upArr,rightArr];

function stageThreeLoop(){
    threeTimer.innerHTML = times + " secs /" + endMusicTime + " secs";

    if(times % 2 == 0 || times == 1){

        var img = document.createElement('img');
        let num = Math.floor(Math.random() * arrowImg.length);
        let srcName = "/gameImgs/" + arrowImg[num];
        console.log(srcName);               

        img.src = srcName;
        img.width = "180";
        img.height = "180";            

        let arrName = "a" + times;
        img.id = arrName

        img.className += "moveArrow";

        /////////////moveAct
        moveAct.innerHTML = "";
        var imgLeft = document.createElement('img');
        let srcNameLeft = "/gameImgs/" + arrowAction[num];

        imgLeft.src = srcNameLeft;
        imgLeft.width = "180";

        moveAct.appendChild(imgLeft);

        let k = threeHelper[num];
        k.appendChild(img);
                   
        setTimeout(function(){ document.getElementById(arrName).style.display = "none"; }, 3000);
                
    }

    if(times == endMusicTime){
        isRunning = false;
        times = 0;

        setTimeout(goStage, 4000, 4 ,stageThree);
        setTimeout(stageFourGame, 8000);

    }

}

function stageFourLoop(){

    fourTimer.innerHTML = times + " secs";

    if(times % st4Inverted == 0 || times == 1 ){
        bId.forEach(e => document.getElementById(e).src = "/gameImgs/normalB.png")

        let ranBush = Math.floor(Math.random() * specialBush.length);
        let ranThree = Math.floor(Math.random() * bId.length);

        let location = "img/" + specialBush[ranBush];
        console.log(location);

        document.getElementById(bId[ranThree]).src = location;

    }

    if(times == st4EndTime){
        isRunning = false;
        times = 0;
        fourTimer.innerHTML = "Done! Great!";
        setTimeout(endPage, 4000);

    }

}

function pageChange(a,b){
    a.style.display = "none";
    b.style.display = "block";
}

function goStage(number, curPage){
    curPage.style.display = "none";

    stageMessage.innerHTML = "Stage " + number + "<br>";
    stagePage.style.display = "block";

    setTimeout(function(){ stageMessage.innerHTML += "Ready" + "<br>"; readyFx.play(); }, 1500);
    setTimeout(function(){ stageMessage.innerHTML += "Go!" + "<br>"; goFx.play();}, 2200); // 4000 time

    setTimeout(function(){ stagePage.style.display = "none"; }, 4000);

}

startBtnEasy.onclick = function() {
    bgmFx.play();
    goStage(1,mainPage);
    setTimeout(stageOneGame, 4000);

}

startBtnHard.onclick = function() {
    runningtime = 25;

    doingtime = 50;
    actionInverted = 3;

    endMusicTime = 60;

    st4Inverted = 3;
    st4EndTime = 50;

    bgmFx.play();
    goStage(1,mainPage);
    setTimeout(stageOneGame, 4000);

}

consPlay.onclick = function() {
    co();  
}

function co(){
    const idAll = [s1RunTime,s2RunTime,s2Inverted,s3RunTime,s4RunTime,s4Inverted];

    for(let i = 0; i < idAll.length ; i++){

        if(parseInt(idAll[i].value,10) <= 0){
            comErr.innerHTML = "Value must bigger than 0.";
            return;
        }

        if(idAll[i].value == ""){
            comErr.innerHTML = "Value can not be none.";
            return;
        }

    }

    runningtime = parseInt(s1RunTime.value,10);

    doingtime = parseInt(s2RunTime.value,10);
    actionInverted = parseInt(s2Inverted.value,10);

    endMusicTime = parseInt(s3RunTime.value,10);

    st4EndTime = parseInt(s4RunTime.value,10);
    st4Inverted = parseInt(s4Inverted.value,10);
 
    bgmFx.play();
    goStage(1,com);
    setTimeout(stageOneGame, 4000);

}

goCons.onclick = function(){
    pageChange(mainPage,com);
}

consBack.onclick = function(){
    pageChange(com,mainPage);
}


function stageOneGame(){ //stage 1 game start function
    stagePosition = 1;
    stageOne.style.display = "block";
    runppl.className += "runningCss";
    isRunning = true;

}

function stageTwoGame(){ //stage 2 game start function
    stagePosition = 2;
    stageTwo.style.display = "block";
    isRunning = true;

    actionPic.innerHTML = "";
    sTwoCount.innerHTML = "1";
    twoTopMessgae.innerHTML = "Change!"

    var img = document.createElement('img');
    let num = Math.floor(Math.random() * actionImg.length);
    let srcName = "/gameImgs/" + actionImg[num];
    console.log(srcName);
    picMessage.innerHTML = textDescript[num];  

    img.height = "400";

    img.src = srcName;

    actionPic.appendChild(img);
    preNum = num; 

}

function stageThreeGame(){ //stage 3 game start function
    stagePosition = 3;
    stageThree.style.display = "block";
    isRunning = true;

    threeTimer.innerHTML = "0 sec";

}

function stageFourGame(){ //stage 4 game start function
    stagePosition = 4;
    stageFour.style.display = "block";
    isRunning = true;

}

function mrefresh(){
    window.location.reload();
}

function endPage(){
    pageChange(stageFour,ending);

    clapp.play();
    console.log("refresh after 5s.");

    setTimeout(mrefresh, 5000);
}
