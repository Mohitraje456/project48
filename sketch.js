
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameover, reset
var runningman, man, run1_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;


function preload(){
  runningman = loadAnimation ('run1.png','run2.png','run3.png','run4.png')

  run1_collided = loadAnimation("run2.png");
  backgroundImage = loadImage("ground2.jpg");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameoverImage = loadImage("gameOver.png")
  resetImage=loadImage("reset.png")
 s=loadSound("sound.wav");
 s1=loadSound("sliding.mp3")
  groundImage = loadImage("ground.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  

  ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundImage);
  ground.x = width/2
  ground.velocityX = -6
 


 man = createSprite(200,height-80,20,50);
 man.addAnimation("running", runningman);
 man.addAnimation("run1",run1_collided);
 man.scale = 1;

  invisibleGround = createSprite(200,height-70,400,10);
  invisibleGround.visible = false;
  
  gameover = createSprite(650,250,10,10);
  gameover.addImage("gameover",gameoverImage)
  gameover.scale = 0.5
  
  reset = createSprite(650,390,10,10)
  reset.addImage("reset",resetImage)
  reset.scale = 0.5
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  
  
 man.setCollider("circle",0,0,40);
  man.debug = false
  
  score = 0
}

function draw() {
  background(backgroundImage)
  //displaying score
  textSize(20);
  stroke("red");
  strokeWeight(4)
  text("S c o r e :  " + score, 100,50);
  
  
  console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
    
    gameover.visible=false
    reset.visible=false
    
    ground.velocityX = -(4+3*score/100);
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    
    
  
    if (ground.x < 300){
      ground.x = ground.width/2;
    }
    
    
    //jump when the space key is pressed
    if(keyDown("space")&& man.y >=500) {
        man.velocityY = -20;
        s.play();
    }
    
    //add gravity
    man.velocityY = man.velocityY + 0.9
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();

    
    
    if(obstaclesGroup.isTouching(man)){
        gameState = END;
        s1.play();
    }
    
  }
   else if (gameState === END) {
      //ground.velocityX = 0;
    
      reset.visible=true
      gameover.visible=true
     cloudsGroup.setLifetimeEach(-1);
     obstaclesGroup.setLifetimeEach(-1);
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     obstaclesGroup.destroyEach()
     cloudsGroup.destroyEach()
     man.changeAnimation("run1",run1_collided);
     man.velocityY=0;
     ground.velocityX=0;
     

     if(mousePressedOver(reset)){
      restart();
     }
  
   }
  
 
  //stop trex from falling down
  man.collide(invisibleGround);
  
  console.log(man.y)
  
  drawSprites();
}

function restart(){
  gameState =PLAY
  man.changeAnimation("running", runningman);
  score=0
}

function spawnObstacles(){
 if (frameCount % 70 === 0){
   var obstacle = createSprite(width-50,height-80,20,40);
   obstacle.velocityX = -8;
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
   obstacle.y=random(height-80,height-200)
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
   if (frameCount % 100 === 0) {
     cloud = createSprite(width-50,200,40,10);
    cloud.y = Math.round(random(10,200));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -4;
    
    
    //adjust the depth
    cloud.depth = man.depth;
    man.depth = man.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }
}




























