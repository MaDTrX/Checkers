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
        
        changeTurn()
        if (parent && (piece.className === 'blackpieces')) {
            
            let possibleBlackMoves = calculateBlackMovement(piece.id, piece)
            let displayBlackMove = displayBlackMovement(possibleBlackMoves)
            let moveBlack = makeMove(piece, piece.id)
            declareWinner(redCaptives)
            
           

        } else if (parent && (piece.className === 'redpieces')) {
           
            let possibleRedMoves = calculateRedMovement(piece.id, piece)
            let displayRedMove = displayRedMovement(possibleRedMoves)
            let moveRed = makeMove(piece, piece.id)
            declareWinner(blackCaptives)
            
        }
    }

    function calculateBlackMovement(piece, target) {
        let targetId = $(target).closest('td').attr('id')
        let sqNum = Number(targetId)
        const rightOrLeft = [sqNum - blackUpLeft, sqNum - blackUpRight]
       //console.log(targetId)
        return rightOrLeft
    }


    function calculateRedMovement(piece, target) {
        let targetId = $(target).closest('td').attr('id')
        let sqNum = Number(targetId)
        //console.log(targetId)
        
        let leftOrRight = [sqNum + redDownLeft, sqNum + redDownRight]
       
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
            if ($(`#${proj}`).children().length > 0 && $(`#${blackJumpMove}`).children().length <= 0 && $(`#${blackJumpMove}`).hasClass('black') && $(`#${proj}`).children().hasClass('redpieces') ) {
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

            } if ($(`#${proj}`).children().length > 0 && $(`#${redJumpMove}`).children().length <= 0 && $(`#${redJumpMove}`).hasClass('black') && $(`#${proj}`).children().hasClass('blackpieces')) {
                $(`#${redJumpMove}`).css("background-color", "rgba(0, 0, 0, 0.5)")

            } else if ($(`#${redJumpMove}`).hasClass('red') || $(`#${redJumpMove}`).children().length > 0) {
                $(`#${redJumpMove}`).css("opacity", "1")

            }
        })
    }


    function makeMove(target, piece) {
        blackPiece = piece.split("blackpiece")
        let targetId = $(target).closest('td').attr('id')
        //console.log(targetId)
        redPiece = piece.split("redpiece")
        
         $(`.black`).on('click', function (e) {

                if ($(`#${e.target.id}`).css("background-color") === "rgba(0, 0, 0, 0.5)" && target.className ==='blackpieces' && $(`#${e.target.id}`).children().length <= 0) {
                   // console.log("bp", piece)
                    $(`#blackpiece${blackPiece[1]}`).detach().appendTo(`#${e.target.id}`)
                     
                    redCaptured(targetId, e.target.id)
                    $( `.black`).off('click')
                    turnCounter (blackPiece[1], e.target.id)
                    
                } else if ($(`#${e.target.id}`).css("background-color") === "rgba(0, 0, 0, 0.5)" && target.className === 'redpieces' && $(`#${e.target.id}`).children().length <= 0) {
                //    console.log("rp", piece)
                    $(`#redpiece${redPiece[1]}`).detach().appendTo(`#${e.target.id}`)
            
                   blackCaptured(targetId, e.target.id)
                    $( `.black`).off('click')
                    turnCounter (redPiece[1], e.target.id)
                    
                }
           
        })
    }
    function turnCounter (piece, target){
        if ($(`#blackpiece${piece}`).detach().appendTo(`#${target}`) && turn % 2){
            turn++

        } else { ($(`#redpiece${piece}`).detach().appendTo(`#${target}`) && turn % 2 === 0) 
            turn++
        }
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
    function redCaptured (target, piece) {
       
        let tNum = Number(piece)
        let num = Number(target) 
        jump = Math.abs(num - tNum)
        
        if (jump === 14) {
            $(`#${tNum + blackUpRight}`).empty()
            console.log("blackC", blackCaptives)  
            blackCaptives++
            
        } 
         if (jump === 18) {
            $(`#${tNum + blackUpLeft}`).empty()
            blackCaptives++
            
        }
        document.getElementById('blackside').textContent =`${blackCaptives}`
        }
    function blackCaptured(target, piece) {
        
        console.log(target)
        let tNum = Number(piece)
        //console.log("tn", tNum)
        let num = Number(target)
        console.log(piece)
        jump = Math.abs(num - tNum)
       
        console.log(tNum)

        if (jump === 18) {
            $(`#${tNum - redDownRight}`).empty()
            console.log("right capture", tNum - redDownRight)
            redCaptives++    
           
        } 
         if (jump === 14) {
            $(`#${tNum - redDownLeft}`).empty()
            console.log("left capture", tNum - redDownLeft)
            redCaptives++    
            
        }
        document.getElementById('redside').textContent =`${redCaptives}`
    }
    function declareWinner (capturedTray) {
        if (capturedTray === 12) {
            document.querySelector('h1').innerHTML = "<h1>GAME OVER</h1>"
            $('#checkerBoard').css('pointer-events', 'none');
        }
    }
    //click Reset
    function resetClick () {
        $(`.red`).css("background-color", "red")
        $(`.black`).css("background-color", "black")
    }
    // click event listener
    $('#checkersBoard').on('click', function (e) {
        gamePlay(e.target.parentElement.id, e.target)
    })
})
