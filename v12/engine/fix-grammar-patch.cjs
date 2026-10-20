const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const patch = path.join(__dirname, "patch-grammar-guides.cjs");
let p = fs.readFileSync(patch, "utf8");
const start = p.indexOf("function replaceExactlyOne(");
const end = p.indexOf("fs.copyFileSync(file, backup);", start);

if (start < 0 || end < 0) throw new Error("Patch script structure unexpected; no changes made.");

const corrected = String.raw`
function replaceWithinFunction(text, functionName, replacement, label) {
    const marker = "function " + functionName + "(";
    const start = text.indexOf(marker);
    if (start < 0) throw new Error(label + ": function not found");
    const next = text.indexOf("\n    function ", start + marker.length);
    const end = next < 0 ? text.length : next;
    const section = text.slice(start, end);
    const pattern = /        if \(skill === "grammar"\) \{\n[\s\S]*?\n        \}\n\n        if \(skill === "vocabulary"\) \{/g;
    const matches = section.match(pattern);
    if (!matches || matches.length !== 1) {
        throw new Error(label + ": expected one grammar block inside " + functionName + ", found " + (matches ? matches.length : 0));
    }
    const changed = section.replace(pattern, replacement);
    return text.slice(0, start) + changed + text.slice(end);
}

let updated = source;

updated = replaceExactlyOne(
    updated,
    /    function buildObjective\(level, skill, topic\) \{/g,
    helper + "    function buildObjective(level, skill, topic) {",
    "Insert teaching guide"
);

updated = replaceWithinFunction(
    updated, "buildObjective",
    '        if (skill === "grammar") {\n            return grammarTeachingGuide(topic).objective;\n        }\n\n        if (skill === "vocabulary") {',
    "Grammar objective"
);

updated = replaceWithinFunction(
    updated, "buildExplanation",
    '        if (skill === "grammar") {\n            return grammarTeachingGuide(topic).explanation;\n        }\n\n        if (skill === "vocabulary") {',
    "Grammar explanation"
);

updated = replaceWithinFunction(
    updated, "buildRules",
    '        if (skill === "grammar") {\n            return grammarTeachingGuide(topic).rules;\n        }\n\n        if (skill === "vocabulary") {',
    "Grammar rules"
);

`;

p = p.slice(0, start) + corrected + p.slice(end);
fs.writeFileSync(patch, p, "utf8");

const checkPatch = spawnSync(process.execPath, ["--check", patch], { encoding: "utf8" });
if (checkPatch.status !== 0) throw new Error("Corrected patch script has a syntax error:\n" + checkPatch.stderr);

console.log("Patch script corrected. Running it now...");
const run = spawnSync(process.execPath, [patch], { encoding: "utf8" });
if (run.stdout) process.stdout.write(run.stdout);
if (run.stderr) process.stderr.write(run.stderr);
process.exit(run.status === null ? 1 : run.status);
