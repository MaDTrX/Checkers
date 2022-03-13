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
    let redCaptives = 0
    let blackCaptives = 0
    //turn incrementer
    let turn = 1
    let redPiece, blackPiece, jump

    //Start Settings/ Black Always Strats
    if (turn === 1) {
        document.querySelector('h1').innerHTML = "<h1>BLACK STARTS!</h1>"
        //removes Pointer Events
        $('.redpieces').css('pointer-events', 'none');
    }


    let gamePlay = function (parent, piece) {
        let color = resetClick()
        if (parent && (piece.className === 'blackpieces')) {
            $(`#${piece.id}`).prop('id', `blackpiece${parent}`)
            let possibleBlackMoves = calculateBlackMovement(piece.id)
            let displayBlackMove = displayBlackMovement(possibleBlackMoves)
            let moveBlack = makeMove(possibleBlackMoves, piece.id)
            turn++

        } else if (parent && (piece.className === 'redpieces')) {
            $(`#${piece.id}`).prop('id', `redpiece${parent}`)
            let possibleRedMoves = calculateRedMovement(piece.id)
            let displayRedMove = displayRedMovement(possibleRedMoves)
            let moveRed = makeMove(possibleRedMoves, piece.id)
            turn++
        }
        changeTurn()
    }

    function calculateBlackMovement(piece) {
        blackPiece = piece.split("blackpiece")
        blackPiece.shift()
        const rightOrLeft = [Number(blackPiece) - blackUpLeft, Number(blackPiece) - blackUpRight]
        console.log("r", rightOrLeft)
        return rightOrLeft
    }


    function calculateRedMovement(piece) {
        redPiece = piece.split("redpiece")
        redPiece.shift()
        let leftOrRight = [Number(redPiece) + redDownLeft, Number(redPiece) + redDownRight]
        console.log("l", leftOrRight)
        return leftOrRight
    }

    function displayBlackMovement(project) {
        let blackDirectionArray = [blackUpLeft, blackUpRight]
        project.forEach((proj, i) => {
            let blackDoubleJumper = blackDirectionArray[i] * multiplier
            let blackJumpMove = proj - blackDirectionArray[i]

            if ($(`#${proj}`).children().length <= 0 && $(`#${proj}`).hasClass('black')) {
                $(`#${proj}`).css("background-color", "rgba(0, 0, 0, 0.5)")
            }
            if ($(`#${proj}`).children().length > 0 && $(`#${blackJumpMove}`).children().length <= 0) {
                $(`#${blackJumpMove}`).css("background-color", "rgba(0, 0, 0, 0.5)")

            } else if ($(`#${blackJumpMove}`).hasClass('red') || $(`#${blackJumpMove}`).children().length > 0) {
                $(`#${blackJumpMove}`).css("opacity", "1")
            }
        })
    }
    function displayRedMovement(project) {
        let redDirectionArray = [redDownLeft, redDownRight]
        project.forEach((proj, i) => {
            let redDoubleJumper = redDirectionArray[i] * multiplier
            let redJumpMove = proj + redDirectionArray[i]

            if ($(`#${proj}`).children().length <= 0 && $(`#${proj}`).hasClass('black')) {
                $(`#${proj}`).css("background-color", "rgba(0, 0, 0, 0.5)")

            } if ($(`#${proj}`).children().length > 0 && $(`#${redJumpMove}`).children().length <= 0) {
                $(`#${redJumpMove}`).css("background-color", "rgba(0, 0, 0, 0.5)")

            } else if ($(`#${redJumpMove}`).hasClass('red') || $(`#${redJumpMove}`).children().length > 0) {
                $(`#${redJumpMove}`).css("opacity", "1")

            }
        })
    }


    function makeMove(project, piece) {
        blackPiece = piece.split("blackpiece")
        console.log("black", blackPiece)
        redPiece = piece.split("redpiece")
        console.log("red", redPiece)
        project.forEach((position, index) => {

            $(`.black`).on('click', function (e) {

                if ($(`#${position}`).css("background-color") === "rgba(0, 0, 0, 0.5)" && $(`#${piece}`).hasClass('blackpieces') && $(`#${position}`).children().length <= 0) {
                    $(`#blackpiece${blackPiece[1]}`).detach().appendTo(`#${e.currentTarget.id}`)
                    //console.log(blackPiece[1])
                    redCaptured(blackPiece[1], e.target.id)
                } if ($(`#${position}`).css("background-color") === "rgba(0, 0, 0, 0.5)" && $(`#${piece}`).hasClass('redpieces') && $(`#${position}`).children().length <= 0) {
                    $(`#redpiece${redPiece[1]}`).detach().appendTo(`#${e.currentTarget.id}`)
                    blackCaptured(redPiece[1], e.target.id)
                }
            })
        })
    }

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
    function redCaptured(piece, target) {
        
        let tNum = Number(target)
        jump = Math.abs(piece - tNum)
        let num = Number(jump) 
        console.log("rnum", jump)


        if (num === 14) {
            $(`#${tNum + blackUpRight}`).empty()
            blackCaptives++
            console.log("blackC", blackCaptives)
          
        } 
         if (num === 18) {
            $(`#${tNum + blackUpLeft}`).empty()
            blackCaptives++
            console.log("blackC", blackCaptives)
            }
        }
    function blackCaptured(piece, target) {
        let tNum = Number(target)
        jump = Math.abs(piece - tNum)
        let num = Number(jump)
console.log("bnum", jump)
        if (num === 18) {
            $(`#${tNum - redDownRight}`).empty()
            redCaptives++
            console.log("redc", redCaptives)
           
        }
         if (num === 14) {
            $(`#${tNum - redDownLeft}`).empty()
            redCaptives++
            console.log("redc",redCaptives)
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
        gamePlay(e.target.parentElement.id, e.target)
    })
})
