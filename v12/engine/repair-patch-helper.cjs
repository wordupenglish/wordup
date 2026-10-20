const fs = require("fs");
const file = process.argv[2];
let s = fs.readFileSync(file, "utf8");

const marker = "function replaceWithinFunction(";

if (!s.includes(marker)) {
    throw new Error("Expected patch function not found. No engine changes made.");
}

if (!s.includes("function replaceExactlyOne(")) {
    const helper = `function replaceExactlyOne(text, pattern, replacement, label) {
    const matches = text.match(pattern);
    if (!matches || matches.length !== 1) {
        throw new Error(label + ": expected exactly one match, found " + (matches ? matches.length : 0));
    }
    return text.replace(pattern, replacement);
}

`;
    s = s.replace(marker, helper + marker);
    fs.writeFileSync(file, s, "utf8");
}

console.log("Checking patch-script syntax...");
