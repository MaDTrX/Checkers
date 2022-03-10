$( document ).ready(function() {

    function displayblackMovement (piece) {
        const blackUpRight = 7
        const blackUpLeft = 9
        let pieceNumber = piece.split("boardpiece")
        pieceNumber.shift()
        const rightOrLeft = [Number(pieceNumber) - blackUpLeft, Number(pieceNumber) - blackUpRight]
        return rightOrLeft
    }
    function displayRedMovement (piece) {
        const redDownLeft = 7
        const redDownRight = 9
        let pieceNumber = piece.split("boardpiece")
        pieceNumber.shift()
        const leftOrRight= [Number(pieceNumber) + redDownLeft, Number(pieceNumber) + redDownRight]
        return leftOrRight
    }
    function movePiece () {

    }
    

    let body = document.getElementById('checkersBoard')
    body.addEventListener('click', function(e) {
        if (e.target.parentElement.id && (e.target.className === 'blackpieces')) {
            $(`#${e.target.id}`).prop('id', `boardpiece${e.target.parentElement.id}`)
            let possibleMoves = displayblackMovement(e.target.id)
            console.log(possibleMoves)
            possibleMoves.forEach((move) => {
                $(`#${move}`).css("background", "rgba(0, 0, 0, 0.5)")
               
            
            })
      
        }  else if (e.target.parentElement.id && (e.target.className === 'redpieces')) {
            $(`#${e.target.id}`).prop('id', `boardpiece${e.target.parentElement.id}`)
            let possibleMoves2 = displayRedMovement(e.target.id)
            console.log(possibleMoves2)
            possibleMoves2.forEach((move) => {
                $(`#${move}`).css("background", "rgba(0, 0, 0, 0.5)")
                
         })

    
        
        
    }
    // boardpieces.addEventListener('click', function() {
    //     console.log('hello')
     })
    })





  //  console.log( "ready!" );
//});

// //Game of Choice => (American/Straight) Checkers


// //The pieces are placed on tiles opposite of it's color on each end
// //the pieces can only move forward and diagonally
// //a piece can only take and opponent by jumping over them and can also chain the jump 
// //a player must take when the option is av
// //if a piece reaches the opponents side-end it is crowned king 
// //a king gains the ability to move backwards 
// //to win the game a player must either capture all pieces or force the opponent to have no more available moves
// /* create readme.md file*/

// /*----- constants -----*/
// //Each player has 12 pieces
// //assign each player 12 pieces
// const players = {
//     "player1":{ 
//         "-1":"red", 
//         redpieces: [
//             [2, 4, 6, 8]
//             [9, 11, 13, 15] 
//             [18, 20, 22, 24]
//         ]
//     },
//    "player2": {
//        "1": "black",
//        blackpieces: [
//            [42, 44, 46, 48]
//            [49, 51, 53, 55]
//            [58, 60, 62, 64]
//        ]
//     }
// }
// //create a board map where pieces can land
// //Board game with 64 playable squares
// const boardMap = [
//     1, 2, 3, 4, 5, 6, 7, 8,
//     9, 10, 11, 12, 13, 14, 16,
//     17, 18, 19, 20, 21, 22, 23, 24,
//     25, 26, 27, 28, 29, 30, 31, 32,
//     33, 34, 35, 36, 37, 38, 39, 40,
//     41, 42, 43, 44, 45, 46, 47, 48,
//     49, 50, 51, 52, 53, 54, 55, 56,
//     57, 58, 59, 60, 61, 62, 63, 64
// ]
// const rules = "???";
// //set rules
// /*----- app's state (variables) -----*/
// //declare turn, winner, captured, movesremaining/movesmade variables
// let turn, winner, captured, movesMade, remainingMoves
// /*----- cached element references -----*/
// //cache pieces, squares, capturedtray, kings, concede button dom
// let blackPieces = document.getElementById("#blackpieces")
// let redPieces = document.getElementById("#redpieces")
// let redSquares =  document.querySelector(".red")
// let blackSquares = document.querySelector(".black")
// let concedeResetBtn =  document.getElementById("#quit")
// let red_king = document.getElementbyId("#redking")
// let black_king =document.getElementbyId("#blackking")
// /*----- event listeners -----*/
// //add drag and drop or click for movement, concede button
// /*----- functions -----*/
// //declare winner
// function declareWinner(){

// }
// declareWinner()
// //players turn
// function playerTurn(){

// }
// playerTurn()

// //board mapping//legal moves
// function legalMoves() {

// }
// legalMoves()

// //king entry
// function enterKing(){

// }
// enterKing() 

/*complete by tuesday*/
/*check requirements*/
/*test functionality*/
/*version control*/
/*begin icebreakers*/

// Icebreakers
//add ai
//--- minimax or alpha beta pruning
//-----or maybe just randomizing moves
//-------or maybe all three with three difficulty settings in game options
//add different variations 
//---russian checkers or kings fly
//improve ui
//--seamless and smooth transitions
//-----board choices
//-------animated background
//add game settings
//---ai difficulty
//-----drag and drop or click option

/* try to finish atleast one icebreaker by friday */

