import { readFile } from "../shared/fileUtils.js"

const bankSize = 100

async function part1() {

    const input = await readFile("day3", "input.txt")
    const banks = input.split("\n")    
    
    return banks.reduce((acc, bank) => acc + bankJoltage(bank), 0)
}

part1().then(result => console.log("part 1 solution:", result))

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
    const firstBattery = firstMaxBattery(bank.slice(0, bankSize - 1))
    const secondBattery = firstMaxBattery(bank.slice(firstBattery.index + 1))
    return Number(firstBattery.battery + secondBattery.battery)
}