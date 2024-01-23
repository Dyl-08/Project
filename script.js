// This is a p5.js interactive game where the user must direct a circle all the way to the top of the Canvas without bumping into two floating circles. If they hit the top/bottom, it is worth one point. Scoring 5 points will win the game. If the user bumps into the floating circles, the game restarts and they lose their points. This was based off of another idea  for a project based on rockets and asteroids, but as my coding knowledge is limited, I decided to make a simpler version.


let circleY; // used so that we can use incremental operators for the two circles floating down the screen
let ySpeed; // variable used as a incremental operator on the two circles

let runCode = false; // variable for 'if' statement used below
let runBananas = false; // variable for 'if' statement used below

let cY; // Y dimensions of 3rd circle
let cX; // X dimensions of 3rd circle
let xCodeSpeed; // variable used as a incremental operator on the third circle
let yBananasSpeed; // variable used as a incremental operator on the third circle

let circleColor1; // variable for randomized colours on a circle
let circleColor2; // variable for randomized colours on a circle
let circleSize; // variable for random circle size

let hit; // variable for the third circle and falling circles hitting

let winMessageDuration = 120; // Number of frames to display the winning message
let winMessageTimer = 0; // Timer variable

let gameRunning = false;

let points = 0; // point system

let textCommand = true; // variable to modify the 'Don't get hit by circles' text 

function setup() {
    createCanvas(windowWidth, windowHeight);

    // initilization 
    circleY = 0; 
    ySpeed = 8.5;
    cY = windowHeight - 20;
    cX = width / 4 && 2 * width / 3;
    xCodeSpeed = 6;
    yBananasSpeed = 6;
    circleColor1 = color(random(255), random(255), random(255));
    circleColor2 = color(random(255), random(255), random(255));
    circleSize = random(80, 230);
    
}

function draw() {
    background(0); // sets the background to black, the background repeadtedly updates in function draw
    stroke(0); // makes the stroke of the circles black

    // If the game running is false (which it is because we have initialized it as false), then the text will appear. In the keypressed function, the spacebar makes 'gamerunning' true. 
    if (!gameRunning) {
        fill(255); // Sets text colour to white
        textSize(30);
        textAlign(CENTER, CENTER);
        text("Click the SpaceBar to start!", width / 2, height / 4);
        text("Try to use the arrow keys", width / 2, height / 3);
        text("to navigate the ellipse to the top/bottom!", width / 2, height / 2.6);
        text("SCORE 5 POINTS TO WIN", width / 2, height / 2);
        text("For changing circle size/colour,", width / 2, height / 1.7);
        text("click the mouse!", width / 2, height / 1.55);
        textSize(60);
        text("INSTRUCTIONS", width / 2, 0.9 * height / 6);
    } else { 
        
    
    // Determine the quadrant based on the position of the third circle
    let quadrant;
    if (cX >= width / 2 && cY >= height / 2) {
        quadrant = 1;
        background(255, 0, 0); // Red background for quadrant 1
    } else if (cX < width / 2 && cY >= height / 2) {
        quadrant = 2;
        background(0, 255, 0); // Green background for quadrant 2
    } else if (cX < width / 2 && cY < height / 2) {
        quadrant = 3;
        background(0, 0, 255); // Blue background for quadrant 3
    } else {
        quadrant = 4;
        background(255, 255, 0); // Yellow background for quadrant 4
    }

    
    fill(circleColor1);
    // draw current frame based on the colour and size variables
    circle(windowWidth / 4, circleY, circleSize);
    // modify state
    circleY = circleY + ySpeed;

    fill(circleColor2);
    // draw current frame based on the colour and size variables
    circle(3 * windowWidth / 4 , circleY, circleSize);
    // modify state
    circleY = circleY + ySpeed;

    // reverse direction when hitting the edges
    if (circleY < 0 || circleY > windowHeight) {
        ySpeed = -ySpeed;
    }

    // drawing the ellipse that IS the game
    noFill();
    circle(cX, cY, 50)
    
    // Check for collision with falling circles using dist (or distance) function
    if (
        (dist(cX, cY, windowWidth / 4, circleY) < circleSize / 2) ||
        (dist(cX, cY, 3 * windowWidth / 4, circleY) < circleSize / 2)
    ) {
        hit = true;
    } else {
        hit = false;
    }
    
    makemeLines(); // draws lines at the end

    if (runCode) {
        // modify state of third circle horizontally
        cX = cX + xCodeSpeed; // Change this line to add xCodeSpeed instead of subtracting
        
        // reverse direction when hitting the edges 
        if (cX <= 0 || cX >= windowWidth) {
            xCodeSpeed = -xCodeSpeed;
        }
    }
    

    if (runBananas) {
        // modify state of third circle vertically
        cY = cY - yBananasSpeed;
        
        // stop direction when hitting the top
        if (cY <= 0 || cY >= windowHeight) {
            yBananasSpeed = -yBananasSpeed;
        } 
    }

    // Display text on collision
    if (hit) {
        // Reset parameters
        circleY = 0; 
        ySpeed = 5;
        cY = windowHeight - 20;
        cX = width / 4 || 2 * width / 4;
        xCodeSpeed = 5;
        yBananasSpeed = 5;
        circleColor1 = color(random(255), random(255), random(255));
        circleColor2 = color(random(255), random(255), random(255));
        circleSize = random(80, 230);
        hit = false;
        gameRunning = true;
        winMessageTimer = 0;
        points = 0; 
    }    

    if (cY <= 0) {
        points = points + 1;
    }

    // Display the winning message for 60 frames
    if (points >= 5 && winMessageTimer < winMessageDuration) {
        fill(255); // Sets text colour to white
        textSize(30);
        textAlign(CENTER, CENTER);
        text("Congratulations! You won!", width / 2, height / 2);
        text("Click the ENTER key to play again", width / 2, 2.18 * height / 4);

        winMessageTimer++;
                
        if (winMessageTimer >= winMessageDuration) {
            winMessageTimer = 0;
        } 
    }

    if (cY >= windowHeight) {
        points = points + 1;
    }

    // Display the winning message for 60 frames
    if (points >= 5 && winMessageTimer < winMessageDuration) {
        fill(255); // Sets text colour to white
        textSize(30);
        textAlign(CENTER, CENTER);
        text("Congratulations! You won!", width / 2, height / 2);
        text("Click the ENTER key to play again", width / 2, 2.18 * height / 4);

       winMessageTimer++;

       if (winMessageTimer >= winMessageDuration) {
        winMessageTimer = 0;
       }
    } 
    if (textCommand) {
        fill(255); // Sets text color to white
        textSize(30); 
        textAlign(CENTER, CENTER);
        text("Don't get hit by the circles!", width / 2, height / 2); 
    }
    
    if (points >= 5) {
        textCommand = false;
    }

    fill(255); // Sets text colour to white
    textSize(20); 
    textAlign(RIGHT, TOP);
    text(`Points: ${points}`, width - 80, 20);
    
}   

}

