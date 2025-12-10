import { readFile } from "../shared/fileUtils.js"

async function part2() {

    const input = await readFile("day1", "input.txt")
    const turns = input.split("\n")
    const startPosition = 50

    return turns.reduce((acc, turn) => {

        let newZeros = acc.value === 0 ? -1 : 0
        const turnDir = turn.slice(0, 1)
        const turnValue = parseInt(turn.slice(1), 10)
        let nextDialValue
        
        if (turnDir === "R") {

            let dialValue = acc.value
            for (let i = 0; i <= turnValue; i++) {
                if (dialValue === 100) {
                    dialValue = 0                    
                }
                if (dialValue === 0) {
                    newZeros += 1
                }
                nextDialValue = dialValue
                dialValue += 1
            }

        } else {

            let dialValue = acc.value
            for (let i = 0; i <= turnValue; i++) {
                if (dialValue === -1) {
                    dialValue = 99
                }
                if (dialValue === 0) {
                    newZeros += 1
                }
                nextDialValue = dialValue
                dialValue -= 1
            }
            
        }

        return { 
            zeros: acc.zeros + newZeros, 
            value: nextDialValue
        }
        
    }, {zeros: 0, value: startPosition})
}

part2().then(result => console.log("part 2 solution:", result.zeros))

