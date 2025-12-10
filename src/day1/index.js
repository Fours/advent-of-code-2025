import { readFile } from "../shared/fileUtils.js"

async function part1() {

    const input = await readFile("day1", "input.txt")
    const turns = input.split("\n")
    const startPosition = 50

    return turns.reduce((acc, turn) => {

        const turnDir = turn.slice(0, 1)
        const turnValue = parseInt(turn.slice(1), 10) % 100
        const number = turnDir === "R" ? acc.value + turnValue : acc.value - turnValue

        let nextValue = number
        if (nextValue < 0) {
            nextValue = 100 + nextValue
        } else if (nextValue > 99) {
            nextValue = nextValue - 100
        }

        return { 
            zeros: nextValue === 0 ? acc.zeros + 1 : acc.zeros, 
            value: nextValue
        }
        
    }, {zeros: 0, value: startPosition})
}

part1().then(result => console.log("part 1 solution:", result.zeros))

