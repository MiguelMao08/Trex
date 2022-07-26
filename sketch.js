//variáveis globais
var trex, trex_running, edges;
var groundImage;
var solo, soloInvisível;

//pré-carregamento das imagens e sons
function preload()
{
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
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
  
}

//desenho e animação
function draw()
{
  //definir a cor do plano de fundo 
  background("lightgrey");
  
  //registrando a posição y do trex
  console.log(trex.y);
  
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

  //desenhar os sprites
  drawSprites();
}