function keyPressed() {

    // Here we are establishing that the left arrow key will run the 'runCode' variable and turn it true
    // After that we establish that the up arrow key will run the 'runBananas' variable and turn it true

    if (keyCode === LEFT_ARROW) {
        xCodeSpeed = -Math.abs(xCodeSpeed); // Set xCodeSpeed to a negative value for left movement
        runCode = true;
    } else if (keyCode === RIGHT_ARROW) { // Add this block for right arrow
        xCodeSpeed = Math.abs(xCodeSpeed); // Set xCodeSpeed to a positive value for right movement
        runCode = true;
    } else if (keyCode === UP_ARROW && !runBananas) {
        // We make sure that the up arrow key will ONLY work if the runBananas code in function draw is already false. Previously, when the up arrow key was hit in quick succession the runBananas loop could have activated as true multiple times before keyReleased turned it to false. 
        runBananas = true;
    } 
    if (keyCode === 32) {
        gameRunning = true;
    }
    if (keyCode === 13) {
        circleY = 0; 
        ySpeed = 5;
        cY = windowHeight - 20;
        cX = width / 4 || 2 * width / 4;
        xCodeSpeed = 5;
        yBananasSpeed = 5;
        circleColor1 = color(random(255), random(255), random(255));
        circleColor2 = color(random(255), random(255), random(255));
        circleSize = random(80, 230);
        hit = false;
        gameRunning = false;
        winMessageTimer = 0;
        points = 0; 
    }
}

function keyReleased() {
    // Set the runBananas function to false when the key is released
    runBananas = false;
}

function mousePressed() {
    // Change the colour and size of the circles when the mouse is pressed
    circleColor1 = color(random(255), random(255), random(255));
    circleColor2 = color(random(255), random(255), random(255));
    circleSize = random(80, 230);
}

function makemeLines() { // custom function
    stroke(0); // black 
    strokeWeight(5); 
    line(0, height / 2, width, height / 2); // lines are put in function draw so that they stay on screen
    line(width / 2, 0, width / 2, height);
}
