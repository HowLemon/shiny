window.mousePos = { x: 0, y: 0 }; // percentage, relative to screen center
const ticketElement = document.getElementById("ticket");
const reflectiveElemets = document.querySelectorAll(".reflective");

function animation() {
    requestAnimationFrame(animation);
    ticketElement.style.transform = `rotateX(${mousePos.y * -30}deg)
    rotateY(${mousePos.x * 30}deg)`;
    reflectiveElemets.forEach((el) => {
        el.style.backgroundPosition = `
        ${mousePos.x * parseFloat(el.dataset.xScale || 10) + 50 + parseFloat(el.dataset.xOffset || 0)}% ${-mousePos.y *parseFloat(el.dataset.yScale || 10) + 50 + parseFloat(el.dataset.yOffset || 0)}%, 0 0`;
    });
}

document.body.addEventListener("mousemove", (ev) => {
    mousePos.x = ev.clientX / window.innerWidth - 0.5;
    mousePos.y = ev.clientY / window.innerHeight - 0.5;
});

animation();
