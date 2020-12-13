var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;

var survivalTime = 0;

var banana ,bananaImage,obstacle, obstacleImage;

var FoodGroup, obstacleGroup , bananaGroup ;

var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
createCanvas(400,400);
  
//creating monkey
  
monkey = createSprite(80,315,20,20);
monkey.addAnimation("moving",monkey_running);
monkey.scale = 0.1;  
  
ground = createSprite(400,350,900,10);
ground.velocityX = -4;
ground.x = ground.width/2;
console.log(ground.x);
  
bananaGroup = new Group ();  

obstacleGroup = new Group ();
 
score = 0;
  
}


function draw() {

background(225);
  
stroke ("white");
textSize(20);  
fill("white");
text("score :" + score ,500,50);
  
stroke ("black");
textSize(20);
fill("black");
survivalTime = Math.ceil(frameCount/frameRate());
text ("Survival Time : " + survivalTime ,100,50);  
  
if(gameState === PLAY){

//scoring
  
score = score + Math.round(getFrameRate()/60);
    
if(score>0 && score%100 === 0){
        }

//jump when the space key is pressed
  
if(keyDown("space")) {
monkey.velocityY = -12;
  } 

//add gravity
  
monkey.velocityY = monkey.velocityY + 0.8;
  
monkey.collide(ground);

if(bananaGroup.isTouching(monkey) || monkey.y>400){ banana.destroy(); 
 
}

food();
  
obstacle(); 
  
if(obstacleGroup.isTouching(monkey)){
ground.velocityX = 0;
monkey.velocityY = 0; 
obstacleGroup.setVelocityXEach(0);
bananaGroup.setVelocityXEach(0);
obstacleGroup.setLifetimeEach(-1);
bananaGroup.setLifetimeEach(-1);
  
  }
  
}
  
if (ground.x < 0){
ground.x = ground.width/2;
  }  


  
drawSprites();  
  
}
  

  
 
    

function food(){
  
if (frameCount % 80 === 0) {
banana = createSprite(200,150,40,10);
banana.y = Math.round(random(120,200));
banana.addImage(bananaImage);
banana.scale = 0.1;
banana.velocityX = -3;
banana.lifetime = 800;
bananaGroup.add(banana);
   
  }
  
}

function obstacle(){
if (frameCount % 300 === 0){
var obstacle = createSprite(300,326,10,40);
obstacle.addImage(obstacleImage);  
obstacle.velocityX = -3;
obstacle.scale = 0.1;
obstacle.lifetime = 800;
obstacleGroup.add(obstacle);
} 
}  
  