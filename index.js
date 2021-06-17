// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
document.body.appendChild(canvas);

// Background image
var bgReady1 = false;
var bgImage1 = new Image();
bgImage1.onload = function () {
    bgReady1 = true;
};
bgImage1.src = "images/redbackground.png";

var bgReady2 = false;
var bgImage2 = new Image();
bgImage2.onload = function () {
    bgReady2 = true;
};
bgImage2.src = "images/desert-background.png";
// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "images/hero-2.png";

// Monster image
var vaccineReady = false;
var vaccineImage = new Image();
vaccineImage.onload = function () {
    vaccineReady = true;
};
vaccineImage.src = "images/syringe.png";

// Monster image
var maskReady = false;
var maskImage = new Image();
maskImage.onload = function () {
    maskReady = true;
};
maskImage.src = "images/mask.png";

// virus image
var virusReady = false;
var virusImage = new Image();
virusImage.onload = function () {
    virusReady = true;
};
virusImage.src = "images/virus.png";

// Game objects
var hero = {
    speed: 256, // movement in pixels per second
    x: 0,  // where on the canvas are they?
    y: 0  // where on the canvas are they?
};
var vaccine = {
    // for this version, the monster does not move, so just and x and y
        x: 0,
        y: 0
    };
var mask = {
        // for this version, the monster does not move, so just and x and y
     x: 0,
    y: 0
 };


 let virusObject = function (pX, pY) {
   this.x=pX;
   this.y=pY;
}
let virusArray=[];
   
var immunityLevel = 0;

// Handle keyboard controls
var keysDown = {}; //object were we properties when keys go down
                // and then delete them when the key goes up
// so the object tells us if any key is down when that keycode
// is down.  In our game loop, we will move the hero image if when
// we go thru render, a key is down

addEventListener("keydown", function (e) {
    //console.log(e.keyCode + " down")
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    //console.log(e.keyCode + " up")
    delete keysDown[e.keyCode];
}, false);

function touchingVirus(who){

    //let gg = false;
    for(i=0;i<virusArray.length;i++){
        if
        (who.x<=(virusArray[i].x+50)&&
        virusArray[i].x<=(who.x+50)&&
        who.y<=(virusArray[i].y+50)&&
        virusArray[i].y<=(who.y+50)
        ) 
            {
                console.log("touched virus");
        return true;
    }
    }

    return false;
    
}

// Update game objects
var update = function (modifier) {

    if (38 in keysDown && hero.y > 32) { //  holding up key
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown && hero.y < canvas.height - (64 + 30)) { //  holding down key
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown && hero.x > (30)) { // holding left key
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown && hero.x < canvas.width - (64 + 30)) { // holding right key
        hero.x += hero.speed * modifier;
    }
    
        // Are they touching?
        if (
            (hero.x <= (vaccine.x + 55)
            && vaccine.x <= (hero.x + 55)
            && hero.y <= (vaccine.y + 55)
            && vaccine.y <= (hero.y + 55)) ||
            (hero.x <= (mask.x + 55)
            && mask.x <= (hero.x + 55)
            && hero.y <= (mask.y + 55)
            && mask.y <= (hero.y + 55)) 
        ) {
            ++immunityLevel;       // keep track of our “score”

            if(immunityLevel>5){
                alert("You won!");
                gameOver=true;

            }
            else{
                reset();       // start a new cycle
            }


            
        }
        let count=0;

        if(touchingVirus(hero)){
            count++;
        //     --immunityLevel;
        //     ctx.fillStyle = "rgb(0, 0, 0)";
        // ctx.font = "24px Helvetica";
        // ctx.textAlign = "left";
        // ctx.textBaseline = "top";
        // ctx.fillText("immunity -1! 2 more chances!!" , 32, 32);
            
                alert("You have caught Virus! Game Over!")
                gameOver=true;  

            
                 
            //console.log("touched");
        }
    
};




// Let's play this game!


var main = function () {
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);
    render();
    then = now;
    //  Request to do this again ASAP
    requestAnimationFrame(main);
};
//moving virus on screen every second
setInterval(displayVirus, 1000);

// Draw everything in the main render function
var render = function () {
    if (bgReady1) {
        // console.log('here2');
        ctx.drawImage(bgImage1, 0, 0);
    }

    if (bgReady2) {
        // console.log('here2');
        ctx.drawImage(bgImage2, 32, 32);

    }
    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }

    if (vaccineReady) {
        ctx.drawImage(vaccineImage, vaccine.x, vaccine.y);
    }
    if (maskReady) {
        ctx.drawImage(maskImage, mask.x, mask.y);
    }

    if(virusReady){ 
        for( i=0;i<virusArray.length;i++){
            ctx.drawImage(virusImage,virusArray[i].x,virusArray[i].y);
            // console.log("virus" +i+virusArray[i].x)
        }
        // }
         
    }
        // Score
        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Your Immunity Level: " + immunityLevel, 0, 0);
    

}

var reset = function () {
    hero.x = (canvas.width / 2)-32;
    hero.y = (canvas.height / 2)-32;

//Place the monster somewhere on the screen randomly
// but not in the hedges, Article in wrong, the 64 needs to be 
// hedge 32 + hedge 32 + char 32 = 96
    // monster.x = 32 + (Math.random() * (canvas.width - 96));
    // monster.y = 32 + (Math.random() * (canvas.height - 96));

    let notGood=true;
    while(notGood){
    vaccine.x = 32+ (Math.random() * (canvas.width - 128));
    vaccine.y =32 + (Math.random() * (canvas.height - 128));
    if(!touchingVirus(vaccine)){
        notGood=false;
    }
    }
 notGood=true;
    while(notGood){
        mask.x = 32+ (Math.random() * (canvas.width - 128));
        mask.y =32 + (Math.random() * (canvas.height - 128));
        if(!touchingVirus(mask)&&!touchingOther(mask,vaccine)){
            notGood=false;
        }
        }

        displayVirus();
    
};

function displayVirus(){
    let x=0;
    let y=0;
    let virus={
        x:0,
        y:0
    }
    virusArray=[];
        do
        {
            virus.x=32+ (Math.random() * (canvas.width - 128));
            virus.y=32+ (Math.random() * (canvas.width - 128));
            if(!touchingOther(hero,virus)){
                virusArray.push(new virusObject(virus.x,virus.y));
            }
            
        }while(virusArray.length<5);

    }

function touchingOther(who,whom){
    if(
    who.x <= (whom.x + 64)
    && whom.x <= (who.x + 64)
    && who.y <= (whom.y + 64)
    && whom.y <= (who.y + 64)
    ){
        return true;
    }
    else{
        return false;
    }
}

var then = Date.now();
reset();
main();  // call the main game loop.