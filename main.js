window.mousePos = { x: 0, y: 0 }; // percentage, relative to screen center
const ticketElement = document.getElementById("ticket");
const reflectiveElemets = document.querySelectorAll(".reflective");
const requestPermissionBtn = document.querySelector("button#permission");


const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
function animation() {
    requestAnimationFrame(animation);
    ticketElement.style.transform = `rotateX(${mousePos.y * -30}deg)
    rotateY(${mousePos.x * 30}deg) `;
    reflectiveElemets.forEach((el) => {
        el.style.backgroundPosition = `
        ${mousePos.x * parseFloat(el.dataset.xScale || 10) + 50 + parseFloat(el.dataset.xOffset || 0)}% ${
            -mousePos.y * parseFloat(el.dataset.yScale || 10) + 50 + parseFloat(el.dataset.yOffset || 0)
        }%, 0 0`;
    }); 
}

document.body.addEventListener("mousemove", (ev) => {
    mousePos.x = ev.clientX / window.innerWidth - 0.5;
    mousePos.y = ev.clientY / window.innerHeight - 0.5;
});

document.addEventListener("touchmove", (ev)=>{
    // ev.preventDefault();
    const touches = ev.changedTouches;
    if(touches[0]){
        const touch = touches[0];
        mousePos.x = touch.clientX / window.innerWidth - 0.5;
        mousePos.y = touch.clientY / window.innerHeight - 0.5;
    }
});

animation();

requestPermissionBtn.addEventListener("click",async (e)=>{
    e.preventDefault();
    if (window.DeviceOrientationEvent && typeof DeviceMotionEvent.requestPermission === "function") {
        console.log("requesting");
        await window.DeviceMotionEvent.requestPermission();
    }else{
        console.log("no event?");
    }
    console.log("jello")
    initOrientation();
})

function initOrientation(){
    if (window.DeviceOrientationEvent) {
        window.addEventListener(
            "deviceorientation",
            (event) => {
                const frontToBack = event.beta; // alpha: rotation around z-axis
                const leftToRight = event.gamma; // gamma: left to right
                mousePos.y = clamp(frontToBack/90,0,1) - 0.5;
                mousePos.x = clamp((leftToRight+20)/40,0,1)-0.5;
            },
            true
        );
        requestPermissionBtn.classList.add("hidden");
    }
}

window.addEventListener("load", async () => {
    console.log("hello")
    if (window.DeviceOrientationEvent) {
        if(!typeof DeviceMotionEvent.requestPermission === "function"){
            initOrientation()
        }else{
            requestPermissionBtn.classList.remove("hidden");
            
        }
    }else{
        console.log("no event?");
    }
});


