//variável dos sprites
var runner;
var solo;
var cloud;
var rock;

//variável dos grupos
var cloudsGroup;
var rocksGroup;

//sprite do collide pro corredor
var invisible_solo;

//imagens dos sprites
var runner_image;
var solo_image;
var cloud_image;
var rock_image;

//estados de jogo
var game_state = JOGAR
var JOGAR = 1;
var FIM = 0;


function preload(){
    runner_image = loadAnimation("running1.png", "running2.png", "running3.png");
    
    solo_image = loadImage("solo.png");
    cloud_image = loadImage("cloud.png");
    rock_image = loadImage("rock.png")
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    //cria os sprites
    runner = createSprite(width/600*50, height/200*160, width/600*20, height/200*50);
    runner.addAnimation("running", runner_image);
    runner.scale = 0.5;
    
    solo = createSprite(width/600*0, height/200*200, width/600*400, height/200*20);
    solo.addImage(solo_image);
    solo.scale = 1.6
    solo.velocityX = -5;

    //cria sprite do collide pro corredor
    invisible_solo = createSprite(width/600*200, height/200*200, width/600*400, height/200*5);
    invisible_solo.visible = false;

    //cria os grupos
    cloudsGroup = createGroup();
    rocksGroup = createGroup();
}

function draw() {
    background("lightblue");
    
    if (solo.x < 0) {
        solo.x = width/8
    }

    if (keyDown("space") && runner.y > 300) {
        runner.velocityY = -10
    }
    
    runner.velocityY = runner.velocityY + 0.5
    runner.collide(invisible_solo);

    createClouds();
    createRocks();
    drawSprites();
}

function createClouds() {

    if (frameCount % 60 === 0) {
        cloud = createSprite(width/600*601, height/200*150, width/600*40, height/200*10);
        cloud.addImage(cloud_image);
        cloud.velocityX = -5;
        cloud.lifetime = 200;
        cloud.y = Math.round(random(1, height/200*125));
        cloud.scale = 0.5;
        runner.depth = cloud.depth + 10;
        cloudsGroup.add(cloud);
    }
}

function createRocks() {
    if (frameCount % 60 === 0) {
        rock = createSprite(width/600*601, height/200*195, width/600*10, height/200*40);
        rock.addImage(rock_image);
        rock.velocityX = -5;
        rock.scale = 0.7;
        rock.lifetime = 200;
        rock.x = Math.round(random(50, 300));
        rocksGroup.add(rock);
    }
}