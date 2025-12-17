import { readFile } from "../shared/fileUtils.js"

async function part2() {

    const input = await readFile("day5", "input.txt")
    const freshRanges = input.split("\n\n")[0].split("\n").map(x => x.split("-").map(Number))
    
    let wasRangesUpdated = true
    let i = 0
    while(wasRangesUpdated && i < 1000) {
        wasRangesUpdated = false
        findAndUpdateRange()
        i += 1
    }

    console.log("iterations:", i)

    return freshRanges
        .map(range => range[1] - range[0] + 1)
        .reduce((acc, x) => acc + x, 0)

    function findAndUpdateRange() {
        const result = freshRanges.reduce((acc, range1, index1) => {
            
            if (acc.wasOverlapFound) {
                return acc
            }
            
            const result = findFirstOverlappingRange(range1, index1, freshRanges)
            if (result.isFound) {
                return {
                    wasOverlapFound: true,
                    range1Index: index1,
                    range2Index: result.indexOfFoundRange,
                    newRange: result.newOverlappingRange
                }
            } else {
                return acc
            }

        }, { wasOverlapFound: false })

        if (result.wasOverlapFound) {
            freshRanges.splice(result.range1Index, 1)
            freshRanges.splice(result.range2Index - 1, 1)
            freshRanges.push(result.newRange)            
            wasRangesUpdated = true
        }
    }
}

function findFirstOverlappingRange(range1, range1Index, ranges) {

    return ranges.reduce((acc, range, index) => {

        // once found, skip remaining
        if (acc.isFound) {
            return acc
        }

        // skip self
        if (index == range1Index) {
            return acc
        }

        const { isOverlapping, overlappingRange } = doRangesOverlap(range1, range)
        if (isOverlapping) {
            return {
                isFound: true,
                newOverlappingRange: overlappingRange,
                indexOfFoundRange: index
            }
        } else {
            return acc
        }

    }, { isFound: false })

}

function doRangesOverlap(range1, range2) {
    let overlappingRange = [0, 0]
    let isOverlapping = false
    // check 1 inside 2
    if (range1[0] >= range2[0] && range1[1] <= range2[1]) {
        isOverlapping = true
        overlappingRange = range2
    // check 2 inside 1
    } else if (range2[0] >= range1[0] && range2[1] <= range1[1]) {
        isOverlapping = true
        overlappingRange = range1
    // check 1 overlap before 2
    } else if (range1[0] < range2[0] && range1[1] >= range2[0] && range1[1] <= range2[1]) {
        isOverlapping = true
        overlappingRange = [range1[0], range2[1]]
    // check 2 overlap before 1
    } else if (range2[0] < range1[0] && range2[1] >= range1[0] && range2[1] <= range1[1]) {
        isOverlapping = true
        overlappingRange = [range2[0], range1[1]]
    }

    return { isOverlapping, overlappingRange }
}

part2().then(result => console.log("part 2 solution:", result))