let model;

// webCam
const video = document.querySelector('video');

// webCam display
const canvas = document.getElementById('output');
const ctx = canvas.getContext('2d');

//hp bar
const progressHp = document.getElementById("progressHp");
const hpMessage = document.getElementById("hpMessage");

// may be playField
//const canvasPlay = document.getElementById('playGround');
//const ctxPlay = canvasPlay.getContext('2d');
//canvasPlay.width = window.innerWidth;
//canvasPlay.height = window.innerHeight;
//ctxPlay.fillStyle = 'blue';
//ctxPlay.fillRect(0, 0, 50, 50);

// html div cursor
//const cursor = document.getElementById("cursor");
//cursor.style.width = window.innerWidth;
//cursor.style.height = window.innerHeight;

// debugMessage
const debugMessage = document.getElementById("debugMessage")
console.log("Width:", window.innerWidth)
console.log("Height:", window.innerHeight)

var constraints = window.constraints = {
    audio: false,
    video: {
        width:  360,
        height: 270,
        deviceId: 'b270185bf679aaa1050856c79b4285f4df54fa12560ee2a47f38651bb7f84626'
    }

};

getMedia(constraints);

async function getMedia(constraints) {
    let stream = null;

    let res = await navigator.mediaDevices.enumerateDevices();
    console.log(res)
  
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log(stream)

      window.stream = stream
      video.srcObject = stream

    } catch(err) {

    }
}

async function loadModel(){

    model = await poseDetection.createDetector(
        poseDetection.SupportedModels.MoveNet,
        {modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER}
    );

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const targetFps = 25
    const timeInvert = Math.floor(1000 / targetFps);

    setInterval(predictModel, timeInvert);

}

// 2D diff
function pointDIff(p1,p2){
    return Math.sqrt( (p1[0]-p2[0])**2 + (p1[1]-p2[1])**2 )
}

// 1D diff
function pointDIffOnePt(p1,p2){
    return Math.abs(p1 - p2)
}

let debugInfo = [  
    {  //left [0]
        minX:99999,
        maxX:0,
        minY:99999,
        maxY:0,
        minOverall:99999,
        maxOverall:0, 
    },  
    {  //right [1]
        minX:99999,
        maxX:0,
        minY:99999,
        maxY:0,
        minOverall:99999,
        maxOverall:0, 
    },
]

// Max hit that you can deal in shord period 
let hitInvertStatus = true;

// Max 4 hit per seconds
const resetHitInvertStatus = () => hitInvertStatus = true;
setInterval(resetHitInvertStatus, 250);

// diff > Threshold => hit conditions
const xThreshold = 100;
const yThreshold = 100;
const overallThreshold = 130;

// [x,y]
let previousPt = [[],[]];

//let hp = 0;

class Player{
    constructor(attackDam, weapon, gold, exp){
        this.attackDam = attackDam;
        this.weapon = weapon;
        this.gold = gold;
        this.exp = exp;
    }

    getGold(amount){
        this.gold += amount;
        document.getElementById("playerGold").innerHTML = this.gold;
    }
    
    getExp(amount){
        this.exp += amount;
        document.getElementById("playerExp").innerHTML = this.exp;
    }

    updateAttackDam(amount){
        this.attackDam += amount;
        document.getElementById("playerAttDam").innerHTML = this.attackDam;
    }
    
    updateWeapons(name){
        this.weapon = name;
        document.getElementById("playerWeapon").innerHTML = this.weapon;
    }
}

const playerCard = document.getElementById("playerCard");
let playerAttributeList = [
    {title: "Attack Damage:", id:"playerAttDam", defalutVal:1},
    {title: "Weapons:", id:"playerWeapon", defalutVal:"wooden Sword"},
    {title: "Exp:", id:"playerExp", defalutVal:0},
    {title: "Gold:", id:"playerGold", defalutVal:0},
]

function generatePlayerInfo(){
    playerAttributeList.forEach( (v,i) =>{
        playerCard.innerHTML +=`
        <div class="d-flex justify-content-between mt-2">
              <div> <h4>${v.title}</h4></div>
              <div> <h4 id=${v.id}>${v.defalutVal}</h4> </div>
        </div>
        `
    })
}

const shopCard = document.getElementById("shopCard");
// action 1 = increase damage [1,2] => action 1, increate dam by 2
// action 2 = changing weapomns [2,5] => action 2, changing weapons id 5
/*
let shopAttributeList = [
    {title: "Increase Damage:", id:"shopIncreaseDamagae", initialGoldSpend:50, increaseRate:10, now:50 , action:[[1,1]] },
    {title: "Better Weapons:", id:"shopBetterWeapons", initialGoldSpend:300, increaseRate:100, now:300, action:[[1,5],[2,1]] },
]
*/
let shopAttributeList = [
    {title: "Increase Damage:", id:"shopIncreaseDamagae", initialGoldSpend:50, increaseRate:10, now:50 , action:[[1,1]] },
    {title: "Better Weapons:", id:"shopBetterWeapons", initialGoldSpend:300, increaseRate:100, now:300, action:[[1,5],[2,1]] },
]

const actionList = {
    1: function(val){
        tom.updateAttackDam(val);
    },
    2: function(name){
        tom.updateWeapons(name);
    }
}

