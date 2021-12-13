// html dom box that occur cards
const boxbox = document.getElementById("boxbox");

// html input box
const input1 = document.getElementById("input1");

// your data places
let data = [
  { name: "藍針水晶不可不知的知識", title: "你知唔知藍針係乜？", url: "https://www.instagram.com/p/CVKxwS_JCI3/", imgScr:"./image/blue1.png"},
  { name: "新手指南:超七有新舊？ 乜係超八超十一？", title: "不同產地的月亮石差別有多大?", url: "https://www.instagram.com/p/COFkqabD5Wo/", imgScr:"./image/m2.png"},
  { name: "新手指南: 閃靈鑽？", title: "草莓晶主體部份為白水晶/粉水晶，內含物如草莓籽而得名?", url: "https://www.instagram.com/p/CLEYkDgDPek/", imgScr:"./image/b3.png"},
  { name: "新手指南: 金草莓？", title: "係我眼中都係愛不惜手嘅寶貝✨實在冇必要因為咁而傷和氣呢～", url: "https://www.instagram.com/p/CPxtIR1jme8/", imgScr:"./image/b4.jpg"},
  { name: "金運石的五個驚人冷知識", title: "睇完哩五個冷知識有咩感覺？", url: "https://www.instagram.com/p/CSHFPpOpjT2/", imgScr:"./image/b5.jpg"},
];

// Step 1. Bounding DOm elements ( boxbox ) ( input1 )
// Step 2. genBox(data) => loop data array and shows on html page
// Step 3. input1.addEventListener active when typing on the box
// Step 4. 

// active function when user type on the input box
input1.addEventListener("input", () => {

  if(input1.value.length == 0 || input1.value === undefined){ //no value on the input box
    genBox(data)
  }
  else{ // have value on the input box
    genBox( getData(input1.value) );
  }

});

// data fikter for select the regarding input text
function getData(str) {
    return data.filter( (v) => v.name.toLowerCase().includes( str.toLowerCase() ) );
}

// render the html box
function genBox(data) {
  let str = ``;

  for (let i of data) {
    str += `
        <div>
            <div style="width: 600px;">       
                <div>
                    <h2>${i.name}</h2>
                    <p>${i.title}</p>
                    <a href=${i.url} class="selectClass" target="_blank">
                    <img src=${i.imgScr} alt="" width="300px" height="300px">
                    <br/>
                    know more
                    </a>

                </div>
            </div>
        </div>`;
  }

  boxbox.innerHTML = str;
}

window.onload = () => genBox(data);