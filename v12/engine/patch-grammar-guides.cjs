const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const file = path.join(__dirname, "curriculum-expansion.js");
const source = fs.readFileSync(file, "utf8");
const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\..+/, "").replace("T", "-");
const backup = file + ".backup-topic-guides-" + stamp;

const helper = String.raw`
    function grammarTeachingGuide(topic) {
        const t = String(topic).toLowerCase();
        const guides = [
            [/present simple/, "Use the present simple for habits, routines, facts, and regular situations.", "The present simple describes what happens regularly or what is generally true. With he, she, and it, most main verbs take -s or -es. Questions and negatives use do or does followed by the base verb.", ["Choose it for routines, habits, and facts.", "Add -s or -es to most verbs with he, she, or it.", "Use do or does to form questions.", "Use do not or does not for negatives.", "Keep the main verb in its base form after do or does."]],
            [/present continuous|present progressive/, "Describe actions happening now or temporary situations.", "The present continuous uses am, is, or are followed by a verb ending in -ing. It commonly describes an action in progress now or a temporary situation.", ["Choose the correct form of be: am, is, or are.", "Add -ing to the main verb.", "Use the tense for actions in progress or temporary situations.", "Include a time expression when it clarifies the meaning.", "Do not omit the form of be."]],
            [/past simple|simple past/, "Describe completed past actions and events.", "The past simple refers to completed events in the past. Regular verbs often end in -ed, while irregular verbs have their own past forms. Questions and negatives generally use did plus the base verb.", ["Look for a finished past time or event.", "Use the past form in affirmative statements.", "Use did plus the base verb in questions.", "Use did not plus the base verb in negatives.", "Learn common irregular past forms."]],
            [/present perfect/, "Connect past experiences or events with the present.", "The present perfect uses have or has plus the past participle. It can describe experiences, recent events, or situations that began in the past and remain relevant now.", ["Use have with I, you, we, and they.", "Use has with he, she, and it.", "Follow have or has with a past participle.", "Use it when the present connection matters.", "Distinguish it from a finished past time expressed with the past simple."]],
            [/past continuous|past progressive/, "Describe an action that was in progress at a past time.", "The past continuous uses was or were plus verb-ing. It often provides background or describes an action in progress when another event occurred.", ["Use was with I, he, she, and it.", "Use were with you, we, and they.", "Follow was or were with verb-ing.", "Use it for an action in progress at a past time.", "Combine it with the past simple when a shorter event interrupts an ongoing action."]],
            [/future|going to|will and/, "Talk about future plans, predictions, and decisions.", "English uses several forms for future meaning. Will often expresses predictions or decisions made at the moment; be going to commonly expresses intentions or predictions based on present evidence.", ["Identify whether the meaning is a plan, prediction, or decision.", "Use will plus the base verb.", "Use the correct form of be before going to.", "Do not add -s to the verb after will.", "Choose the form that best fits the context."]],
            [/article|a an the/, "Choose articles according to meaning and the noun's sound.", "A and an introduce a singular countable noun when it is not identified as a particular one. The points to something specific or already identifiable. The choice between a and an depends on the initial sound, not simply the first letter.", ["Use a before a consonant sound.", "Use an before a vowel sound.", "Use the when the listener can identify the specific thing.", "Check whether a noun is singular and countable.", "Remember that some nouns can take no article in general statements."]],
            [/modal verb|modals/, "Express ability, advice, permission, obligation, and possibility.", "Modal verbs change the meaning of the main verb. Most modals are followed directly by the base form, without to or an -s ending.", ["Choose a modal that matches the intended meaning.", "Follow most modals with the base verb.", "Do not add -s after a modal.", "Form questions by placing the modal before the subject.", "Check the difference between obligation, advice, and possibility."]],
            [/passive voice|passive/, "Focus on the action or receiver rather than the doer.", "The passive voice is formed with an appropriate form of be plus a past participle. It is useful when the action or receiver is more important than who performs it.", ["Identify the object or receiver of the action.", "Use the appropriate tense of be.", "Add the past participle.", "Include a by-phrase only when the doer matters.", "Keep the intended tense consistent."]],
            [/conditional|if clause/, "Express real possibilities, imagined situations, and their results.", "Conditional sentences connect a condition with a result. The verb forms depend on whether the situation is generally true, realistically possible, hypothetical, or imagined in the past.", ["Identify the type of condition and its meaning.", "Check the tense in both clauses.", "Use a comma when the if-clause comes first.", "Avoid choosing verb forms without considering the meaning.", "Read both clauses together to check the logic."]],
            [/reported speech|indirect speech/, "Report what someone said without repeating the exact words.", "Reported speech presents another person's message indirectly. Pronouns, time expressions, and verb tenses may change depending on the reporting context.", ["Identify the original speaker and listener.", "Adjust pronouns to match the new context.", "Check whether the reporting verb requires a tense change.", "Update time and place expressions when necessary.", "Preserve the original meaning."]],
            [/subject.?verb agreement|agreement/, "Match the verb with its grammatical subject.", "Subject–verb agreement means that the verb form matches the subject. The subject, rather than a nearby noun, determines the form.", ["Find the main subject.", "Identify whether it is singular or plural.", "Choose the matching verb form.", "Do not be misled by nouns between the subject and verb.", "Check agreement throughout the sentence."]],
            [/comparative|superlative|comparison/, "Compare people, places, things, and actions accurately.", "Comparatives express a difference between items, while superlatives identify the highest or lowest degree within a group. The form depends partly on the adjective or adverb.", ["Use a comparative when comparing two items.", "Use a superlative to identify an extreme in a group.", "Check whether the word takes -er/-est or more/most.", "Watch for irregular forms such as better and best.", "Use than with many comparative structures and the with many superlatives."]],
            [/pronoun/, "Use pronouns clearly and match them to their referents.", "Pronouns replace nouns or noun phrases. Their form depends on their grammatical role, and readers should be able to identify what each pronoun refers to.", ["Identify the noun or idea being replaced.", "Choose subject or object forms correctly.", "Check possessive forms carefully.", "Make the reference clear and unambiguous.", "Check agreement with the intended referent."]],
            [/preposition/, "Express relationships of place, time, direction, and connection.", "Prepositions show relationships between words. Their choice often depends on the meaning and common usage of the surrounding expression.", ["Identify the relationship you need to express.", "Check common combinations and fixed expressions.", "Distinguish time, place, and movement meanings.", "Use the correct form after the preposition.", "Learn prepositions in useful phrases, not only as isolated words."]],
            [/adjective|adverb/, "Choose words that describe nouns or modify actions and descriptions.", "Adjectives commonly describe nouns, while adverbs often modify verbs, adjectives, or other adverbs. Some words have similar forms, so their role in the sentence matters.", ["Identify which word needs describing or modifying.", "Use an adjective to describe a noun.", "Use an adverb when the sentence requires one.", "Check irregular forms such as good and well.", "Place the modifier where its meaning is clear."]],
            [/countable|uncountable|quantifier/, "Choose noun forms and quantity expressions accurately.", "Countable nouns can be counted individually and have singular and plural forms. Uncountable nouns are treated as a mass or concept. Quantity words such as many, much, and some depend on the noun and context.", ["Decide whether the noun is countable in this meaning.", "Use singular or plural forms appropriately.", "Use many with plural countable nouns.", "Use much with uncountable nouns, especially in questions and negatives.", "Check whether a, an, or a quantity expression is needed."]],
            [/question|interrogative/, "Form questions with correct word order and auxiliary verbs.", "English questions often place an auxiliary verb before the subject. The structure depends on whether the question uses be, a modal, or do-support.", ["Choose the appropriate question word if needed.", "Place the auxiliary before the subject in most questions.", "Use do or does for many present-simple questions.", "Use did plus the base verb for many past-simple questions.", "Check word order and punctuation."]],
            [/gerund|infinitive/, "Choose the -ing form or infinitive according to the sentence pattern.", "Some verbs are followed by an -ing form, some by to plus the base verb, and some allow both with a change in meaning. The pattern often depends on the preceding verb or expression.", ["Identify the verb or expression before the gap.", "Check whether it takes -ing or to plus the base verb.", "Learn common verb patterns in phrases.", "Notice verbs that change meaning with different patterns.", "Read the full sentence to confirm the intended meaning."]],
            [/relative clause|relative pronoun/, "Add information about a person, thing, or place using a relative clause.", "Relative clauses identify or describe a noun. Relative words such as who, which, that, and whose have different uses, and punctuation can change the meaning.", ["Identify the noun being described.", "Choose a relative word that fits the reference.", "Check whether the information is essential or additional.", "Use commas appropriately for additional information.", "Avoid repeating a subject or object unnecessarily."]],
            [/noun|plural/, "Recognize noun forms and use them correctly in sentences.", "Nouns name people, places, things, and ideas. Their forms and surrounding words depend on number, possession, and whether the noun is countable.", ["Identify the noun and its role.", "Check singular and plural forms.", "Learn irregular plural forms where necessary.", "Check articles and determiners before the noun.", "Use apostrophes carefully for possession."]],
            [/sentence|word order/, "Build complete sentences with clear and accurate word order.", "A complete sentence communicates a full idea. English commonly uses subject–verb–object order, but questions, clauses, and modifiers may require different arrangements.", ["Identify the subject and main verb.", "Check whether the sentence expresses a complete idea.", "Use word order appropriate to a statement or question.", "Place modifiers close to the words they describe.", "Check capitalization and final punctuation."]],
            [/conjunction|clause/, "Connect words and ideas while keeping sentence relationships clear.", "Conjunctions connect words, phrases, or clauses. The choice of connector shows relationships such as addition, contrast, reason, or result.", ["Identify the relationship between the ideas.", "Choose a connector that expresses that relationship.", "Check the structure required by the connector.", "Avoid joining independent clauses with only a comma.", "Read the sentence to confirm the logic is clear."]]
        ];
        for (const [pattern, objective, explanation, rules] of guides) {
            if (pattern.test(t)) return { objective, explanation, rules };
        }
        return {
            objective: "Understand the purpose and form of " + topic + " and apply it accurately in meaningful sentences.",
            explanation: "This grammar lesson focuses on " + topic + ". Study how the structure is formed, what it means, and when English speakers use it. Compare the examples, notice the pattern, and use the structure in your own sentences. Check both the form and the meaning before deciding that an answer is correct.",
            rules: [
                "Identify the structure and the meaning it expresses.",
                "Study the word order and verb or word forms in the examples.",
                "Notice how the structure changes with the subject and context.",
                "Use the structure in a complete sentence of your own.",
                "Check grammar, meaning, and punctuation together."
            ]
        };
    }

`;


