import { readFile } from "../shared/fileUtils.js"

const bankSize = 100
const maxBatteryCount = 12

async function part2() {

    const input = await readFile("day3", "input.txt")
    const banks = input.split("\n")    
    
    return banks.reduce((acc, bank) => acc + bankJoltage(bank), 0)
}

part2().then(result => console.log("part 2 solution:", result))

function firstMaxBattery(bank) {
    const bankList = bank.split("")
    let maxBatteryIndex = 0
    let maxBattery = "0"
    for (let i = 0; i < bankList.length; i++) {
        if (bankList[i] > maxBattery) {
            maxBatteryIndex = i
            maxBattery = bankList[i]
        }
    }
    return { index: maxBatteryIndex, battery: maxBattery }
}

function bankJoltage(bank) {
    const batteries = []
    let nextStartIndex = 0    
    for (let i = 0; i < 12; i++) {
        const nextBattery = 
            firstMaxBattery(bank.slice(nextStartIndex, bankSize - maxBatteryCount + i + 1))
        batteries.push(nextBattery)
        nextStartIndex += nextBattery.index + 1
    }
    return Number(batteries.reduce((acc, b) => acc + b.battery, ""))
}