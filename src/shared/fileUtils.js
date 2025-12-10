import fs from "node:fs/promises"
import path from "node:path"

export async function readFile(folder, fileName) {
    try { 
        const dataPath = path.join("src", folder, fileName)
        const data = await fs.readFile(dataPath, "utf8")
        return data
    } catch(err) {
        console.log(err)
        return ""
    }
}