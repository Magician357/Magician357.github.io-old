
function toggle_menu(){
    menuShowing=!menuShowing;
    if (menuShowing) {
        document.getElementById("menu").style.width="100%";
        document.getElementById("main").style.marginLeft="50vw";
    } else {
        document.getElementById("menu").style.width="0";
        document.getElementById("main").style.marginLeft="20px";
    }
}

var menuShowing = true;
toggle_menu();
// Infinite scroll for menu
var menu = document.querySelector(".menu");
var items = document.querySelectorAll(".menu-item");
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

function onLoad(){
    items.forEach(item => {
        let clone = item.cloneNode(true);
        menu.appendChild(clone);
        clone.classList.add("js-clone");
    })

    clones = menu.querySelectorAll(".js-clone");

    reCalc();

    menu.addEventListener('scroll', () => {
        window.requestAnimationFrame(scrollUpdate);
    }, false);

    window.addEventListener('resize', () => {
        window.requestAnimationFrame(reCalc);
    },false);
}

window.onload = onLoad()