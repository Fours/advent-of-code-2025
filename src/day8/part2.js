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

async function part2() {

    const input = await readFile("day8", "input.txt")
    const boxes = input.split("\n").map(line => {
        const [x, y, z] = line.split(",")
        return { x, y, z }
    })

    const distances = getDistances(boxes)
    distances.sort((a, b) => a.dist - b.dist)

    const dsu = new DisjointSetUnion(Array.from({ length: boxes.length }, (_, i) => i));

    let lastDistance
    for (const distance of distances) {

        dsu.union(distance.a, distance.b)
        if(dsu.countComponents() === 1) {
            lastDistance = distance
            break
        }
    }

    return boxes[lastDistance.a].x * boxes[lastDistance.b].x
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

part2().then(result => console.log("part 2 solution:", result))