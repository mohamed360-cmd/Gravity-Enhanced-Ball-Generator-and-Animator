const canvas = document.getElementById("CanvasMain");
const noBallsGenerate = document.getElementById("noBallsGenerateValue").value
const generateButton = document.getElementById("generateBtn")
var noOffBalls = 50 //this is the default value number of balls to be genrated 
generateButton.onclick = ()=>{
    if(noBallsGenerate<800 ){
        noOffBalls = noBallsGenerate
        animation()
    
    }else{
        alert("Warning value is greater than 800 change the code to be able to do that ")
    }
    
}
canvas.width = Math.floor(innerWidth);
canvas.height = Math.floor(innerHeight);
const ctx = canvas.getContext("2d");

var mousePostion = {
    x : undefined,
    y: undefined,
}
window.addEventListener("mousemove",(event)=>{
    mousePostion.x = event.x;
    mousePostion.y = event.y;

})
var colorArray = [
    "#00A9FF",
    "#89CFF3",
    "#A0E9FF",
    "#CDF5FD",
    "#FAF2D3",
    
]
function drawLine(mX,mY,cX,cY,color,thickness=2){
    ctx.beginPath()
    ctx.moveTo(mX,mY)
    ctx.lineTo(cX,cY)
    ctx.strokeStyle = color
    ctx.lineWidth = thickness
    ctx.stroke()
}
class Circle{
    constructor(x,y,radius,dx,dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.startAngle = 0;
        this.FullCircle = 2 * Math.PI;
        this.dx = dx;
        this.dy = dy; //this is the velocity of the circle in the y direction
        this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
    }
     draw() {
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,this.startAngle,this.FullCircle)
        ctx.strokeStyle = "black"
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.stroke()
    }
    update(){
        if(this.x +this.radius > innerWidth - this.radius || this.x <= 0  ){

           this.dx = -this.dx 
        }else{
            this.dx -= this.dx*0.9
        }
        if(this.y + this.radius >  innerHeight - this.radius || this.y <= 0){
            this.dy = -this.dy * 0.9
        }else{
            this.dy +=1
        }
        this.x += this.dx;
        this.y += this.dy
         this.draw()
         if(mousePostion.x - this.x < 100  && mousePostion.x - this.x > -100 && mousePostion.y - this.y < 100  && mousePostion.y - this.y > -100){
            drawLine(mousePostion.x,mousePostion.y,this.x,this.y,this.color)

         }

    }
     
}
var circleArray = [];
for(var i = 0; i< noOffBalls; i++) {
    var radius = Math.floor(Math.random() * 50)
    var xCoordinate  = Math.random() * (innerWidth - 2 * radius) + radius;
    var yCoordinate = Math.random() * (innerHeight - 2 * radius) + radius;
    
    var dx = (Math.random() - 0.5) *10; //this is the speed in the x axis 
    var dy = (Math.random() - 0.5) * 10; //this is a random speed either in the negative or the postive diretion in the y axis 
    circleArray.push( new Circle(xCoordinate,yCoordinate,radius,dx,dy))
    console.log(circleArray)
}


const animation = ()=>{
    ctx.clearRect(0,0,innerWidth,innerHeight)
    circleArray.forEach(circle => {
        circle.update()
    });
    requestAnimationFrame(animation)
}
animation()