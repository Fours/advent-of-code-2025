import { readFile } from "../shared/fileUtils.js"

async function part1() {

    const input = await readFile("day6", "input.txt")
    const grid = input.split("\n").map(line => {
        return line.trim()
            .replaceAll("       ", ",")
            .replaceAll("      ", ",")
            .replaceAll("     ", ",")
            .replaceAll("    ", ",")
            .replaceAll("   ", ",")
            .replaceAll("  ", ",")
            .replaceAll(" ", ",")
            .split(",")
    })
    
    let total = 0;

    for (let i = 0; i < grid[0].length; i++) {
        if(grid[4][i] === "+") {
            total += Number(grid[0][i]) + Number(grid[1][i]) + Number(grid[2][i]) + Number(grid[3][i])
        } else {
            total += Number(grid[0][i]) * Number(grid[1][i]) * Number(grid[2][i]) * Number(grid[3][i])
        }
    }
    
    return total
}

part1().then(result => console.log("part 1 solution:", result))