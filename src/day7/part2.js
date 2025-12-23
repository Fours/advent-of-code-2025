import { readFile } from "../shared/fileUtils.js"

async function part2() {

    const input = await readFile("day7", "input.txt")
    const grid = input.split("\n").map(x => x.split(""))

    let beams = {}; 

    for (let x = 0; x < grid[0].length; x++) {
        if (grid[0][x] === 'S') {
            beams[x] = 1;
            console.log("found S at", x)
            break;
        }
    }

    for (let y = 1; y < grid.length - 1; y++) {
        
        let nextBeams = {};

        for (const x in beams) {
            const beamCount = beams[x];
            const cell = grid[y][x];
            
            if (cell === '.') {
                
                if (nextBeams[x] === undefined) {
                    nextBeams[x] = 0;
                } 
                nextBeams[x] += beamCount;

            } else if (cell === '^') {
                
                const leftX = Number(x) - 1;
                const rightX = Number(x) + 1;

                if (nextBeams[leftX] === undefined) {
                    nextBeams[leftX] = 0;
                }                
                nextBeams[leftX] += beamCount;

                if (nextBeams[rightX] === undefined) {
                    nextBeams[rightX] = 0;
                } 
                nextBeams[rightX] += beamCount;

            }
        }
        beams = nextBeams;
    }

    let totalBeams = 0;
    for (const x in beams) {
        totalBeams += beams[x];
    }

    return totalBeams

}

part2().then(result => console.log("part 2 solution:", result))

