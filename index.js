const menuObj=document.getElementById("menu"); // Cache the main and menu objects
const mainObj=document.getElementById("main");

function toggle_menu(){ // For the open and close button
    menuShowing=!menuShowing;
    if (menuShowing) {
        menuObj.style.width="100%";
        mainObj.style.marginLeft="50vw";
    } else {
        menuObj.style.width="0";
        mainObj.style.marginLeft="20px";
    }
}

var menuShowing = true;
toggle_menu();

// Infinite scroll for menu
// Thanks to https://youtu.be/6qf3_KAAVQA
const menu = document.querySelector(".menu");
const items = document.querySelectorAll(".menu .menu-item");
var clones = [];
var disableScroll = false;
var scrollHeight = 0;
var scrollpos = 0;
var clonesHeight = 0;

function getClonesHeight(){
    clonesHeight=0;
    clones.forEach(clone => {
        clonesHeight += clone.offsetHeight;
    })
    return clonesHeight;
}

// Recalculate dimensions on screen resize
function reCalc(){
    scrollpos = menu.scrollTop;
    scrollHeight = menu.scrollHeight;
    clonesHeight = getClonesHeight();

    if(scrollpos <= 0){
        menu.scrollTop=1;
    }
}

function scrollUpdate(){
    if (menuShowing){
        if(!disableScroll){
            scrollpos = menu.scrollTop;
            if (clonesHeight+scrollpos >= scrollHeight){
                menu.scrollTop=1;
                disableScroll=true;
            }else if (scrollpos <= 0) {
                menu.scrollTop=scrollHeight-clonesHeight;
            }
        }
        if (disableScroll) {
            window.setTimeout(() => {
                disableScroll=false;
            }, 40);
        }
}}

function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

function onLoad() {
    const fragment = document.createDocumentFragment(); // use a document fragment for appending clones
    items.forEach((item) => {
        const clone = item.cloneNode(true);
        fragment.appendChild(clone);
        clone.classList.add("js-clone");
    });

    menu.appendChild(fragment); // append the fragment to the DOM in one operation

    clones = menu.querySelectorAll(".js-clone");

    reCalc();
    
    // debounce the events
    menu.addEventListener(
        "scroll",
        debounce(() => {
            window.requestAnimationFrame(scrollUpdate);
        }, 10)
    );
    
    window.addEventListener(
        "resize",
        debounce(() => {
            window.requestAnimationFrame(reCalc);
        }, 10)
    );
}

window.onload = onLoad()

// Cool on scroll animations
// Special thanks to Fireship (https://youtu.be/T33NN_pPeNI)
const hiddenElements = document.querySelectorAll('.hidden')

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
});

hiddenElements.forEach((el) => observer.observe(el));

// Warning for mobile devices
window.onload=function(){
    var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
    if (mobile) {
        alert("Please use a computer for the best view");              
    }
}