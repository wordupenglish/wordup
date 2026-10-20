const fs = require("fs");
const vm = require("vm");
const path = require("path");
const root = __dirname;
const context = vm.createContext({
  console, window: {}, setTimeout, clearTimeout
});
function load(file) {
  vm.runInContext(fs.readFileSync(file, "utf8"), context, {
    filename: file, timeout: 15000
  });
}
load(path.join(root, "v12", "curriculum", "master-map.js"));
const curriculum = context.window.WORDUP_V12_CURRICULUM;
if (!curriculum) throw Error("Master curriculum not loaded.");
context.window.WORDUP_CONTENT_REGISTRY = {};
for (const level of Object.keys(curriculum)) {
  context.window.WORDUP_CONTENT_REGISTRY[level] = [];
}
load(path.join(root, "v12", "engine", "curriculum-expansion.js"));

const registry = context.window.WORDUP_CONTENT_REGISTRY;
const wanted = /^(questions|rhetorical grammar|sentence-level editing|clauses|phrase structure)$/i;
const generic = [
  /this .* grammar lesson focuses on/i,
  /understand and use .* accurately in clear english sentences/i,
  /identify the grammatical structure/i,
  /understand its meaning and function/i,
  /notice the structure in real sentences/i,
  /use the structure in an appropriate context/i,
  /check the final sentence for accuracy/i,
  /learners study .* in meaningful sentences/i,
  /the structure should be understood through both form and meaning/i,
  /when studying .* what should you examine/i,
  /avoid practising the structure in context/i,
  /memorize a label without|ignore the sentence.?s intended meaning|avoid practising the structure/i
];
function getQuestions(value) {
  if (Array.isArray(value)) return value;
  if (!value || typeof value !== "object") return [];
  for (const key of ["questions", "items", "quiz", "assessment"]) {
    if (Array.isArray(value[key])) return value[key];
  }
  return [];
}
function strings(value, out = []) {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach(x => strings(x, out));
  else if (value && typeof value === "object") Object.values(value).forEach(x => strings(x, out));
  return out;
}
let found = 0;
for (const [level, items] of Object.entries(registry)) {
  if (!Array.isArray(items)) continue;
  for (const lesson of items) {
    if (String(lesson.skill || lesson.category || "").toLowerCase() !== "grammar") continue;
    const topic = String(lesson.topic || lesson.title || lesson.name || "");
    const fieldFlags = ["objective", "explanation", "rules", "examples"].filter(field =>
      generic.some(re => re.test(strings(lesson[field]).join(" ")))
    );
    const questionFlags = [];
    for (const field of ["practice", "test"]) {
      for (const q of getQuestions(lesson[field])) {
        const prompt = String(q.question || q.prompt || q.text || q.title || "");
        if (generic.some(re => re.test(prompt)) ||
            generic.some(re => re.test(strings(q).join(" ")))) {
          questionFlags.push({
            field,
            question: prompt,
            options: q.options || q.choices || q.answers,
            explanation: q.explanation || q.feedback || q.rationale
          });
        }
      }
    }
    if (!fieldFlags.length && !questionFlags.length && !wanted.test(topic)) continue;
    found++;
    console.log("\n" + "=".repeat(70));
    console.log("LEVEL:", level, "| TOPIC:", topic);
    console.log("FLAGGED FIELDS:", fieldFlags.join(", ") || "none");
    for (const field of ["objective", "explanation", "rules", "examples"]) {
      console.log(field.toUpperCase() + ":", JSON.stringify(lesson[field], null, 2));
    }
    if (questionFlags.length) {
      console.log("FLAGGED QUESTIONS:", JSON.stringify(questionFlags, null, 2));
    }
    if (wanted.test(topic)) {
      for (const field of ["practice", "test"]) {
        console.log(field.toUpperCase() + " SAMPLE:",
          JSON.stringify(getQuestions(lesson[field]).slice(0, 3), null, 2));
      }
    }
  }
}
console.log("\nDiagnostic complete. Matching lessons printed:", found);
console.log("No files were modified by this diagnostic.");
