import { readFile } from "../shared/fileUtils.js"

async function part1() {

    const input = await readFile("day2", "input.txt")
    const ranges = input.split(",")
    const invalidIds = []

    ranges.forEach(range => {

        const [start, end] = range.split("-")
        if (start.length % 2 > 0 && start.length === end.length) {
            return
        }

        const startNum = parseInt(start, 10)
        const endNum = parseInt(end, 10)

        for(let i = startNum; i <= endNum; i++) {
            
            const numString = i.toString();
            const segment1 = numString.slice(0, numString.length / 2)
            const segment2 = numString.slice(numString.length / 2)
            if (segment1 === segment2) {
                invalidIds.push(i)
            }
        }
    })

    return invalidIds.reduce((acc, value) => acc + value)
}

part1().then(result => console.log("part 1 solution:", result))