import { readFile } from "../shared/fileUtils.js"

async function part1() {

    const input = await readFile("day7", "input.txt")
    const grid = input.split("\n").map(x => x.split(""))
    startBeam(grid)

    let splitCount = 0

    for(let i = 0; i < grid.length - 1; i++) {

        for(let j = 0; j < grid[0].length; j++) {

            if (grid[i][j] === "|") {
                // check continue
                if (grid[i + 1][j] === ".") {
                    grid[i + 1][j] = "|"
                }
                // check split
                if (grid[i + 1][j] === "^") {
                    grid[i + 1][j - 1] = "|"
                    grid[i + 1][j + 1] = "|"
                    splitCount += 1
                }
            }
        }
    }

    return splitCount    
}

function startBeam(grid) {
    grid[0].forEach((spot, index) => {
        if (spot === "S") {
            grid[1][index] = "|"
        }
    })
}

part1().then(result => console.log("part 1 solution:", result))

