//variáveis globais
var trex, trex_running, edges;
var groundImage;
var solo, soloInvisível;
var nuvemImage;
var cactoImage1;
var cactoImage2;
var cactoImage3;
var cactoImage4;
var cactoImage5;
var cactoImage6;
var poin= 0;
var cactos, nuvens;
var INICIO=0;
var JOGANDO=1;
var FIM=2;
var gameState=INICIO;
var trex_collided;
var gameOver, restart;
var imagemGameOver, imagemRestart;
var som1, som2, som3;
var ptero,ptero_fly;
var pteros;
//pré-carregamento das imagens e sons
function preload()
{
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  nuvemImage = loadImage("cloud.png");
  cactoImage1 = loadImage("obstacle1.png");
  cactoImage2 = loadImage("obstacle2.png");
  cactoImage3 = loadImage("obstacle3.png");
  cactoImage4 = loadImage("obstacle4.png");
  cactoImage5 = loadImage("obstacle5.png");
  cactoImage6 = loadImage("obstacle6.png");
  imagemGameOver = loadImage("gameOver.png");
  imagemRestart = loadImage("restart.png");
  trex_collided = loadAnimation("trex_collided.png");
  som1 = loadSound("jump.mp3");
  som2 = loadSound("checkPoint.mp3");
  som3 = loadSound("die.mp3");
  ptero_fly = loadImage("ptero.png",);
  
}

function setup()
{
  //criando a tela do jogo
  createCanvas(600,200);
  
  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.setCollider("rectangle",0,0,95,50);
  trex.debug=false;
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);

  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50

  //criando o solo
  solo = createSprite(300,180,600,10);
  solo.addImage(groundImage);

  //criando um solo invisível
  soloInvisível = createSprite(50,190,50,10);
  soloInvisível.visible = false;
  
  //gerando números aleatórios
  var aleatório = Math.round(random(1,61));
  console.log(aleatório);
  //criando os grupos
  cactos=new Group ();
  nuvens=new Group ();
  pteros=new Group ();
  //Colocando as imagens restart e gameOver
  gameOver = createSprite(300,100);
  gameOver.addImage(imagemGameOver);
  gameOver.scale =0.5;
  gameOver.visible=false;
  restart = createSprite(300,150);
  restart.addImage(imagemRestart);
  restart.scale = 0.5;
  restart.visible=false;
}

//desenho e animação
function draw()
{ 
  //definir a cor do plano de fundo 
  background("white");
  if(gameState==INICIO)
  {
  text("aperte space para começar",300,100 )
  if(keyDown("space"))
  {
  gameState=JOGANDO
  }
  }
  else if (gameState==JOGANDO)
  {
   //pular quando tecla de espaço for pressionada
   if(keyDown("space") && trex.y >=160)
   {
     trex.velocityY = -10.5;
     som1.play();
    // trex.y = cactos
   }
   
   //gravidade para o trex
   trex.velocityY = trex.velocityY + 0.3;
 
   //velocidade do solo
   solo.velocityX = -4-2*poin/100;
   //console.log(solo.x);
 
   //reinicio do solo
   if(solo.x < 0)
   {
     solo.x = width
 
   }
   //chamada da função que gera nuvens e cactos
  gerarNuvens();
  gerarCactos();
  //pontuacao
  poin+=Math.round(getFrameRate()/60);
  if(cactos.isTouching(trex)||pteros.isTouching(trex))
  {
    gameState=FIM
    som3.play()
    //trex.velocityY = -10.5;
  }
  if (poin%1000 ==0&&poin>0)
  {
    som2.play()
  }
  //alerar fundo da tela
  if(poin>=100)
  {
    background("black");
    gerarPteros();
  }
  }//jogando
  else//estado do jogo fim 
  {
  cactos.setVelocityXEach(0);
  nuvens.setVelocityXEach(0);
  pteros.setVelocityXEach(0);
  solo.velocityX=0;
  nuvens.setLifetimeEach(-1);
  cactos.setLifetimeEach(-1);
  pteros.setLifetimeEach(-1);
  trex.changeAnimation("collided",trex_collided);
  gameOver.visible=true;
  restart.visible=true;
  trex.velocityY = 0;
  if(mousePressedOver(restart))
  {
  reset()
  }

  }
 
  //impedir que o trex caia
  trex.collide(soloInvisível);

  //desenhar os sprites
  drawSprites();
  text (" pontos "+poin,50,50);
}

function gerarNuvens()
{
  if(frameCount%60==0){
  var nuvem = createSprite(600,50,40,10);
  nuvens.add(nuvem);
  nuvem.velocityX = -3;
  nuvem.addImage(nuvemImage);
  trex.depth =nuvem.depth +1;
  console.log(trex.depth);
  console.log(nuvem.depth);
  nuvem.y = Math.round(random(10,60));
  nuvem.lifetime = 220;
}
}

function gerarCactos()
{
  if(frameCount%90==0)
  {
    var cacto = createSprite(600,180);
    cactos.add(cacto)
    cacto.velocityX = -6-poin/100;
    cacto.scale = 0.5;
    var numero = Math.round(random(1,6));
    switch(numero)
    {
      case 1:cacto.addImage(cactoImage1);
      break;
      case 2:cacto.addImage(cactoImage2);
      break;
      case 3:cacto.addImage(cactoImage3);
      break;
      case 4:cacto.addImage(cactoImage4);
      break;
      case 5:cacto.addImage(cactoImage5);
      break;
      case 6:cacto.addImage(cactoImage6);
      break;
      default:break;
    }
    cacto.lifetime = 310;
  }
}

function reset()
{
  gameState=INICIO
  cactos.destroyEach();
  nuvens.destroyEach();
  pteros.destroyEach();
  poin=0;
  trex.changeAnimation("running", trex_running);
  restart.visible = false;
  gameOver.visible = false;
}
function gerarPteros()
{
  if(frameCount%100==0)
  {
  var ptero = createSprite(600,180);
  pteros.add(ptero);
  ptero.velocityX = -6-poin/100;
  ptero.addImage("ptero",ptero_fly);
  ptero.lifetime = 310;
  }
}  
