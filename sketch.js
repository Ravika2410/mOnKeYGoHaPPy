var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaImage;
var go,goImage;
var score=0;
var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png",
  "Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png",
  "Monkey_09.png","Monkey_10.png");
  bananaImage=loadImage("banana.png");
  stoneImage=loadImage("stone.png");
  goImage=loadImage("gameOver.png");
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
  player.visible=false;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  go=createSprite(width/2,height/2);
  go.addImage(goImage);
  go.visible=false;
  
  foodGroup=new Group();
  obsGroup=new Group();

}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
    player.visible=true;
    
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spawnFood();
    spawnObs();
  
    if(foodGroup.isTouching(player))
    {
      foodGroup.destroyEach();
      score=score+1;
      player.scale=player.scale+0.05;
    }

    if(obsGroup.isTouching(player))
    {
      gameState=END;
    }

  } else if(gameState===END)
    {
      foodGroup.destroyEach();
      obsGroup.destroyEach();
      player.visible=false;
      backgr.velocityX=0;
     go.visible=true;

    }

 

  drawSprites();

  textSize(20);
  fill("white");
  text("Score: "+score,700,100);
}

function spawnFood()
{
  if(frameCount%100===0)
  {
    var banana=createSprite(600,random(120,200),40,10);
    banana.addImage(bananaImage);
    banana.scale=0.05;
    banana.velocityX=-4;
    banana.lifetime=300;
    player.depth=banana.depth+1;
    foodGroup.add(banana);
  
  }
}

function spawnObs()
{
  if(frameCount%160===0)
  {
    var stone=createSprite(500,320);
    stone.addImage(stoneImage);
    stone.scale=0.2;
    stone.velocityX=-4;
    stone.lifetime=300;
    player.depth=stone.depth+1;
    obsGroup.add(stone);
  
  }
}