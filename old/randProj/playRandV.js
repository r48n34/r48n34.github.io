// Video of the random list
class WebLink{ // class method to implementing
     
     constructor(name, url){  
         this.webName = name;
         this.webUrl = url;
     }
 
}

var request = new XMLHttpRequest();
request.open('GET', 'songWebText.txt', false); // if file is a raw txt with line
request.send();
   
let videoList = request.responseText.split("\n"); //Array list of the video list
let classList = [];

for(let i = 0; i < videoList.length ; i += 2){
     classList.push(new WebLink (videoList[i], videoList[i+1]));
}

videoList = new Array();

let historyArray = []; //local info
let t = JSON.parse(localStorage.getItem('record'));

const time = request.getResponseHeader("Last-Modified").slice(4,25); //last mod time of txt

function youTubeGetID(url){
     url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
     return undefined !== url[2]?url[2].split(/[^0-9a-z_\-]/i)[0]:url[0];
}

function goRandom(){
     let num = Math.floor(Math.random() * classList.length);
     let code = youTubeGetID(classList[num].webUrl);
     appHa.validVideoId(code, classList[num]);      
}

Vue.component('video-box', {
     props: ['item','imgg'],
     template: `
     <div class="col-3 mt-4">
        <div class="card">
             <div class="card-body">              
                 <h5 class="card-title" v-html="item.webName.link(item.webUrl)"></h5>
                 <hr>
                 <div v-html="imgg" ><div>               
             </div>
        </div>
     </div>
     `    
})

var appHa = new Vue({
     el: '#appMusic',
     data: {
          messageTop: "Played Video:",
          currentVdo: "",
          currentList: [],
          historyRecord: "",
     },
     methods: {

          openVdo: function (li){

               let yourImg = "https://img.youtube.com/vi/" + youTubeGetID(li.webUrl) + "/0.jpg";
          
               window.open(li.webUrl, '_blank'); //Play video in a new windows
               this.currentList.push([li, `<img src="${yourImg}" width="230" height="auto">`] );
              
               this.messageTop = "Played Video : (" + this.currentList.length + ")";
               this.currentVdo = li.webName.link(li.webUrl);
          
               historyArray.push(li);
               localStorage.setItem('record', JSON.stringify(historyArray) );
          
               let temp = `<h2>Name: ${li.webName}</h2> <h2>URL: ${li.webUrl}</h2> </br>`
               this.historyRecord += temp;
               
               
          },

          validVideoId: function (id,li){       
               var img = new Image();
               img.src = "http://img.youtube.com/vi/" + id + "/mqdefault.jpg";
               img.onload = function () {
                    this.width === 120 ? appHa.currentVdoChange(li) : appHa.openVdo(li);                              
               }
          },

          currentVdoChange : function (li){
               this.currentVdo = li.webName.link(li.webUrl) + "[May invalid]" + "<br/>";
          },

          historyRecordSet: function(){
               let temp = ``;

               if(t != null){
                    historyArray = [...t];
                    for(i of Object.keys(historyArray)){
                         temp += `<h2>Name: ${historyArray[i].webName}</h2> <h2>URL: ${historyArray[i].webUrl}</h2> </br>`;
                    }
               }

               this.historyRecord = temp;

          },

          clearLocal: function(){
               try{
                    localStorage.removeItem('record');
                    this.currentVdo = "History Clear!";
                    this.historyRecord = "";
               }
               catch(e){
                    alert("Clear fail.");
               }
          }
       
 
     },
     beforeMount(){
          this.historyRecordSet();
     },    
     computed: {
          lastUpdate: function (){
              return "last update: "+ time + "<br> Total Video = " + parseInt(classList.length, 10);  ;
          },      

     },  
 
})

document.addEventListener("keyup", function(event) {
     if (event.keyCode === 13) {
        goRandom();
     }
});