function createGame() {
    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    }

    function addPlayer(command) {
        const { playerId, playerX, playerY } = command

        state.players[playerId] = { x: playerX, y: playerY }
    }

    function removePlayer(command) {
        const { playerId } = command

        delete state.players[playerId]
    }

    function addFruit(command) {
        const { fruitId, fruitX, fruitY } = command

        state.fruits[fruitId] = { x: fruitX, y: fruitY }
    }

    function removeFruit(command) {
        const { fruitId } = command

        delete state.fruits[fruitId]
    }

    function movePlayer(command) {
        console.log(`Moving ${command.playerId} with ${command.keyPressed}`)

        const acceptMoves = {
            ArrowUp(player) {
                player.y = Math.max(player.y - 1, 0)
            },
            ArrowDown(player) {
                player.y = Math.min(player.y + 1, state.screen.height - 1)
            },
            ArrowLeft(player) {
                player.x = Math.max(player.x - 1, 0)
            },
            ArrowRight(player) {
                player.x = Math.min(player.x + 1, state.screen.width - 1)
            }
        }

        const { playerId, keyPressed } = command
        const player = state.players[playerId]
        const moveFunction = acceptMoves[keyPressed]

        if (player && moveFunction) {
            moveFunction(player)
            checkForFruitCollision(playerId)
        }
    }

    function checkForFruitCollision(playerId) {
        const { x: playerX, y: playerY } = state.players[playerId]

        for (const fruitId in state.fruits) {
            const { x: fruitX, y: fruitY } = state.fruits[fruitId]

            if (fruitX == playerX && fruitY == playerY) removeFruit({ fruitId })
        }
    }

    return {
        movePlayer,
        state,
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit
    }
}

export default createGame