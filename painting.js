// Canvas setup
var canvas = document.getElementById('canvas3');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];  //Holds all randomized particle objects and to use to draw particles.
const numberOfParticles = 100;

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
            this.x = (mouse.x + ((Math.random() * 30) - 10));
            this.y = (mouse.y + ((Math.random() * 20) - 10));
            this.size = (Math.random() * 30) + 12;
            this.weight = (Math.random() * 2) - 0.7;
        }
        this.y += this.weight; // This changes the y position of Particle based on weight.
        this.weight += 0.12;

        if (this.y > canvas.height - this.size) {
            this.weight *= -0.75;        
        } // If the y position hits the floor of the canvas, weight will be reduced to create bouncing effect.
    }
};

function init() {
    particleArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let size = (Math.random() * 25) + 20;
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
        particleArray[i].draw();
    }
    requestAnimationFrame(animate);
};

init();
animate();
