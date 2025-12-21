import { readFile } from "../shared/fileUtils.js"

async function part2() {

    const input = await readFile("day6", "input.txt")
    const grid = createGrid(input)
    const numbers = transformGrid(grid)    

    return addNumbers(numbers)
}

function createGrid(input) {

    const charGrid = input.split("\n").map(x => x.split(""))

    for (let i = 0; i < charGrid[0].length; i++) {
        if(charGrid[0][i] === " " &&
            charGrid[1][i] === " " &&
            charGrid[2][i] === " " &&
            charGrid[3][i] === " "  &&
            charGrid[4][i] === " "
        ) {
            charGrid[0][i] = ","
            charGrid[1][i] = ","
            charGrid[2][i] = ","
            charGrid[3][i] = ","
            charGrid[4][i] = ","
        }
    }

    return charGrid.map(x => x.join("").split(","))
}

function transformGrid(grid) {
    
    let numbers = []
    for (let i = 0; i < grid[0].length; i++) {

        const firstRow = grid[0][i]
        const secondRow = grid[1][i]
        const thirdRow = grid[2][i]
        const forthRow = grid[3][i]
        const fifthRow = grid[4][i]

        const cell = []
        for (let j = firstRow.length - 1; j >= 0; j--) {            
            let number = Number((firstRow[j] + secondRow[j] + thirdRow[j] + forthRow[j]).trim())
            cell.push(number)
        }
        cell.push(fifthRow[0])

        numbers.push(cell)
    }
    
    return numbers
}

function addNumbers(numbers) {

    let total = 0

    numbers.forEach(row => {

        if (row[row.length - 1] === "+") {
            let subTotal = 0
            for (let i = 0; i < row.length - 1; i++) {
                subTotal = subTotal + row[i]
            }
            total += subTotal
        } else {
            let subTotal = 1
            for (let i = 0; i < row.length - 1; i++) {
                subTotal = subTotal * row[i]
            }
            total += subTotal
        }
    })

    return total
}

part2().then(result => console.log("part 2 solution:", result))