function replaceExactlyOne(text, pattern, replacement, label) {
    const matches = text.match(pattern);
    if (!matches || matches.length !== 1) {
        throw new Error(label + ": expected exactly one match, found " + (matches ? matches.length : 0));
    }
    return text.replace(pattern, replacement);
}

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

fs.copyFileSync(file, backup);
try {
    fs.writeFileSync(file, updated, "utf8");
    const check = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
    if (check.status !== 0) {
        throw new Error("JavaScript syntax check failed:\n" + check.stderr);
    }
    const result = fs.readFileSync(file, "utf8");
    for (const marker of ["function grammarTeachingGuide(topic)", "return grammarTeachingGuide(topic).objective", "return grammarTeachingGuide(topic).explanation", "return grammarTeachingGuide(topic).rules"]) {
        if (!result.includes(marker)) throw new Error("Verification marker missing: " + marker);
    }
    console.log("SUCCESS: Topic-aware grammar objectives, explanations, and rules installed.");
    console.log("Syntax check passed. Backup: " + backup);
    console.log("Engine size: " + fs.statSync(file).size + " bytes.");
} catch (err) {
    fs.copyFileSync(backup, file);
    console.error("PATCH FAILED; original engine restored from " + backup);
    console.error(err.message);
    process.exit(1);
}
