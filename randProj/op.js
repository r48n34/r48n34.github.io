//Script to get all vaild available url from txt
//old version, new on other project

class WebLink2{ // class method to implementing
     
    constructor(name, url){  
        this.webName = name;
        this.webUrl = url;
    }

}

function getInfo() {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.open('GET', 'testt.txt', false); // if file is a raw txt with line
        request.send();
        
        let videoList = request.responseText.split("\n"); //Array list of the video list
        let classList = [];

        for(let i = 0; i < videoList.length ; i += 2){
            classList.push(new WebLink (videoList[i], videoList[i+1]));
        }

        videoList = new Array();
        
        resolve(classList);
        
    })
}

function youTubeGetID2(url){
    return new Promise((resolve, reject) =>{
        url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        undefined !== url[2] ? resolve(url[2].split(/[^0-9a-z_\-]/i)[0]) : resolve(url[0]);
    });

}

function checkValid(id,li) {
    return new Promise((resolve, reject) =>{
        var img = new Image();
        img.src = "http://img.youtube.com/vi/" + id + "/mqdefault.jpg";
        img.onload = function () {
         this.width === 120 ? resolve(0) : resolve(1);                              
        }

    });

}
  
  
async function doing() {
    let result = await getInfo();
    let filted = [];
    let fail = []

    for(let i = 0; i < result.length; i++){
        console.log(i);

        youTubeGetID2(result[i].webUrl)
        .then(e => checkValid(e, result[i]))
        .then(b => {b != 0 ? filted.push(result[i]) : fail.push(result[i]) });
             

    }

    console.log("done");
    console.log("success array = " + filted); 
    console.log("failed array = " + fail);
   
};


doing();