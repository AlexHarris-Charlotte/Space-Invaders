// Pseudo
// Need a canvas for the game screen
// Need to place everything inside of a setInterval Loop
// Need event listeners for keypress events on arrow keys and space bar
// left and right arrow keys increment movement of a player
// space bar will shoot a projectile toward top of game area
// need to generate enemies that randomly spawn along the x axis at top of game screen
// enemies move toward bottom of screen
// if enemies make contact with projectile, they are destroyed
// make a score calculator to add points of enemies destroyed
// make a life calculator to subtract lives if enemies reach bottom of screen

window.onload = function() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var canvasWidth = 600;
    var center = canvasWidth / 2;
    var canvasHeight = 600;
    var userInput;
    var playerX = canvasWidth/2;
    var playerWidth = 40;
    var playerCenter = playerX + (playerWidth/2);
    var playerY = canvasHeight - 60;
    var playerHeight = 40;
    var projectileHeight = 20;
    var projectileWidth = 7;
    var projectileX = playerX + ((playerWidth/2) - projectileWidth/2);
    var projectileX2 = projectileX + projectileWidth;
    var projectileY = playerY - 21;
    var rightPressed = false;
    var leftPressed = false;
    var fPressed = false;
    var projectileActive = false;
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    var enemyHeight = 50;
    var enemyY = canvasHeight - 590;
    var enemyWidth = 50;
    var enemyX = Math.floor(Math.random() * (canvasWidth - (enemyWidth * 2) + 1));
    var enemyX2 = enemyX + enemyWidth;
    var enemyActive = true;
    var score = 0;
    var lives = 3;
    document.getElementById("lives").innerHTML = lives


    alert("Press the Left and Right arrow keys to navigate. Press F to fire missles.");
    setInterval(function() {
        clearPlayer();
        drawPlayer();
        enemyHandler();
        playerMovement();
        fireProjectile();
        projectileCollision();
        endGame();
    }, 10);


    // functions
    function drawPlayer() {
        ctx.beginPath();
        ctx.rect(playerX, playerY, playerWidth, playerHeight);
        ctx.fillStyle = "orange";
        ctx.fill();
        ctx.closePath();
    }

    function clearPlayer() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    }

    function keyDownHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = true;
        }
        else if(e.keyCode == 37) {
            leftPressed = true;
        } 
        else if(e.keyCode == 70) {
            fPressed = true;
        }
    }

    function keyUpHandler(e) {
        if(e.keyCode == 39) {
            rightPressed = false;
        }
        else if(e.keyCode == 37) {
            leftPressed = false;
        }
        else if(e.keyCode == 70) {
            fPressed = false;
        }
    }

    function playerMovement() {
        if(rightPressed && (playerX + playerWidth) < canvasWidth) {
            if(score < 15) {
                playerX += 3;
            } else if(score >= 35) {
                playerX += 7;
            } else {
                playerX += 5;
            }
        }
        if(leftPressed && playerX > 0) {
            if(score < 15) {
                playerX -= 3;
            } else if(score >= 35) {
                playerX -= 7;
            } else {
                playerX -= 5;
            }
        }
    }


    // Projectile functions
    function drawProjectile() {
        ctx.beginPath();
        ctx.rect(projectileX, projectileY, projectileWidth, projectileHeight);
        ctx.fillStyle = "purple";
        ctx.fill();
        ctx.closePath();
    }

    function moveProjectile() {
        if(score < 15) {
            projectileY -= 5;
        } else if(score >= 35) {
            projectileY -= 7;
        } else {
            projectileY -= 9;
        }
    }
    function resetProjectilePosition() {
        projectileY = playerY - 21;
        projectileX = playerX + ((playerWidth/2) - projectileWidth/2);
        projectileX2 = projectileX + projectileWidth;
        console.log("reset");
    }

    // ProjY is not incrementing
    function fireProjectile() {
        if(fPressed && projectileActive != true) {
            projectileActive = true;
            resetProjectilePosition();
        }
        if(projectileActive){
            drawProjectile();
            moveProjectile();
            if(projectileY <= 0) {
            projectileActive = false;
            }
        }
        
    }

    // Enemy spawning functions

    function drawEnemy() {
        ctx.beginPath();
        ctx.rect(enemyX, enemyY, enemyWidth, enemyHeight);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
    }


    function enemyHandler() {
        if(enemyActive){
            drawEnemy();
            if(score < 15) {
                enemyY++;
            } else if(score >= 35) {
                enemyY += 3;
            } else {
                enemyY += 2;
            }
        }
        if(enemyY > (640 - enemyHeight)) {
            enemyY = canvasHeight - 590;
            enemyX = Math.floor(Math.random() * (canvasWidth - (enemyWidth * 2) + 1));
            lives--;
            document.getElementById("lives").innerHTML = lives
        } 
    }

    // collision function
    function projectileCollision() {
        if(projectileY < (enemyY + enemyHeight) && (enemyX - projectileWidth/2) < projectileX && (enemyX2 + projectileWidth/2) > projectileX2){
            newEnemy();
            projectileActive = false;
            score++;
            document.getElementById("score").innerHTML = score;
        }
    }

    function newEnemy() {
        enemyActive = true;
        enemyY = canvasHeight - 590;
        enemyX = Math.floor(Math.random() * (canvasWidth - (enemyWidth * 2) + 1));
        enemyX2 = enemyX + enemyWidth;
        enemyHandler();
        console.log(enemyX, enemyX2);
    }

    function endGame() {
        if(lives === 0) {
            alert("Game Over! Refresh Page to play again.")
        }
    }
}