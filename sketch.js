var trex, trex_running, edges;
var groundImage;
var solo

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
}

function setup(){
  createCanvas(600,200);
  
  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  solo = createSprite(300,200,600,10)
  solo.addImage(groundImage)
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
}


function draw(){
  //definir a cor do plano de fundo 
  background("lightgrey");
  
  //registrando a posição y do trex
  console.log(trex.y)
  
  //pular quando tecla de espaço for pressionada
  if(keyDown("space")){
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.5;
  solo.velocityX = -1
  console.log(solo.x)
  if(solo.x < 0){
    solo.x = width

  }
  
 //impedir que o trex caia
  trex.collide(solo)
  drawSprites();
}