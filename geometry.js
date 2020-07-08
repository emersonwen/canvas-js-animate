// Canvas setup
var canvas = document.getElementById('canvas4');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];  //Holds all randomized particle objects and to use to draw particles.
const numberOfParticles = 150;

// Get mouse position
const mouse = {
    x: null,
    y: null
};

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log(mouse.x, mouse.y);
});

setInterval(function() {
    mouse.x = undefined;
    mouse.y = undefined;
}, 200);

// Create particles
class Particle {
    constructor(x, y, size, color, weight) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.weight = weight;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 4, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    
    update() {
        this.size -= 0.07;
        if (this.size < 0) {
            this.x = (mouse.x + ((Math.random() * 25) - 10));
            this.y = (mouse.y + ((Math.random() * 20) - 10));
            this.size = (Math.random() * 5) + 9;
            this.weight = (Math.random() * 2) - 0.7;
        }
        this.y += this.weight; // This changes the y position of Particle based on weight.
        this.weight += 0.16;

        if (this.y > canvas.height - this.size) {
            this.weight *= -0.45;        
        } // If the y position hits the floor of the canvas, weight will be reduced to create bouncing effect.
    }
};

function init() {
    particleArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = (Math.random() * 10) + 2;
        let color = 'skyblue';
        let weight = 1;
        particleArray.push(new Particle(x, y, size, color, weight));
    };
};

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        // particleArray[i].draw();
    }
    lines();
    requestAnimationFrame(animate);
};

init();
animate();

function lines() {
    let opacityValue = 1;
    for(let a = 0; a < particleArray.length; a++){
        for(let b = a; b < particleArray.length; b++){
            let distance = ((particleArray[a].x - particleArray[b].x) * (particleArray[a].x - particleArray[b].x))
            +
            ((particleArray[a].y - particleArray[b].y) * (particleArray[a].y - particleArray[b].y));
            // distance = Math.sqrt(((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2)));
            if (distance < 2000){
                opacityValue = 1 - (distance/10000);
                ctx.strokeStyle = 'rgba(0,0,0' + opacityValue + ')';

                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                ctx.stroke();
            }
        }
    }
}