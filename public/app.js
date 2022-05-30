$(document).ready(function () {
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

    let gamePlay = function (parent, piece) {
        let color = resetClick()

        if (parent && (piece.className === 'blackpieces king' || piece.className === 'redpieces king')) {
            let possibleKingMoves = calculateKingMovement(piece)
            let displayKingMove = displayKingMovement(possibleKingMoves, piece.className)
            let moveKing = makeMove(piece, piece.id)

        } else if (parent && (piece.className === 'blackpieces')) {
            let possibleBlackMoves = calculateBlackMovement(piece)
            let displayBlackMove = displayBlackMovement(possibleBlackMoves)
            let moveBlack = makeMove(piece, piece.id)

        } else if (parent && (piece.className === 'redpieces')) {
            let possibleRedMoves = calculateRedMovement(piece)
            let displayRedMove = displayRedMovement(possibleRedMoves)
            let moveRed = makeMove(piece, piece.id)
        }
    }
    function calculateKingMovement(target) {
        let targetId = $(target).closest('td').attr('id')
        let sqNum = Number(targetId)
        return [sqNum - dPad[1], sqNum - dPad[0], sqNum + dPad[0], sqNum + dPad[1]]
    }
    function calculateBlackMovement(target) {
        let targetId = $(target).closest('td').attr('id')
        let sqNum = Number(targetId)
        return [sqNum - dPad[1], sqNum - dPad[0]]
    }
    function calculateRedMovement(target) {
        let targetId = $(target).closest('td').attr('id')
        let sqNum = Number(targetId)
        return [sqNum + dPad[0], sqNum + dPad[1]]
    }
    function displayKingMovement(project, className) {
        let kingDirectioArray = [dPad[1], dPad[0], dPad[0], dPad[1]]
        project.forEach((proj, i) => {
            let kingJumpMove = [proj - kingDirectioArray[i], proj - kingDirectioArray[i], proj + kingDirectioArray[i], proj + kingDirectioArray[i]]

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
    function displayBlackMovement(project) {
        let blackDirectionArray = [dPad[1], dPad[0]]
        project.forEach((proj, i) => {
            let blackJumpMove = proj - blackDirectionArray[i]
            if ($(`#${proj}`).children().length <= 0 && $(`#${proj}`).hasClass('black')) {
                $(`#${proj}`).css("background-color", "rgba(0, 0, 0, 0.5)")
            }
            if ($(`#${proj}`).children().length > 0 && $(`#${blackJumpMove}`).children().length <= 0 && $(`#${blackJumpMove}`).hasClass('black') && $(`#${proj}`).children().hasClass('redpieces')) {
                $(`#${blackJumpMove}`).css("background-color", "rgba(0, 0, 0, 0.5)")

            } else if ($(`#${blackJumpMove}`).hasClass('red') || $(`#${blackJumpMove}`).children().length > 0) {
                $(`#${blackJumpMove}`).css("opacity", "1")
            }
        })
    }
    function displayRedMovement(project) {
        let redDirectionArray = [dPad[0], dPad[1]]
        project.forEach((proj, i) => {
            let redJumpMove = proj + redDirectionArray[i]
            if ($(`#${proj}`).children().length <= 0
                && $(`#${proj}`).hasClass('black')) {
                $(`#${proj}`).css("background-color", "rgba(0, 0, 0, 0.5)")

            } else if ($(`#${proj}`).children().length > 0
                && $(`#${proj}`).children().hasClass('blackpieces')
                && $(`#${redJumpMove}`).children().length <= 0
                && $(`#${redJumpMove}`).hasClass('black')) {
                $(`#${proj}`).css("opacity", "1")
                $(`#${redJumpMove}`).css("background-color", "rgba(0, 0, 0, 0.5)")

            } else if ($(`#${redJumpMove}`).hasClass('red') || $(`#${redJumpMove}`).children().length > 0) {
                $(`#${redJumpMove}`).css("opacity", "1")
            }
        })
    }

    function makeMove(target, piece) {
        blackPiece = piece.split("blackpiece")
        let targetId = $(target).closest('td').attr('id')
        redPiece = piece.split("redpiece")

        $(`.black`).on('click', function (e) {
            if ($(`#${e.target.id}`).css("background-color") === "rgba(0, 0, 0, 0.5)" && (target.className === 'blackpieces' || target.className === 'blackpieces king') && $(`#${e.target.id}`).children().length <= 0) {
                $(`#blackpiece${blackPiece[1]}`).detach().appendTo(`#${e.target.id}`)
                turnCounter(blackPiece[1], e.target.id)
                if (target.className === 'blackpieces king') {
                    redKingCaptured(targetId, e.target.id)
                } else {
                    redCaptured(targetId, e.target.id)
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
                    blackKingCaptured(targetId, e.target.id)
                } else {
                    blackCaptured(targetId, e.target.id)
                }
                if (e.target.id == 57 || e.target.id == 59 || e.target.id == 61 || e.target.id == 63) {
                    $(`#redpiece${redPiece[1]}`).attr('src', 'Pictures/redKing.png')
                    $(`#redpiece${redPiece[1]}`).attr('class', 'redpieces king')
                }
                $(`.black`).off('click')
            }
        })
    }

    function turnCounter(piece, target) {
        if ($(`#blackpiece${piece}`).detach().appendTo(`#${target}`) && turn % 2) {
            turn++
        } else {
            ($(`#redpiece${piece}`).detach().appendTo(`#${target}`) && turn % 2 === 0)
            turn++
        }
    }

    function changeTurnOrDeclareWinner(capturedTray) {

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
    }

    function redKingCaptured(target, piece) {
        let jump = Number(target) - Number(piece)

        if (jump === -14) {
            $(`#${Number(piece) - dPad[0]}`).empty()
            blackCaptives++
            redPieces--
        }
        if (jump === 14) {
            $(`#${Number(piece) + dPad[0]}`).empty()
            blackCaptives++
            redPieces--
        }
        if (jump === 18) {
            $(`#${Number(piece) + dPad[1]}`).empty()
            blackCaptives++
            redPieces--
        }
        if (jump === -18) {
            $(`#${Number(piece) - dPad[1]}`).empty()
            blackCaptives++
            redPieces--
        }
        $('#blackside').text(`${blackCaptives}`)
        changeTurnOrDeclareWinner(blackCaptives)
    }

    function blackKingCaptured(target, piece) {
        let jump = Number(target) - Number(piece)
        if (jump === -14) {
            $(`#${Number(piece) - dPad[0]}`).empty()
            redCaptives++
            blackPieces--
        }
        if (jump === 14) {
            $(`#${Number(piece) + dPad[0]}`).empty()
            redCaptives++
            blackPieces--
        }
        if (jump === 18) {
            $(`#${Number(piece) + dPad[1]}`).empty()
            redCaptives++
            blackPieces--
        }
        if (jump === -18) {
            $(`#${Number(piece) - dPad[1]}`).empty()
            redCaptives++
            blackPieces--
        }
        $('#redside').text(`${redCaptives}`)
        changeTurnOrDeclareWinner(redCaptives)
    }

    function redCaptured(target, piece, test) {

        let tNum = Number(piece)
        let num = Number(target)
        jump = Math.abs(num - tNum)


        if (jump === 14) {
            $(`#${tNum + dPad[0]}`).empty()
            blackCaptives++
            redPieces--

        }
        if (jump === 18) {
            $(`#${tNum + dPad[1]}`).empty()
            blackCaptives++
            redPieces--

        }
        $('#blackside').text(`${blackCaptives}`)
        changeTurnOrDeclareWinner(blackCaptives)
    }

    function blackCaptured(target, piece) {
        let tNum = Number(piece)
        let num = Number(target)
        jump = Math.abs(num - tNum)


        if (jump === 18) {
            $(`#${tNum - dPad[1]}`).empty()
            redCaptives++
            blackPieces--

        }
        if (jump === 14) {
            $(`#${tNum - dPad[0]}`).empty()
            redCaptives++
            blackPieces--

        }
        $('#redside').text(`${redCaptives}`)
        changeTurnOrDeclareWinner(redCaptives)
    }
    function resetClick() {
        $(`.red`).css("background-color", "red")
        $(`.black`).css("background-color", "black")
    }

    $('#checkersBoard').on('click', function (e) {
        gamePlay(e.target.parentElement.id, e.target)
    })
})
