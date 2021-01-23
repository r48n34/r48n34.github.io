//Script to get all vaild available url from txt
class WebLink2{ // class method to implementing
     
    constructor(name, url){  
        this.webName = name;
        this.webUrl = url;
    }

}

function firstFunction() {
    return new Promise((resolve, reject) => {
        let y = 0
        var request = new XMLHttpRequest();
        request.open('GET', 'songWebText.txt', false); // if file is a raw txt with line
        request.send();
        
        let videoList = request.responseText.split("\n"); //Array list of the video list
        let classList = [];

        for(let i = 0; i < videoList.length ; i += 2){
            classList.push(new WebLink (videoList[i], videoList[i+1]));
        }

        videoList = new Array();
        
        resolve(classList)
        
    })
}

function youTubeGetID2(url){
    return new Promise((resolve, reject) =>{
        url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        let k = undefined !== url[2] ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
        resolve(k)
    })

}

function checkValid(id,li) {
    return new Promise((resolve, reject) =>{
        var img = new Image();
        img.src = "http://img.youtube.com/vi/" + id + "/mqdefault.jpg";
        img.onload = function () {
         this.width === 120 ? resolve(0) : resolve(li);                              
        }


    })

}
  
  
async function doing() {
    let result = await firstFunction();

    for(let i = 0; i < result.length;i++){
        let a = await youTubeGetID2(result[i].webUrl);
        let b = await checkValid(a, result[i]);
        if(b != 0){
            console.log(b);
        }
        console.log(i);
        

    }
    

}; 

doing();