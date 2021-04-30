var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var feedButton, addFoodButton;
var fedTime, lastFed;
var foodObj;
var gameState, readState;
var bedroom, garden, washroom;
var currentTime;

function preload(){
   dogImg=loadImage("images/dogImg.png");
   dogImg1=loadImage("images/dogImg1.png");
   bedroom = loadImage("images/Bed Room.png");
   garden = loadImage("images/Garden.png");
   washroom = loadImage("images/Wash Room.png")
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 

  foodObj = new Food;

  feedButton = createButton("Feed");
  feedButton.position(700,95);
  feedButton.mousePressed(feedDog);

  addFoodButton = createButton("Add Food");
  addFoodButton.position(530,95);
  addFoodButton.mousePressed(addFood)

  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  })
}

// function to display UI
function draw() {
  background(46,139,87);

  foodObj.display();
  foodObj.getFoodStock();

  currentTime = hour();
  if(currentTime === (lastFed + 1)){
    update("Playing");
    foodObj.garden();
  }else if(currentTime === (lastFed + 2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime > (lastFed + 2) && currentTime <=(lastFed+4)){
    update("Bathing")
    foodObj.washroom();
  }else{
    update("Hungry");
    foodObj.display();
  }

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
    text("Last Fed: " + lastFed,130,10,300,20);
})

  

  if(gameState != "Hungry"){
    feedButton.hide();
    addFoodButton.hide();
    dog.remove();
  }else{
    feedButton.show();
    addFoodButton.show();
    dog.addImage(dogImg);
  }
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}

function addFood(){

  foodObj.foodStock += 1
   
  database.ref('/').update({
    Food:foodObj.foodStock
  })
}

function feedDog(){   
  database.ref('/').update({
    Food:foodObj.foodStock-1,
    FeedTime:hour()
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}

function readGameState(){
  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  })
}