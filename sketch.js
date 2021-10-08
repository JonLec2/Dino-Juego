var imagendino, dino;
var imaenground
var imagensu
var suelo
var piso
var imanube
var imasol
var ima1, ima2, ima3, ima4;
var obstaculo1;
var PLAY=1
var END=0
var gameState=PLAY;
var nubesGroup;
var obstaculosGroup;
var score
var dinocollidedImg;
var gameoverImg, gameover;
var resetImg, reset;
var dia=1
var lunaImg, luna;
var agua

function preload(){
  imagendino=loadAnimation("trex_1.png","trex_2.png","trex_3.png")
  imagenground=loadImage("backgroundImg.png")
  imagensu=loadImage("ground.png")
  imanube=loadImage("cloud.png")
  imasol=loadImage("sun.png")
  ima1=loadImage("obstacle1.png")
  ima2=loadImage("obstacle2.png")
  ima3=loadImage("obstacle3.png")
  ima4=loadImage("obstacle4.png")
  dinocollidedImg=loadAnimation("trex_collided.png")
gameoverImg=loadImage("gameOver.png")
  resetImg=loadImage("restart.png")
  lunaImg=loadImage("luna.png")
  
}

function setup() {
createCanvas(600,200)

  
  dino=createSprite(100,110,10,10)
  dino.addAnimation("correr",imagendino)
  dino.scale=0.085
  
  suelo=createSprite(200,210,400,20)
  suelo.addImage("ground",imagensu)
  suelo.scale=0.4;
  suelo.x=width/2;
  suelo.velocityX=-4;
   
  piso=createSprite(300,188,600,10);
  piso.visible=false
  sol=createSprite(570,30,10,10)
  sol.addImage(imasol)
  sol.scale=0.2

  
  //Crea obstaculos y grupos dela nubes
  nubesGroup=createGroup();
  obstaculosGroup= createGroup();
  
dino.setCollider("circle",0,0,269);
  dino.debug=true
  score=0
  
  gameover=createSprite(300,100,10)
  gameover.addImage(gameoverImg);
  gameover.scale=0.8

  dino.addAnimation("collided", dinocollidedImg)
  
  
  reset=createSprite(300,150)
  reset.addImage(resetImg)
  reset.scale=0.08

}

function draw() {
if(dia===1){
  background(imagenground)
}
  if (dia===2){
    nocturno();
  }
  
  console.log(dino.y)
  text("Score: "+ score, 40,50);
  
  
  //Estado Play del juego
  if(gameState===PLAY){
    
    //velocidad
    suelo.velocityX=-(4 + score/400)
    
    //visibilidad
    gameover.visible=false
    reset.visible=false
    
    //suelo se mueva
    if(suelo.x<77){
    suelo.x=width/2;
    }
    
    //score
    score = score + Math.round(frameCount/60);
   
    //salto del dinosaurio
      if(keyDown("space") && dino.y>=100){
    dino.velocityY=-12
  }
  dino.velocityY=dino.velocityY+0.8
      
    
  //generar nubes  y obstaculos
    nubes();
obstaculos();
    
    //noche
  if(frameCount %  300===0){
    dia=2
    
  }
    
    if(obstaculosGroup.isTouching(dino)){
      gameState=END
    }
    
  }
  
  //Estado End del juego
  else if (gameState===END){
    
    
    suelo.velocityX=0
    nubesGroup.setLifetimeEach(-1);
obstaculosGroup.setLifetimeEach(-1);
    dino.velocityY=0
    nubesGroup.setVelocityXEach(0);
    obstaculosGroup.setVelocityXEach(0);
    dino.changeAnimation( "collided"  ,dinocollidedImg);
   
    
    //cambiar animación      
  
    
    gameover.visible=true
    reset.visible=true
  }

  
  if(mousePressedOver(reset)){
    resetear();
    
  }
  
  dino.collide(piso);
   
  dino.depth=suelo.depth
  dino.depth=dino.depth+1
  
console.log(frameCount)
  
  drawSprites();

}

function resetear(){
  gameState=PLAY
  gameover.visible=false
  reset.visible=false
  obstaculosGroup.destroyEach()
  nubesGroup.destroyEach()
  dino.changeAnimation("correr", imagendino)
  score=0
  
}




function nubes(){
  
if(frameCount % 80===0){
  nube=createSprite(600,100,20,20)
  nube.velocityX=-4
  nube.addImage(imanube)
  nube.scale=0.35
  nube.y=Math.round(random(10,100))
  dino.depth=nube.depth
  dino.depth=dino.depth+1
nube.lifetime=165
  
  //agregar al grupo
  nubesGroup.add(nube)
  
}
  
}

function obstaculos(){
  
  if (frameCount % 60===0){
    var obstaculo=createSprite(600,165,10,40);
  obstaculo.velocityX=-4
    obstaculo.velocityX=-(4+ score/400)
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstaculo.addImage(ima1);
              break;
      case 2: obstaculo.addImage(ima2);
              break;
    
      default: break;
    }
     
    obstaculo.scale=0.3
    obstaculo.lifetime=165;
 
    //agregar grupo
    obstaculosGroup.add(obstaculo)
  }
  
  
}


function nocturno(){
  background("black")
 luna=createSprite(500,50)
  luna.addImage(lunaImg);
sol.visible=false
  luna.scale=0.1
}



