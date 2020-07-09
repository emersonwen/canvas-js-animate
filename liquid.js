const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})

class Button {
    constructor(x, y, width, height, baseX) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.baseX = baseX;
    }
    update() {
        let directionX = 2.2;
        if ((mouse.x < this.x + this.width &&
            mouse.x > this.x &&
            mouse.y < this.y + this.height &&
            mouse.y > this.y
            ) && (this.x > this.baseX - 50)) //Conditional on collision detection and button position. 
            {
                //Animate button to the left. 

        } else if (not colliding with mouse and button is out of base position) {

        }
    }
}