function generateShopInfo(){
    shopAttributeList.forEach( (v,i) =>{
        shopCard.innerHTML +=`
        <div class="d-flex justify-content-between mt-2">
              <div> <h4>${v.title} </h4></div>
              <div> <button id=${v.id} type="button" class="btn btn-light"> Buy it (${v.now} gold)</button> </div>
        </div>
        `
    })
    shopAttributeList.forEach( (v,i) =>{

        document.getElementById(v.id).addEventListener("click", (e)=>{

            if(tom.gold < v.now){
                hpMessage.innerHTML = "You don't have enough gold to do this."
                return;
            }
            
            tom.gold -= v.now;
            v.now += v.increaseRate;

            document.getElementById("playerGold").innerHTML = tom.gold;

            v["action"].forEach((subV,i) =>{
                actionList[subV[0]](subV[1]);
            })

            document.getElementById(v.id).innerHTML = `Buy it (${v.now} gold)`;


        })

    })

}

class Monster{
    constructor(hp, gold, expGive){
        this.hp = hp;
        this.originalHp = hp;
        this.gold = gold;
        this.status = true; // true = live / false = dead
        this.expGive = expGive;
    }

    //player = class player
    hit(player){

        this.hp -= player.attackDam;
        console.log("Remaining hp:", this.hp);

        progressHp.style.width = `${(this.hp / this.originalHp) * 100}%`;
        hpMessage.innerHTML = `${this.hp} / ${this.originalHp} HP`

        if(this.hp <= 0){

            this.status = false;
            console.log("Monster Dead!");
            monsterDeadCount ++;

            player.getGold(this.gold);
            player.getExp(this.expGive);

            let buffer = 10 + monsterDeadCount;
            slime = new Monster(buffer,buffer,buffer);
            progressHp.style.width = `100%`;
            hpMessage.innerHTML = `Monster Dead! ${this.expGive} exp gain!`;
        }

       
    }
}



let slime = new Monster(10,10,10)
let tom = new Player(1, "wooden_sword", 0,0 );
let monsterDeadCount = 0;

async function predictModel(){

    const poses = await model.estimatePoses(video);
    ctx.drawImage(video, 0, 0, video.videoWidth , video.videoHeight);

    if(poses.length >= 1){
       
        for (const pt of poses) {
            pt.keypoints != null && drawKeypoint(pt.keypoints)
        }
                           
        function drawKeypoint(keypoint) {
               
            ctx.fillStyle = 'blue';

            for (let pt of keypoint){

                if(pt.score > 0.2){
                    //ctx.fillRect(pt.x, pt.y, 50, 50);
                    ctx.beginPath()
                    ctx.arc(pt.x, pt.y, 5, 0, 2 * Math.PI, false)
                    ctx.fill()

                    if(pt.name == 'left_wrist' || pt.name == 'right_wrist'){

                        const rlNum = pt.name == 'left_wrist' ? 0 : 1;

                        const xPol = (pt.x / canvas.width) * window.innerWidth;
                        const yPol = (pt.y / canvas.height) * window.innerHeight;

                        if(previousPt[rlNum].length <=0){
                            previousPt[rlNum] = [xPol,yPol];
                            continue;
                        }

                        const diff = pointDIff(previousPt[rlNum], [xPol,yPol]);
                        const diffX = pointDIffOnePt(previousPt[rlNum][0],xPol);
                        const diffY = pointDIffOnePt(previousPt[rlNum][1],yPol);                    

                        debugInfo[rlNum].minX = Math.min(debugInfo[rlNum].minX, diffX);
                        debugInfo[rlNum].maxX = Math.max(debugInfo[rlNum].maxX , diffX);

                        debugInfo[rlNum].minY = Math.min(debugInfo[rlNum].minY, diffY);
                        debugInfo[rlNum].maxY = Math.max(debugInfo[rlNum].maxY , diffY);

                        debugInfo[rlNum].minOverall = Math.min(debugInfo[rlNum].minOverall, diff);
                        debugInfo[rlNum].maxOverall = Math.max(debugInfo[rlNum].maxOverall , diff);

                        const mesX = diffX > xThreshold;
                        const mesY = diffY > yThreshold;
                        const mesOver = diff > overallThreshold;

                        let hitIdentify = hitInvertStatus && (mesX || mesY || mesOver);
                        if(hitIdentify){
                            slime.hit(tom);
                            hitInvertStatus = false;
                        }

                        /*
                        let debugMessagePrint = `
                        <h1>now X: ${diffX} ${mesX}</h1>
                        <h1>now Y: ${diffY} ${mesY}</h1>
                        <h1>now overall: ${diff} ${mesOver}</h1>
                        <br>
                        <h1>minX: ${debugInfo[rlNum].minX}</h1>
                        <h1>maxX: ${debugInfo[rlNum].maxX}</h1>
                        <br>
                        <h1>minY: ${debugInfo[rlNum].minY}</h1>
                        <h1>maxY: ${debugInfo[rlNum].maxY}</h1>
                        <br>
                        <h1>minOverall: ${debugInfo[rlNum].minOverall}</h1>
                        <h1>maxOverall: ${debugInfo[rlNum].maxOverall}</h1>
                        <br>
                        <h1>${hitIdentify}</h1>
                        `
                        */

                        previousPt[rlNum] = [xPol,yPol];
                        
                        //console.log(xPol)
                        //console.log(yPol)
                        
                        //ctxPlay.clearRect(0, 0, canvasPlay.width, canvasPlay.height);
                        //ctxPlay.fillRect(xPol, yPol, 30, 30);

                        //cursor.style.left = `${xPol}px`;
                        //cursor.style.top = `${yPol}px`;
                    }
                }

            }
            
        }
                      
    }
    else{
        console.log("nope")
    }

}



video.addEventListener('loadeddata', async (event) => {
    console.log('Yay! The readyState just increased to ' +'HAVE_CURRENT_DATA or greater for the first time.');
    loadModel();
    generatePlayerInfo();
    generateShopInfo();
});