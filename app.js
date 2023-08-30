$(document).ready(() => {
    const dPad = [7, 9, 2]
    let redCaptives = 0
    let blackCaptives = 0
    let redPieces = 12
    let blackPieces = 12
    let turn = 1
    let redPiece, blackPiece, jump

    if (turn === 1) {
        document.querySelector('h1').innerHTML = "<h1>BLACK STARTS!</h1>"
        $('.redpieces').css('pointer-events', 'none');
    }

    const gamePlay = (parent, piece) => {
        resetClick()

        if (parent && (piece.className === 'blackpieces king' || piece.className === 'redpieces king')) {
            let possibleKingMoves = calculateKingMovement(piece)
            displayKingMovement(possibleKingMoves, piece.className)
            makeMove(piece, piece.id)

        } else if (parent && (piece.className === 'blackpieces')) {
            let possibleBlackMoves = calculateMovement(piece)
            displayMovement(possibleBlackMoves, 'redpieces')
            makeMove(piece, piece.id)

        } else if (parent && (piece.className === 'redpieces')) {
            let possibleRedMoves = calculateMovement(piece)
            displayMovement(possibleRedMoves, 'blackpieces')
            makeMove(piece, piece.id)
        }
    }
    const calculateKingMovement = (piece) => {
        let targetId = $(piece).closest('td').attr('id')
        let sqNum = Number(targetId)
        return [sqNum - dPad[1], sqNum - dPad[0], sqNum + dPad[0], sqNum + dPad[1]]
    }
    const calculateMovement = (piece) => {
        let targetId = $(piece).closest('td').attr('id')
        let sqNum = Number(targetId)
        let result = piece.className === 'redpieces' ? [sqNum + dPad[0], sqNum + dPad[1]] : [sqNum - dPad[1], sqNum - dPad[0]] 
        return result
    }
    const displayKingMovement = (project, className) => {
        let directionList = [dPad[1], dPad[0], dPad[0], dPad[1]]
        project.forEach((proj, i) => {
            let kingJumpMove = [proj - directionList[i], proj - directionList[i], proj + directionList[i], proj + directionList[i]]

            if ($(`#${proj}`).children().length <= 0 && $(`#${proj}`).hasClass('black')) {
                $(`#${proj}`).css("background-color", "rgba(0, 0, 0, 0.5)")
            }
            if (className === 'blackpieces king') {
                if ($(`#${proj}`).children().length > 0 && $(`#${kingJumpMove[i]}`).children().length <= 0 && $(`#${kingJumpMove[i]}`).hasClass('black') && ($(`#${proj}`).children().hasClass('redpieces') || $(`#${proj}`).children().hasClass('redpieces king'))) {
                    $(`#${kingJumpMove[i]}`).css("background-color", "rgba(0, 0, 0, 0.5)")
                }
            } else if (className === 'redpieces king') {
                if ($(`#${proj}`).children().length > 0 && $(`#${kingJumpMove[i]}`).children().length <= 0 && $(`#${kingJumpMove[i]}`).hasClass('black') && ($(`#${proj}`).children().hasClass('blackpieces') || $(`#${proj}`).children().hasClass('blackpieces king'))) {
                    $(`#${kingJumpMove[i]}`).css("background-color", "rgba(0, 0, 0, 0.5)")
                }

            } else if ($(`#${kingJumpMove[i]}`).hasClass('red') || $(`#${kingJumpMove[i]}`).children().length > 0) {
                $(`#${kingJumpMove[i]}`).css("opacity", "1")
            }
        })
    }
    
    const displayMovement = (project, pieceName) => {
        let directionList = pieceName === 'redpieces' ? [dPad[1], dPad[0]] : [dPad[0], dPad[1]]

        project.forEach((proj, i) => {
            let jumpMove = pieceName === 'redpieces' ? proj - directionList[i] :  proj + directionList[i]

            if ($(`#${proj}`).children().length <= 0
                && $(`#${proj}`).hasClass('black')) {
                $(`#${proj}`).css("background-color", "rgba(0, 0, 0, 0.5)")

            } else if ($(`#${proj}`).children().length > 0
                && $(`#${proj}`).children().hasClass(pieceName)
                && $(`#${jumpMove}`).children().length <= 0
                && $(`#${jumpMove}`).hasClass('black')) {
                $(`#${proj}`).css("opacity", "1")
                $(`#${jumpMove}`).css("background-color", "rgba(0, 0, 0, 0.5)")

            } else if ($(`#${jumpMove}`).hasClass('red') || $(`#${jumpMove}`).children().length > 0) {
                $(`#${jumpMove}`).css("opacity", "1")
            }
        })
        return
    }

    const makeMove = (target, piece) => {
        blackPiece = piece.split("blackpiece")
        let targetId = $(target).closest('td').attr('id')
        redPiece = piece.split("redpiece")

        $(`.black`).on('click', (e) => {
            if ($(`#${e.target.id}`).css("background-color") === "rgba(0, 0, 0, 0.5)" && (target.className === 'blackpieces' || target.className === 'blackpieces king') && $(`#${e.target.id}`).children().length <= 0) {
                $(`#blackpiece${blackPiece[1]}`).detach().appendTo(`#${e.target.id}`)
                turnCounter(blackPiece[1], e.target.id)
                if (target.className === 'blackpieces king') {
                    capturedKing(targetId, e.target.id, blackCaptives, redPieces, "#redside")
                } else {
                    captured(targetId, e.target.id, blackCaptives, redPieces, "#redside")
                }
                if (e.target.id == 2 || e.target.id == 4 || e.target.id == 6 || e.target.id == 8) {
                    $(`#blackpiece${blackPiece[1]}`).attr('src', 'Pictures/blackKing.png')
                    $(`#blackpiece${blackPiece[1]}`).attr('class', 'blackpieces king')
                }
                $(`.black`).off('click')

            } else if ($(`#${e.target.id}`).css("background-color") === "rgba(0, 0, 0, 0.5)" && (target.className === 'redpieces' || target.className === 'redpieces king') && $(`#${e.target.id}`).children().length <= 0) {
                $(`#redpiece${redPiece[1]}`).detach().appendTo(`#${e.target.id}`)
                turnCounter(redPiece[1], e.target.id)
                if (target.className === 'redpieces king') {
                    capturedKing(targetId, e.target.id, redCaptives, blackPieces, "#blackside")
                } else {
                    captured(targetId, e.target.id, redCaptives, blackPieces, "#blackside")
                }
                if (e.target.id == 57 || e.target.id == 59 || e.target.id == 61 || e.target.id == 63) {
                    $(`#redpiece${redPiece[1]}`).attr('src', 'Pictures/redKing.png')
                    $(`#redpiece${redPiece[1]}`).attr('class', 'redpieces king')
                }
                $(`.black`).off('click')
            }
        })
    }

    const turnCounter = (piece, target) => {
        if ($(`#blackpiece${piece}`).detach().appendTo(`#${target}`) && turn % 2) {
            turn++
        } else {
            ($(`#redpiece${piece}`).detach().appendTo(`#${target}`) && turn % 2 === 0)
            turn++
        }
    }

    const changeTurnOrDeclareWinner = (capturedTray) => {

        if (capturedTray === 12 && turn % 2) {

            $('#display').text('GAME OVER! - RED WINS!')
            $('.redpieces').css('pointer-events', 'none')
            $('.blackpieces').css('pointer-events', 'none')

        } else if (capturedTray === 12 && turn % 2 === 0) {
            $('#display').text('GAME OVER! - BLACK WINS!')
            $('.redpieces').css('pointer-events', 'none')
            $('.blackpieces').css('pointer-events', 'none')

        } else if (turn % 2) {
            $('.blackpieces').css('pointer-events', 'auto')
            $('#display').text("BLACK'S TURN")
            $('.redpieces').css('pointer-events', 'none')

        } else if (turn % 2 === 0) {
            $('.redpieces').css('pointer-events', 'auto')
            $('#display').text("RED'S TURN")
            $('.blackpieces').css('pointer-events', 'none')
        }
        return
    }

    const capturedKing = (target, piece, captives, pieces, jail) => {
        let tNum = Number(piece)
        let num = Number(target)
        jump = num - tNum
        
        if (jump === -14) {
            $(`#${tNum - dPad[0]}`).empty()
            captives++
            pieces--
        } else if (jump === 14) {
            $(`#${tNum + dPad[0]}`).empty()
            captives++
            pieces--
        } else if (jump === 18) {
            $(`#${tNum + dPad[1]}`).empty()
            captives++
            pieces--
        } else if (jump === -18) {
            $(`#${tNum - dPad[1]}`).empty()
            captives++
            pieces--
        }
        $(jail).text(`${captives}`)
        changeTurnOrDeclareWinner(captives)
        return
    }

    const captured = (target, piece, captives, pieces, jail) => {
        let tNum = Number(piece)
        let num = Number(target)
        jump = Math.abs(num - tNum)

        if (jump === 18) {
            jail.includes("red") && $(`#${tNum + dPad[1]}`).empty()
            jail.includes("black") && $(`#${tNum - dPad[1]}`).empty()
            captives++
            pieces--

        } else if (jump === 14) {
            jail.includes("red") && $(`#${tNum + dPad[0]}`).empty()
            jail.includes("black") && $(`#${tNum - dPad[0]}`).empty()
            captives++
            pieces--

        }
        $(jail).text(`${captives}`)
        changeTurnOrDeclareWinner(captives)
        return
    }

    const resetClick = () => {
        $(`.red`).css("background-color", "red")
        $(`.black`).css("background-color", "black")
        return
    }

    $('#checkersBoard').on('click',(e) => {
        gamePlay(e.target.parentElement.id, e.target)
    })
})
