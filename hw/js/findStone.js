// html dom box that occur cards
const boxbox = document.getElementById("boxbox");

// html input box
const input1 = document.getElementById("input1");

// your data places
let data = [
  { name: "Apple", title: "so good"},
  { name: "Orange", title: "so good"},
  { name: "Pear" , title: "so good"},
  { name: "Sushi", title: "so good"},
  { name: "Cat", title: "so good"},
  { name: "Dog", title: "so good"},
];

// active function when user type on the input box
input1.addEventListener("input", () => {
  input1.value.length == 0 || input1.value === undefined ? genBox(data) : genBox( getData(input1.value) );
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
            <div style="width: 300px;">       
                <div>
                    <h2>${i.name}</h2>
                    <p>${i.name}</p>
                    <a href="#" class="selectClass" >Go somewhere</a>
                </div>
            </div>
        </div>`;
  }

  boxbox.innerHTML = str;
}

genBox(data);
