class Food{
    constructor(){
        this.image = loadImage("images/Milk.png");
        this.foodStock;
        this.lastFed;
    }

    display(){
        var x=80, y=100;

        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(this.foodStock != 0){
            for(var i = 0; i < this.foodStock; i++){
                if(i % 10 == 0){
                    x = 80;
                    y = y + 50;
                }
                image(this.image,x,y,50,50);
            }
        }
    }

     getFoodStock(){
        foodStock=database.ref('Food');
        foodStock.on("value", function(data){
            foodObj.foodStock=data.val();
        });
    }
    
    updateFoodStock(x){
        database.ref('/').update({
        Food:x
        })
        
    }

    deductFood(){
        if(x<=0){
            x=0;
          }else{
            x=x-1;
          } 
    }

    bedroom(){
        imageMode(CORNER);
        background(bedroom,550,500);
    }
    garden(){
        imageMode(CORNER);
        background(garden,550,500);
    }
    washroom(){
        imageMode(CORNER);
        background(washroom,550,500);
    }
}    

