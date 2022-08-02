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
//pré-carregamento das imagens e sons
function preload()
{
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  nuvemImage = loadImage("cloud.png")
  cactoImage1 = loadImage("obstacle1.png");
  cactoImage2 = loadImage("obstacle2.png");
  cactoImage3 = loadImage("obstacle3.png");
  cactoImage4 = loadImage("obstacle4.png");
  cactoImage5 = loadImage("obstacle5.png");
  cactoImage6 = loadImage("obstacle6.png");
}

function setup()
{
  //criando a tela do jogo
  createCanvas(600,200);
  
  //criando o trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);

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
}

//desenho e animação
function draw()
{

  //gerando números aleatórios
  var aleatório = Math.round(random(1,60));
  //console.log(aleatório);
  console.log(frameCount)


  //definir a cor do plano de fundo 
  background("white");
  
  //registrando a posição y do trex
  //console.log(trex.y);
  
  //pular quando tecla de espaço for pressionada
  if(keyDown("space") && trex.y >=160)
  {
    trex.velocityY = -10;
  }
  
  //gravidade para o trex
  trex.velocityY = trex.velocityY + 0.5;

  //velocidade do solo
  solo.velocityX = -1
  //console.log(solo.x);

  //reinicio do solo
  if(solo.x < 0)
  {
    solo.x = width

  }
  //impedir que o trex caia
  trex.collide(soloInvisível);

  //chamada da função que gera nuvens
  gerarNuvens();
  gerarCactos();

  //desenhar os sprites
  drawSprites();
  //pontuacao
  poin+=Math.round(frameCount/60)
  text (" pontos "+poin,50,50)
}

function gerarNuvens()
{
  if(frameCount%60==0){
  var nuvem = createSprite(600,50,40,10);
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
    cacto.velocityX = -2;
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

  
