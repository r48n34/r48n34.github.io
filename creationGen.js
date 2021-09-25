const selectByYear = document.getElementById("selectByYear");
const contentBox = document.getElementById("contentBox");

const data = {
    years: ["2018", "2019", "2020", "2021"]
}

let currentYearSelect = [];

const allProj = [
    {year: "2018", title: "Minecraft school", des:"Secondary school build in minecraft" ,imgLink: "img/school.jpg", url: "https://r48n34.github.io/school/newSchoool.html"},
    {year: "2020", title: "Data calculator", des:"Dec, Bin, Hex calculator" , imgLink: "img/cal.jpg", url: "https://r48n34.github.io/toolsbox/tools.html"},
    {year: "2021", title: "BK exporter", des:"layout & combiner" , imgLink: "img/bkkk-1.jpg", url: "https://r48n34.github.io/jsbk/upweb.html"},
    {year: "2021", title: "React project", des:"Random react tools" , imgLink: "img/reaa.jpg", url: "https://peaceful-galileo-6fead0.netlify.app/#/"},
    {year: "2021", title: "ML algorithm PY", des:"For solving HandWriting question" , imgLink: "img/yo1.jpg", url: "https://peaceful-galileo-6fead0.netlify.app/#/"},
    
]
// {year: "2020", title: "Counter", des:"counter practice" , imgLink: "img/tin1.jpg", url: "https://r48n34.github.io/labo/yolo.html"},
// {year: "2020", title: "Tic Tac Toe", des:"Simple AI XO game" , imgLink: "img/0xx-1.jpg", url: "https://r48n34.github.io/labo/xo.html"},


function initAll(){

    data.years.forEach((v,i) =>{
        const idTemp = "box" + i;

        selectByYear.innerHTML += `
        <label> ${v}</label>
        <input type="checkbox" name="${v}" value="${v}" id="${idTemp}" style="margin-right:6px;"> 
        `;     

    });

    data.years.forEach((v,i) =>{

        document.getElementById("box" + i).addEventListener('change', e => {

            if(e.target.checked){
                currentYearSelect.push(v);
            }
            else{
                currentYearSelect = currentYearSelect.filter( e => e != v);
            }

            showHandler();    
        
        });    

    });

}

function displayGen(arr){
    contentBox.innerHTML = "";

    arr.forEach((v,i) =>{
        contentBox.innerHTML += `
        <div class="col-lg-4 col-md-6 mb-3">

            <div class="card" style="border-radius: 15px;">
                <div class="card-body">
                    <span class="badge bg-dark">${v.year}</span>
                    <h1><b>${v.title}</b></h1>
                    <h5 style="color: #474747;"><b>${v.des}</b></h5>
                    <img src="${v.imgLink}" alt="" class="card-img-top">
                    <br><br> 
                    <div style="text-align: right;">
                        <a href="${v.url}" target="_blank">
                            <button type="button" class="btn btn-dark">click me</button>
                        </a>
                    </div>                                
                </div>
            </div>
            
        </div>
        
        `
    });


}

function showHandler(){
    console.log(currentYearSelect);

    if(currentYearSelect.length == 0){
        displayGen(allProj);
    }
    else{
        let tempArr = [];

        for(let y of currentYearSelect){
            for(let tar of allProj){
                if(y == tar.year){
                    tempArr.push(tar);
                }
            }
        }

        displayGen(tempArr);

    }
}

initAll();
displayGen(allProj);
