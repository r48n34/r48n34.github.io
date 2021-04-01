//main pages
const mainPage = document.getElementById("mainPage");
const startBtnEasy = document.getElementById("startBtnEasy");
const startBtnHard = document.getElementById("startBtnHard");

//stages transition
const stagePage = document.getElementById("stagePage");
const stageMessage = document.getElementById("stageMessage");

//stage 1
const stageOne = document.getElementById("stageOne");
const runppl = document.getElementById("runppl");
const stageOneTimer = document.getElementById("stageOneTimer");

//stage 2
const stageTwo = document.getElementById("stageTwo");
const actionPic = document.getElementById("actionPic");
const sTwoCount = document.getElementById("sTwoCount");
const twoTopMessgae = document.getElementById("twoTopMessgae");
const picMessage = document.getElementById("picMessage");

//stage 3
const stageThree = document.getElementById("stageThree");
const threeTimer = document.getElementById("threeTimer");
const leftArr = document.getElementById("leftArr");
const downArr = document.getElementById("downArr");
const upArr = document.getElementById("upArr");
const rightArr = document.getElementById("rightArr");
const moveAct = document.getElementById("moveAct");

//stage 4
const stageFour = document.getElementById("stageFour");
const fourTimer = document.getElementById("fourTimer");

//end
const ending = document.getElementById("ending");

//sound
const bgmFx = new Audio('music/bgm.mp3');
const readyFx = new Audio('music/ready.mp3');
const goFx = new Audio('music/goo.mp3');

bgmFx.play();
let bgmPlaying = true;

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
let specialBush = ["beerB.png","nosmoke2B.png","nosmokeB.png","smoke2B.png","smokeB.png"];
let bId = ["bushA","bushB","bushC"];
let st4Inverted = 2;
let st4EndTime = 40;

var interval = setInterval(function() { // timer function
    if (isRunning) {

        times ++;
        console.log(times);

        if(stagePosition == 1){
            stageOneTimer.innerHTML = times + "/" +runningtime + " seconds";

            if(times == runningtime + 1){
                isRunning = false;
                times = 0;
                stageOneTimer.innerHTML = "Done! Great!"

                setTimeout(goStage, 4000, 2 ,stageOne);
                setTimeout(stageTwoGame, 8000);

            }
        }
        else if(stagePosition == 2){

            if(times % actionInverted == 0){
                actionPic.innerHTML = "";

                var img = document.createElement('img');
                let num = Math.floor(Math.random() * actionImg.length);
                let srcName = "img/" + actionImg[num];
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
        else if(stagePosition == 3){
            threeTimer.innerHTML = times + " sec";

            if(times % 2 == 0 || times == 1){

                var img = document.createElement('img');
                let num = Math.floor(Math.random() * arrowImg.length);
                let srcName = "img/" + arrowImg[num];
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
                let srcNameLeft = "img/" + arrowAction[num];

                imgLeft.src = srcNameLeft;
                imgLeft.width = "180";

                moveAct.appendChild(imgLeft);

                if(num == 0){
                    leftArr.appendChild(img);           
                }
                else if(num == 1){
                    downArr.appendChild(img); 
                }
                else if(num == 2){
                    upArr.appendChild(img); 
                }
                else{
                    rightArr.appendChild(img);  
                }
                   
                setTimeout(function(){ document.getElementById(arrName).style.display = "none"; }, 3000);


                
            }

            if(times == endMusicTime){
                isRunning = false;
                times = 0;
                //endPage();

                setTimeout(goStage, 4000, 4 ,stageThree);
                setTimeout(stageFourGame, 8000);


            }



        }
        else if(stagePosition == 4){

            fourTimer.innerHTML = times;

            if(times % st4Inverted == 0 || times == 1 ){
                bId.forEach(e => document.getElementById(e).src = "img/normalB.png")

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
                //endPage();
            }

            
        }
               
    } 
}, 1000);

function goStage(number, curPage){
    curPage.style.display = "none";

    stageMessage.innerHTML = "Stage " + number + "<br>";
    stagePage.style.display = "block";

    setTimeout(function(){ stageMessage.innerHTML += "Ready" + "<br>"; readyFx.play(); }, 1500);
    setTimeout(function(){ stageMessage.innerHTML += "Go!" + "<br>"; goFx.play();}, 2200); // 4000 time

    setTimeout(function(){ stagePage.style.display = "none"; }, 4000);

}

startBtnEasy.onclick = function() {
    goStage(1,mainPage);
    setTimeout(stageOneGame, 4000);

}

startBtnHard.onclick = function() {
    runningtime = 25;

    doingtime = 50;
    actionInverted = 3;

    endMusicTime = 60;

    st4Inverted = 1;
    st4EndTime = 50;

    goStage(1,mainPage);
    setTimeout(stageOneGame, 4000);

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
    let srcName = "img/" + actionImg[num];
    console.log(srcName);
    picMessage.innerHTML = textDescript[num];  

    img.height = "400";

    img.src = srcName;

    actionPic.appendChild(img);
    preNum = num; 

}

function stageThreeGame(){ //stage 1 game start function
    stagePosition = 3;
    stageThree.style.display = "block";
    isRunning = true;

    threeTimer.innerHTML = "0 sec";

}

function stageFourGame(){ //stage 1 game start function
    stagePosition = 4;
    stageFour.style.display = "block";
    isRunning = true;

}

function endPage(){
    stageFour.style.display = "none";
    ending.style.display = "block";
}
