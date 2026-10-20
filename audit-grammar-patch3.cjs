const fs = require("fs");
const vm = require("vm");
const path = require("path");

const root = __dirname;
const context = vm.createContext({
  console,
  window: {},
  setTimeout,
  clearTimeout
});

function load(file) {
  vm.runInContext(fs.readFileSync(file, "utf8"), context, {
    filename: file,
    timeout: 15000
  });
}

function fail(message) {
  console.error("\nAUDIT ERROR: " + message);
  process.exit(1);
}

try {
  load(path.join(root, "v12", "curriculum", "master-map.js"));

  const curriculum = context.window.WORDUP_V12_CURRICULUM;
  if (!curriculum || typeof curriculum !== "object") {
    fail("Master map did not expose WORDUP_V12_CURRICULUM.");
  }

  const levels = Object.keys(curriculum);
  if (!levels.length) fail("No curriculum levels were found.");

  context.window.WORDUP_CONTENT_REGISTRY = {};
  for (const level of levels) {
    context.window.WORDUP_CONTENT_REGISTRY[level] = [];
  }

  load(path.join(root, "v12", "engine", "curriculum-expansion.js"));

  const registry = context.window.WORDUP_CONTENT_REGISTRY;
  const lessons = Object.entries(registry).flatMap(([level, items]) =>
    Array.isArray(items)
      ? items.map(lesson => ({ ...lesson, __auditLevel: level }))
      : []
  );

  const grammar = lessons.filter(lesson =>
    String(lesson.skill || lesson.category || "").toLowerCase() === "grammar"
  );

  if (!grammar.length) {
    console.log("Registry keys:", Object.keys(registry));
    console.log("First registry sample:", JSON.stringify(
      Object.values(registry).find(Array.isArray)?.[0] || null, null, 2
    ));
    fail("No grammar lessons were found in the generated registry.");
  }

  const genericPatterns = [
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
    /avoid practising the structure in context/i
  ];

  function stringsDeep(value, output = []) {
    if (typeof value === "string") output.push(value);
    else if (Array.isArray(value)) value.forEach(v => stringsDeep(v, output));
    else if (value && typeof value === "object") {
      Object.values(value).forEach(v => stringsDeep(v, output));
    }
    return output;
  }

  function getTopic(lesson) {
    return String(lesson.topic || lesson.title || lesson.name || "(topic unavailable)");
  }

  function getQuestions(value) {
    if (Array.isArray(value)) return value;
    if (!value || typeof value !== "object") return [];
    for (const key of ["questions", "items", "quiz", "assessment"]) {
      if (Array.isArray(value[key])) return value[key];
    }
    return [];
  }

  const issues = [];
  let totalQuestions = 0;
  let checkedQuestions = 0;
  let missingExplanations = 0;
  let badOptionSets = 0;
  let genericQuestionCount = 0;

  for (const lesson of grammar) {
    const level = lesson.__auditLevel;
    const topic = getTopic(lesson);
    const contentStrings = stringsDeep({
      objective: lesson.objective,
      explanation: lesson.explanation,
      rules: lesson.rules,
      examples: lesson.examples
    });

    const genericFields = [];
    for (const field of ["objective", "explanation", "rules", "examples"]) {
      const text = stringsDeep(lesson[field]).join(" ");
      if (text && genericPatterns.some(pattern => pattern.test(text))) {
        genericFields.push(field);
      }
    }

    if (genericFields.length) {
      issues.push({
        level, topic,
        issue: "Generic teaching content: " + genericFields.join(", ")
      });
    }

    const examples = lesson.examples;
    if (!Array.isArray(examples) || examples.length < 3) {
      issues.push({ level, topic, issue: "Fewer than 3 examples or examples missing" });
    }

    const assessmentFields = ["practice", "test"];
    for (const field of assessmentFields) {
      const questions = getQuestions(lesson[field]);
      if (!questions.length) {
        issues.push({ level, topic, issue: "No readable questions in " + field });
        continue;
      }

      for (const q of questions) {
        totalQuestions++;
        const prompt = String(q.question || q.prompt || q.text || q.title || "");
        const options = q.options || q.choices || q.answers;
        const explanation = q.explanation || q.feedback || q.rationale || "";
        const allQuestionText = stringsDeep(q).join(" ");

        if (genericPatterns.some(pattern => pattern.test(prompt)) ||
            /memorize a label without|ignore the sentence.?s intended meaning|avoid practising the structure/i.test(allQuestionText)) {
          genericQuestionCount++;
          issues.push({ level, topic, issue: field + " has a generic/study-strategy question" });
        }

        if (Array.isArray(options)) {
          checkedQuestions++;
          const normalized = options.map(option =>
            typeof option === "string" ? option :
            String(option.text || option.label || option.value || "")
          );
          if (normalized.length !== 4 ||
              new Set(normalized.map(x => x.trim().toLowerCase())).size !== normalized.length) {
            badOptionSets++;
            issues.push({ level, topic, issue: field + " question has non-unique or non-four options" });
          }
        }

        if (!String(explanation).trim()) {
          missingExplanations++;
          issues.push({ level, topic, issue: field + " question lacks an explanation" });
        }
      }
    }
  }

  console.log("\n=== WORDUP GRAMMAR CONTENT AUDIT ===");
  console.log("Curriculum levels:", levels.join(", "));
  console.log("Generated lessons in registry:", lessons.length);
  console.log("Generated grammar lessons:", grammar.length);
  console.log("Questions inspected:", totalQuestions);
  console.log("Questions with recognized four-option arrays:", checkedQuestions);
  console.log("Questions with bad option sets:", badOptionSets);
  console.log("Questions lacking explanations:", missingExplanations);
  console.log("Questions flagged as generic:", genericQuestionCount);
  console.log("Total flagged issues:", issues.length);

  console.log("\n=== FIRST 35 ISSUES ===");
  if (!issues.length) console.log("No issues detected by these checks.");
  else issues.slice(0, 35).forEach((issue, index) =>
    console.log(`${index + 1}. [${issue.level}] ${issue.topic}: ${issue.issue}`)
  );

  console.log("\n=== SAMPLE GENERATED GRAMMAR LESSON ===");
  const sample = grammar.find(lesson =>
    /what is a sentence|hedging|nominalisation|nouns/i.test(getTopic(lesson))
  ) || grammar[0];

  console.log("Level:", sample.__auditLevel);
  console.log("Topic:", getTopic(sample));
  console.log("Fields:", Object.keys(sample).join(", "));
  console.log("Objective:", sample.objective);
  console.log("Explanation:", sample.explanation);
  console.log("Rules:", JSON.stringify(sample.rules, null, 2));
  console.log("Examples:", JSON.stringify(sample.examples, null, 2));
  console.log("Practice sample:", JSON.stringify(
    getQuestions(sample.practice)[0] || sample.practice, null, 2
  ));
  console.log("Test sample:", JSON.stringify(
    getQuestions(sample.test)[0] || sample.test, null, 2
  ));

  console.log("\nAudit only: no app files were changed or published.");
} catch (error) {
  console.error("\nAUDIT FAILED:", error.stack || error.message || error);
  process.exit(1);
}

