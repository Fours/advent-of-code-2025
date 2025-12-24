import { readFile } from "../shared/fileUtils.js"

// A simple Disjoint Set Union (DSU) implementation
class DisjointSetUnion {
    constructor(elements) {
        this.parent = {};
        this.size = {};
        elements.forEach(el => {
            this.parent[el] = el;
            this.size[el] = 1;
        });
    }

    find(i) {
        if (this.parent[i] === i)
            return i;
        this.parent[i] = this.find(this.parent[i]); // Path compression
        return this.parent[i];
    }

    union(i, j) {
        let rootI = this.find(i);
        let rootJ = this.find(j);
        if (rootI !== rootJ) {
            // Union by size (optional, but good practice)
            if (this.size[rootI] < this.size[rootJ])
                [rootI, rootJ] = [rootJ, rootI];
            this.parent[rootJ] = rootI;
            this.size[rootI] += this.size[rootJ];
            return true; // Merged
        }
        return false; // Already in the same set
    }

    countComponents() {
        return new Set(Object.values(this.parent).map(root => this.find(root))).size;
    }

    getComponentSizes() {
        const sizes = {};
        for (const el in this.parent) {
            const root = this.find(el);
            sizes[root] = this.size[root];
        }
        return Object.values(sizes);
    }
}

const PAIRS_COUNT = 1000 // test-input = 10, input = 1000

async function part1() {

    const input = await readFile("day8", "input.txt")
    const boxes = input.split("\n").map(line => {
        const [x, y, z] = line.split(",")
        return { x, y, z }
    })

    const distances = getDistances(boxes)
    distances.sort((a, b) => a.dist - b.dist)

    const dsu = new DisjointSetUnion(Array.from({ length: boxes.length }, (_, i) => i));

    for (let i = 0; i < PAIRS_COUNT; i ++) {

        dsu.union(distances[i].a, distances[i].b)
    }

    const circuitSizes = dsu.getComponentSizes()

    return circuitSizes
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((acc, x) => acc * x)

}

function getDistances(boxes) {

    const distances = []
    for (let i = 0; i < boxes.length; i ++) {
        for(let j = i + 1; j < boxes.length; j++) {
            distances.push({
                a: i,
                b: j,
                dist: getDistance(boxes[i], boxes[j])
            })
        }
    }

    return distances
}

function getDistance(box1, box2) {
    const dx = box1.x - box2.x
    const dy = box1.y - box2.y
    const dz = box1.z - box2.z
    return dx * dx + dy * dy + dz * dz
}

part1().then(result => console.log("part 1 solution:", result))