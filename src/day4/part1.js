import { readFile } from "../shared/fileUtils.js"

async function part1() {

    const input = await readFile("day4", "input.txt")
    const grid = input.split("\n").map(row => row.split(""))

    let accessibleRollsCount = 0
        
    grid.forEach((row, rowIndex) => {
        row.forEach((spot, colIndex) => {            
            
            if (spot === "@") {
                let surroundingRollCount = 0
                
                // check top 3
                if(rowIndex > 0) {
                    surroundingRollCount += rollCount(grid[rowIndex - 1], colIndex)
                }
                
                // check middle 3
                surroundingRollCount += rollCount(row, colIndex) - 1 // minus 1 to remove self
                
                // check bottom 3
                if(rowIndex !== grid.length - 1) {
                    surroundingRollCount += rollCount(grid[rowIndex + 1], colIndex)
                }

                if (surroundingRollCount < 4) {
                    accessibleRollsCount += 1
                }
            }
        })
    })

    return accessibleRollsCount    
}

part1().then(result => console.log("part 1 solution:", result))

function rollCount(row, colIndex){
    const startIndex = colIndex === 0 ? 0 : colIndex - 1
    return row.slice(startIndex, colIndex + 2).filter(x => x === "@").length
}