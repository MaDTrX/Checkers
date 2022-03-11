$(document).ready(function () {
    //Right and Left black Up move direction
    const blackUpRight = 7
    const blackUpLeft = 9
    //Left and Right Red down move direction
    const redDownLeft = 7
    const redDownRight = 9
    //Up Right Down Left King move direction
    const UpRightOrDownLeft = 7
    const UpLeftOrDownRight = 9
    //jump multiplier
    const multiplier = 2
    // number of captives
    let redCaptives = 0;
    let blackCaptives = 0;
    //turn incrementer
    let turn = 1;
    let redPiece, blackPiece;

    //Start Settings/ Black Always Strats
    if (turn === 1) {
        document.querySelector('h1').innerHTML = "<h1>BLACK STARTS!</h1>"
        //removes Pointer Events
        $('.redpieces').css('pointer-events', 'none');
    }


    let gamePlay = function (parent, current) {

        if (parent && (current.className === 'blackpieces')) {
            $(`#${current.id}`).prop('id', `blackpiece${parent}`)
            let possibleBlackMoves = calculateBlackMovement(current.id)
            let displayBlackMove = displayMovement(possibleBlackMoves)
            let moveBlack = makeMove(possibleBlackMoves, current.id)

        } else if (parent && (current.className === 'redpieces')) {
            $(`#${current.id}`).prop('id', `redpiece${parent}`)
            let possibleRedMoves = calculateRedMovement(current.id)
            let displayRedMove = displayMovement(possibleRedMoves)
            let moveRed = makeMove(possibleRedMoves, current.id)
        }
    }

    function calculateBlackMovement(piece) {
        //console.log("piece", piece)
        let blackPiece = piece.split("blackpiece")
        blackPiece.shift()
        const rightOrLeft = [Number(blackPiece) - blackUpLeft, Number(blackPiece) - blackUpRight]
        return rightOrLeft
    }


    function calculateRedMovement(piece) {
        // console.log("piece", piece)
        let redPiece = piece.split("redpiece")
        redPiece.shift()
        let leftOrRight = [Number(redPiece) + redDownLeft, Number(redPiece) + redDownRight]
        return leftOrRight
    }

    function displayMovement(project) {
        let blackDirectionArray = [blackUpLeft, blackUpRight]
        let redDirectionArray = [redDownLeft, redDownRight]

        project.forEach((proj, i) => {

            let blackDoubleJumper = blackDirectionArray[i] * multiplier
            let redDoubleJumper = redDirectionArray[i] * multiplier
            let blackJumpMove = proj - blackDirectionArray[i]
            let redJumpMove = proj + redDirectionArray[i]

            if ($(`#${proj}`).hasClass('red') || $(`#${proj}`).children().length > 0) {
                $(`#${proj}`).css("opacity", "1")
                
            } else  if ($(`#${proj}`).children().length <= 0){
                $(`#${proj}`).css("background-color", "rgba(0, 0, 0, 0.5)")
                   
            } else if ($(`#${blackJumpMove}`).hasClass('red') || $(`#${blackJumpMove}`).children().length > 0) {
                $(`#${blackJumpMove}`).css("opacity", "1")
                
             } else if ( ($(`#${proj}`).children().length > 0 || $(`#${blackJumpMove}`).children().length <= 0)) { 
                $(`#${blackJumpMove}`).css("background-color", "rgba(0, 0, 0, 0.5)")

             } else if ($(`#${redJumpMove}`).hasClass('red') || $(`#${redJumpMove}`).children().length > 0) {
                $(`#${redJumpMove}`).css("opacity", "1")

             }  else if ( $(`#${proj}`).children().length > 0 || (`#${redJumpMove}`).hasClass('black')) {
                $(`#${redJumpMove}`).css("background-color", "rgba(0, 0, 0, 0.5)")
             }
        })
    }

    function makeMove(project, previousId) {
        let redPiece = previousId.split("redpiece")
        let blackPiece = previousId.split("blackpiece")
        project.forEach((position, index) => {
            $(`#${position}`).bind('click', function (e) {
                if ($(`#${position}`).css("background-color") === "rgba(0, 0, 0, 0.5)" && $(`#${previousId}`).hasClass('blackpieces')) {
                    $(`#blackpiece${blackPiece[1]}`).appendTo(`#${e.target.id}`)
                    console.log(position)
                    console.log("previousId", previousId)
                    console.log("moveClick", e.target.id)
                    turn++
                    let switchPlayers = changeTurn()
                          
                
                } else if ($(`#${position}`).css("background-color") === "rgba(0, 0, 0, 0.5)" && $(`#${previousId}`).hasClass('redpieces')) {
                    $(`#redpiece${redPiece[1]}`).appendTo(`#${e.target.id}`)
                    console.log("moveClick",  e.target.id)
                    turn++
                    let switchPlayers = changeTurn()
                    $(`#${position}`).off()
                }
            })
        })
    }
    // function countCaptives() {
    //     if ( ) {

    //     }

    // } 
    //turn change mechanics
    function changeTurn() {
        if (turn % 2) {
            $('.blackpieces').css('pointer-events', 'auto');
            document.querySelector('h1').innerHTML = "<h1>BLACK'S TURN</h1>"
            $('.redpieces').css('pointer-events', 'none');
        } if (turn % 2 === 0) {
            $('.redpieces').css('pointer-events', 'auto');
            document.querySelector('h1').innerHTML = "<h1>RED'S TURN</h1>"
            $('.blackpieces').css('pointer-events', 'none');
        }

    }
    function declareWinner(moves, capturedtray) {
        if (capturedTray = 12 || moves.length === 0) {
        document.querySelector('h1').innerHTML = "<h1>GAME OVER</h1>"
                
            $('.gameOver').css('pointer-events', 'none');
        }

    }
    //click Reset
    function resetClick() {
        $(`.red`).css("background-color", "red")
        $(`.black`).css("background-color", "black")
    }
    // click event listener
    $('#checkersBoard').bind('click', function (e) {
        resetClick()
        gamePlay(e.target.parentElement.id, e.target)

    })
})
