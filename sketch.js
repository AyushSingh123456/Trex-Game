var trex, trex_running, trex_collided;
var ground, ground_image, invisible_ground
var cloud,cloud_image,cloudsGroup
var obstacleGroup, ob1, ob2, ob3, ob4, ob5, ob6
var count = 0 
var play = 1
var end = 0 
var Gamestate = play
var gameover, restart, gameOver_image, restart_image
localStorage ["highScore"] = 0
var HIGHSCORE=0

function preload() {
  trex_running=loadAnimation("trex1.png","trex3.png", "trex4.png")
  trex_collided=loadAnimation("trex_collided.png")
  ground_image=loadImage("ground2.png")
  cloud_image=loadImage("cloud.png")
  ob1=loadImage("obstacle1.png")
  ob2=loadImage("obstacle2.png")
  ob3=loadImage("obstacle3.png")
  ob4=loadImage("obstacle4.png")
  ob5=loadImage("obstacle5.png")
  ob6=loadImage("obstacle6.png")
  gameOver_image=loadImage("gameOver.png")
  restart_image=loadImage("restart.png")
}


function setup() {
  
  createCanvas(600, 200);
  trex = createSprite(60,180,20,60);
  trex.addAnimation("running",trex_running)
  trex.addAnimation("trex_collided",trex_collided)
  trex.scale=0.5
  ground=createSprite(300,180,600,20)
  ground.addImage("ground", ground_image)
  invisible_ground=createSprite(300,190,600,20)
  invisible_ground.visible = false
  ground.velocityX = -4
  cloudsGroup = new Group()
  obstacleGroup = new Group()

  gameover = createSprite(300,100);
restart = createSprite(300,140);
  gameover.addImage("gameover", gameOver_image)
  restart.addImage("restart", restart_image)
  gameover.scale = 0.5
  restart.scale = 0.5
restart.visible = false
  gameover.visible = false
  
  
}


function draw() {
  background(180);
  trex.collide(invisible_ground)
  
  if (HIGHSCORE==1){
text("High Score: " + localStorage["highScore"], 400, 50);
  }
  if (Gamestate == play){
    
  if (trex.isTouching(obstacleGroup)){
      Gamestate=end
  }
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  if(keyDown("space") && trex.y >= 135){
      trex.velocityY = -12 ;
  }
  trex.velocityY = trex.velocityY + 0.8;
  spawnClouds()
  spawnObstacles()
  
  if (frameCount%10==0){
    count=count+1
}
    
  }
  else if (Gamestate == end){
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    gameover.visible = true;
    restart.visible = true;
    
    //change the trex animation
    trex.changeAnimation("trex_collided", trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if (mousePressedOver(restart)) {
      reset();
    
  }
  }

  text("Score: "+ count, 500, 50);
 
  drawSprites()
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 == 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud",cloud_image);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = ground.velocityX;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage("obstacle1",ob1)
        break;
        case 2:obstacle.addImage("obstacle2",ob2)
        break;
        case 3:obstacle.addImage("obstacle3",ob3)
        break;
        case 4:obstacle.addImage("obstacle4",ob4)
        break;
        case 5:obstacle.addImage("obstacle5",ob5)
        break;
        case 6:obstacle.addImage("obstacle6",ob6)
        break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 200;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}

function reset() {
  Gamestate = play;
  trex.changeAnimation("running",trex_running);
  obstacleGroup.destroyEach();
  cloudsGroup.destroyEach();
  ground.velocityX = -6;
  gameover.visible = false;
  restart.visible = false;
  if (localStorage["highScore"] < count){
      localStorage["highScore"] = count
  }
  console.log(localStorage["highScore"]) 
  count = 0;
  HIGHSCORE = 1
  

}
