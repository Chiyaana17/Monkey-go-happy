
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var x,y;
var gamestate;
var gon;
function bg (sprite1,sprite2,bgroup){
 sprite2.remove() 
}
function preload(){
  ma = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png",
  "sprite_7.png", "sprite_8.png" )
  m=loadAnimation("sprite_0.png")
  bananaImage = loadImage("b.png");
  obstaceImage = loadImage("obstacle.png");
 bi = loadImage ("Forest.jpg")
  go = loadImage("pngegg.png")
}
function food(){
if (frameCount%80==0){
var banana = createSprite (800,Math.round(random(120,200)),10,20)
banana.velocityX=-4
  banana.addImage (bananaImage)
  banana.scale=0.25
  banana.lifetime=625
  foodgroup.add(banana)
}
}
function obstacle(){
if (frameCount%300==0){
var ob = createSprite (800,560,10,20)
ob.velocityX=-4
 ob.addImage (obstaceImage)
  ob.scale=0.15
  ob.lifetime=625
  ob.debug=true
  ob.setCollider("rectangle",0,0,350,350)
  egroup.add(ob)
}
}

function setup() {
  createCanvas(800,600)
monkey = createSprite(100,500,10,20)  
  monkey.addAnimation ("running",ma)
  monkey.addAnimation("dead",m)
  monkey.scale=0.25
  ground = createSprite(width/2,590,width,20)
  ground.visible=false
   gon = createSprite (400,300,10,20)
  gon.scale=0.7
    gon.visible=false
  x=0;
  y=width
  score=0;
  gamestate="play"
  foodgroup = new Group()
  egroup=new Group()
}


function draw() {
background(0)
image(bi,x,0,width,height)
image(bi,y,0,width,height)
  if (gamestate=="play"){
  x=x-3
  y=y-3
  if (x<=-width){
    x=width
  }
  if (y<=-width){
    y=width
  }
  food()
  obstacle()
    
  if (monkey.overlap(foodgroup,bg)){
    score=score+1
  }
    
    console.log(gon.visible)
  if (keyDown("space")&&monkey.y>460){
    monkey.velocityY=-18
  }
  monkey.velocityY=monkey.velocityY+0.5
   if (monkey.overlap(egroup)){
   gamestate="end"  
   } 
  }
  if (gamestate=="end"){
  gon.addImage(go)
    gon.visible=true
    console.log(gon.visible)
  foodgroup.setVelocityXEach(0) 
    egroup.setVelocityXEach(0)
    monkey.changeAnimation("dead")
    foodgroup.setLifetimeEach(-1)
    egroup.setLifetimeEach(-1)
    monkey.velocityY=0
    if (mousePressedOver(gon)){
      score=0
      foodgroup.destroyEach()
      egroup.destroyEach()     
      monkey.changeAnimation("running")
      gon.visible=false
    gamestate ="play" 
    }
  }
  monkey.collide(ground)
drawSprites() 
  fill ("black")
  textSize(20)
  text ("Score:"+score,700,50)
}






