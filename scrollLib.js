let yPolScreen = window.scrollY || 0;

let xPolMouse = 0;
let yPolMouse = 0;

let windowsWidth = window.innerWidth;
let windowsWidthMiddle = window.innerWidth / 2;
let windowsHeight = window.innerHeight;
let windowsHeightMiddle = window.innerHeight / 2;

console.log("windowsWidth(X): ",windowsWidth)
console.log("windowsHeight(Y)" , windowsHeight)

//const moveObj = document.getElementsByClassName("smallBox");
const moveObj = document.getElementById("moveObj");

document.addEventListener('scroll', (e) => { // Scroll handler
    yPolScreen = parseInt(window.scrollY.toFixed(0));
    console.log(yPolScreen); //** 
})

document.addEventListener('mousemove', (e) => { // Mouse Pol handler
    xPolMouse = e.pageX;
    yPolMouse = e.pageY;
    
    const offset = 2; // move angle max / min
    let preX = (xPolMouse - windowsWidthMiddle) / (windowsWidthMiddle) // left (+) right (-)
    let preY = (yPolMouse - windowsHeightMiddle) / (windowsHeightMiddle) 

    moveObj.style.left = `${(preX * offset )}%`;
    moveObj.style.bottom = `${(preY * offset * 5)}px`;

})

window.addEventListener('resize', (e) => { // resize handler
    windowsWidth = window.innerWidth;
    windowsWidthMiddle = window.innerWidth / 2;
    windowsHeight = window.innerHeight;
    windowsHeightMiddle = window.innerHeight / 2
})

//type.js
var typed = new Typed('#typed', {
    stringsElement: '#typed-strings',
    backSpeed: 25,
    typeSpeed: 25,
    backDelay: 2200,
    loop: true,
});

//vanta.js
VANTA.DOTS({
    el: "#boxInside",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x207bff,
    color2: 0x207bff
})