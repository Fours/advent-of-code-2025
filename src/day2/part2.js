import { readFile } from "../shared/fileUtils.js"

async function part2() {

    const input = await readFile("day2", "input.txt")
    const ranges = input.split(",")
    const invalidIds = []

    ranges.forEach(range => {

        const [start, end] = range.split("-")
        const startNum = parseInt(start, 10)
        const endNum = parseInt(end, 10)

        for(let i = startNum; i <= endNum; i++) {
            
            const numString = i.toString();
            if (is1Repeated(numString)) {
                invalidIds.push(i)
            } else if (isRepeated(2, numString)) {
                invalidIds.push(i)
            } else if (isRepeated(3, numString)) {
                invalidIds.push(i)
            } else if (isRepeated(4, numString)) {
                invalidIds.push(i)
            } else if (isRepeated(5, numString)) {
                invalidIds.push(i)
            } else if (isRepeated(6, numString)) {
                invalidIds.push(i)
            } else if (isRepeated(7, numString)) {
                invalidIds.push(i) 
            } else if (isRepeated(8, numString)) {
                invalidIds.push(i)
            }
        }
    })

    const invalidIdsSet = new Set(invalidIds)
    return [...invalidIdsSet].reduce((acc, value) => acc + value)
}

part2().then(result => console.log("part 2 solution:", result))

function is1Repeated(str) {
    if (str.length === 1) {
        return false
    }
    const set = new Set(str.split(""))
    return [...set].length === 1
}

function isRepeated(size, str) {
    if (str.length % size !== 0 || str.length === size) {
        return false
    }
    const items = []
    const chunksCount = str.length / size
    for (let i = 0; i <= chunksCount + size + 1; i += size) {
        const slice = str.slice(i, i + size)
        if (slice !== "") {
            items.push(str.slice(i, i + size))    
        }
    }
    const set = new Set(items)
    return [...set].length === 1
}