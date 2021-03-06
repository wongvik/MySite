/* 
 * Javascript for the Rock Paper Scissor game
 */

// Add an eventListener to the Win/Lose message
var g = document.getElementById("winlosemsg");
    // Dissapears when user clicks on the box
    g.addEventListener('click', function(){
        g.style.display="none";
    })
            

/**
 * Display a message to user after a gameplay; i.e. if user wins it will display
 * "You won!".
 * @param {type} result
 * @returns {undefined}
 */
function winLoseMsg(result){
    var node = document.getElementById("winlosemsg");
    // Changes the div's inner HTML according to the result
    if(result === "win"){
        node.innerHTML = "You won!";
    } else if (result === "lose"){
        node.innerHTML = "You lost :(";
    } else if (result === "draw"){
        node.innerHTML = "Draw";
    }
    // Show the div
    node.style="display:block"
}

/**
 * Resets the gameboard and clears all pictures, the scoreboard and messge
 * @returns {undefined}
 */
function reset(){
    // Empties or reset all contents in gameboard, scoreboard and the win/lose 
    // message
    document.getElementById("gamebox").innerHTML = "";
    document.getElementById("pScore").innerHTML = "0";
    document.getElementById("cScore").innerHTML = "0";
    document.getElementById("winlosemsg").innerHTML = "";
}

/**
 * Calculates the result of each gameplay. Calls the methods that display the 
 * user's gameplay option image, then calls the method for a computer generated
 * player option, and lastly displays win/lose message and updates the 
 * scoreboard.
 * 
 * @param {type} action
 * @returns {undefined}
 */
function winLose(action){
    // Empties game board before starting
    document.getElementById("gamebox").innerHTML = "";
    var player1;
    // Saves the action of player1, and calls the method to process user's option
    if(action === "rock"){
        player1 = playerRock('human');
    } else if(action === "paper"){
        player1 = playerPaper('human');
    } else if(action === "scissor"){
        player1 = playerScissor('human');
    }
    
    // Calls method that generate the computer player's option, and saves it 
    var player2 = computerRPS();
    
    // Calculates the winner and loser / if it is draw
    if(player1 === "rock"){
        if(player2 === "rock"){
            winLoseMsg("draw");
        } else if(player2 === "paper"){
            // Add one score to computer player if the user lost
            winLoseMsg("lose");
            addOneScore("comp");
        } else if(player2 === "scissor"){
            // Add one score to human player if the user won
            winLoseMsg("win")
            addOneScore("human");
        }
    } else if(player1 === "paper"){
        if(player2 === "rock"){
            winLoseMsg("win")
            addOneScore("human");
        } else if(player2 === "paper"){
            winLoseMsg("draw");
        } else if(player2 === "scissor"){
            winLoseMsg("lose");
            addOneScore("comp");
        }
    } else if(player1 === "scissor"){
        if(player2 === "rock"){
            winLoseMsg("lose");
            addOneScore("comp");
        } else if(player2 === "paper"){
            winLoseMsg("win")
            addOneScore("human");
        } else if(player2 === "scissor"){
            winLoseMsg("draw");
        }
    }
    
}

/**
 * Adds one score to the player specified; Shows result on scoreboard
 * @param {type} player
 * @returns {undefined}
 */
function addOneScore(player){
    if(player === "human"){
        // Add score to human player's score board
        var node = document.getElementById("pScore");
        var score = node.innerHTML;
        node.innerHTML = parseInt(score) + 1;
    } else if (player === "comp"){
        // Add score to computer player's score board
        var node = document.getElementById("cScore");
        var score = node.innerHTML;
        node.innerHTML = parseInt(score) + 1;
    }
}

/**
 * Display the image representation of the option "Rock";
 * @param {type} player
 * @returns {String}
 */
function playerRock(player){
    var img = new Image();
    // create an image obj with appropriate source link
    var gamebox = document.getElementById("gamebox");
    var div = document.createElement('div');
    if(player === "human"){
        img.src = "images/human_rock.jpg";
        div.id = "human";
    } else if(player === "comp"){
        img.src = "images/comp_rock.jpg";
        div.id = "comp";
    }
    
    // Append the appropriate image into the gameboard
    gamebox.appendChild(div);
    div.appendChild(img);
    
    return 'rock';
}

/**
 * Generates an image to the gameboard associated to the player's option; 
 * Option generated by user will show up as a red image, blue image for computer
 * @param {type} player
 * @returns {String}
 */
function playerPaper(player){
    var img = new Image();
    // create an image obj with appropriate source link
    var gamebox = document.getElementById("gamebox");
    var div = document.createElement('div');
    if(player === "human"){
        img.src = "images/human_paper.jpg";
        div.id = "human";
    } else if(player === "comp"){
        img.src = "images/comp_paper.jpg";
        div.id = "comp";
    }
    // Append the appropriate image into the gameboard
    gamebox.appendChild(div);
    div.appendChild(img);
    
    return 'paper';
}

/**
 * Generates an image to the gameboard associated to the player's option; 
 * Option generated by user will show up as a red image, blue image for computer
 * @param {type} player
 * @returns {String}
 */
function playerScissor(player){
    var img = new Image();
    // create an image obj with appropriate source link
    img.src = "images/human_scissor.jpg";
    var gamebox = document.getElementById("gamebox");
    var div = document.createElement('div');
    if(player === "human"){
        img.src = "images/human_scissor.jpg";
        div.id = "human";
    } else if(player === "comp"){
        img.src = "images/comp_scissor.jpg";
        div.id = "comp";
    }
    // Append the appropriate image into the gameboard
    gamebox.appendChild(div);
    div.appendChild(img);
    
    return 'scissor';
}

/**
 * Generates an image to the gameboard associated to the player's option; 
 * Option generated by user will show up as a red image, blue image for computer
 * @returns {String}
 */
function computerRPS(){
    // Randomly generates a number from 0 to less than 10
    var num = Math.random() * 10;
    
    // Computer plays Rock if random number is lower or equal to 3
    // Paper if number is between 3 to 6
    // Scissor if number is higher than 6 and lower than 10
    var action;
    if(num <= 3){ 
        action = playerRock('comp');
    } else if(num < 6){
        action = playerPaper('comp');
    } else {
        action = playerScissor('comp');
    }
    
    // Scroll to the bottom of the game box
    scrollToBot();
    
    // Returns what action the computer played
    return action;
}

/*
 * Help the gamebox's scroll at the bottom
 */
function scrollToBot(){
    var objDiv = document.getElementById("gamebox");
    // Sets the scroller as lowest
    var scrollHeight = objDiv.scrollHeight;
    objDiv.scrollTop = scrollHeight;
}