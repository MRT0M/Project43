var backImage,backgr;
var player, player_running;
var ground,ground_img;

var gameOver

var END =0;
var PLAY =1;
var gameState = PLAY;


function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(400,200,100,50);
  gameOver.addImage(gameOverImg);
  gameOver.visible=false;

  bananaGroup = new Group();
  rockGroup = new Group();

  score = 0;
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    Banana();
    Rock();
  }

  else if(gameState===END){
    bananaGroup.setLifetimeEach(-1)
    rockGroup.setLifetimeEach(-1)

    backgr.velocityX=0;

    bananaGroup.destroyEach()
    rockGroup.destroyEach()
    player.visible=false;

    gameOver.visible=true;
  }

  drawSprites();
  textSize(24);
  fill('red');
  text("Score: "+score, 50, 50)
}

function Banana(){
  if(frameCount%150===0){
    var banana = createSprite(800, random(200, 150), 10, 10);
    banana.addImage(bananaImg);
    banana.velocityX = -4;
    banana.lifetime = 200;
    banana.scale = 0.05;
    bananaGroup.add(banana);
  }

  if(player.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    player.scale += + 0.1;   
    score += 2;
  }
}

function Rock(){
  if(frameCount%75===0){
    var stone = createSprite(800, 340, 10, 10)
    stone.addImage(stoneImg);
    stone.velocityX = -4;
    stone.lifetime = 200;
    stone.scale = 0.2;
    rockGroup.add(stone);
  }

  if(player.isTouching(rockGroup)){
    gameState=END;
  }
}