import { readFile } from "../shared/fileUtils.js"

async function part1() {

    const input = await readFile("day5", "input.txt")
    const [strFreshRanges, strIngredientIds] = input.split("\n\n").map(x => x.split("\n"))

    const freshRanges = strFreshRanges.map(x => x.split("-").map(Number))
    const ingredientIds = strIngredientIds.map(Number)

    return ingredientIds.filter(id => isFresh(id, freshRanges)).length
}

function isFresh(ingredientId, freshRanges) {
    return freshRanges.reduce((acc, freshRange) => {
        return acc || (ingredientId >= freshRange[0] && ingredientId <= freshRange[1])
    }, false)
}

part1().then(result => console.log("part 1 solution:", result))