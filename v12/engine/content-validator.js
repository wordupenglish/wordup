/*
=========================================================
 WORDUP V12.2 CONTENT VALIDATOR
 Validates lesson structure and reports teaching-quality gaps.
 Open-response tasks are valid; they are not treated as MCQs.
=========================================================
*/

function wordUpQuestionAudit(question, location) {
    const errors = [];
    const prompt = question && (question.question || question.prompt || question.text);
    const options = question && Array.isArray(question.options) ? question.options : [];
    const answer = question && (question.answer ?? question.correctAnswer ?? question.correct);

    if (!prompt || !String(prompt).trim()) {
        errors.push(location + ": missing question prompt");
    }

    if (options.length) {
        if (options.length < 2) {
            errors.push(location + ": multiple-choice item needs at least two options");
        }
        const normalized = options.map(option => String(option).trim().toLowerCase());
        if (new Set(normalized).size !== normalized.length) {
            errors.push(location + ": duplicate answer options");
        }
        if (!Number.isInteger(Number(answer)) || Number(answer) < 0 || Number(answer) >= options.length) {
            errors.push(location + ": answer index is missing or outside the options range");
        }
    } else if (answer !== null && answer !== undefined) {
        errors.push(location + ": open-response item should not contain an answer index");
    }

    return {
        valid: errors.length === 0,
        openResponse: options.length === 0,
        errors
    };
}

function wordUpValidateLesson(lesson) {
    const errors = [];
    const warnings = [];

    if (!lesson || typeof lesson !== "object") {
        return { valid: false, errors: ["Lesson must be an object"], warnings };
    }

    ["id", "level", "skill", "topic", "objective", "explanation"].forEach(field => {
        if (typeof lesson[field] !== "string" || !lesson[field].trim()) {
            errors.push("Missing or empty " + field);
        }
    });

    ["rules", "examples", "practice", "test"].forEach(field => {
        if (!Array.isArray(lesson[field]) || !lesson[field].length) {
            errors.push("Missing " + field);
        }
    });

    ["practice", "test", "guidedPractice", "independentPractice"].forEach(section => {
        if (!Array.isArray(lesson[section])) return;
        lesson[section].forEach((question, index) => {
            const result = wordUpQuestionAudit(question, section + "[" + index + "]");
            result.errors.forEach(error => errors.push(error));
        });
    });

    if (!Array.isArray(lesson.vocabulary) || !lesson.vocabulary.length) {
        warnings.push("No lesson-specific vocabulary");
    }
    if (!Array.isArray(lesson.mistakes) || !lesson.mistakes.length) {
        warnings.push("No common-mistake guidance");
    }
    if (!Array.isArray(lesson.independentPractice) || !lesson.independentPractice.length) {
        warnings.push("No independent-practice task");
    }

    const qualityText = [
        lesson.introduction,
        lesson.explanation,
        ...(Array.isArray(lesson.learningPoints) ? lesson.learningPoints : []),
        ...(Array.isArray(lesson.rules) ? lesson.rules : []),
        ...(Array.isArray(lesson.examples) ? lesson.examples : [])
    ].filter(Boolean).join(" ").toLowerCase();

    const genericPhrases = [
        "identify the main learning principle presented in this lesson",
        "apply the target skill accurately in a meaningful context",
        "use evidence, context, or language features to support your answer",
        "this writing lesson moves from planning and modelling",
        "plan before drafting",
        "develop ideas with relevant support",
        "maintain logical cohesion",
        "revise and edit independently"
    ];

    if (genericPhrases.some(phrase => qualityText.includes(phrase))) {
        warnings.push("Contains generic or repeated instructional wording");
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings
    };
}

function wordUpValidateAllContent() {
    const lessons = typeof wordUpGetAllContent === "function" ? wordUpGetAllContent() : [];
    const results = {
        total: lessons.length,
        valid: 0,
        invalid: 0,
        errors: [],
        duplicateIds: []
    };
    const seen = new Set();
    const duplicates = new Set();

    lessons.forEach(lesson => {
        const result = wordUpValidateLesson(lesson);
        const id = lesson && lesson.id ? lesson.id : "(missing id)";
        if (seen.has(id)) duplicates.add(id);
        seen.add(id);

        if (result.valid) {
            results.valid++;
        } else {
            results.invalid++;
            results.errors.push({ id, errors: result.errors });
        }
    });

    results.duplicateIds = Array.from(duplicates);
    results.duplicateIds.forEach(id => {
        results.errors.push({ id, errors: ["Duplicate lesson ID across the curriculum"] });
    });
    results.invalid += results.duplicateIds.length;
    results.valid = Math.max(0, results.total - results.invalid);

    return results;
}

function wordUpContentQualityReport() {
    const lessons = typeof wordUpGetAllContent === "function" ? wordUpGetAllContent() : [];
    const report = {
        totalLessons: lessons.length,
        levels: {},
        duplicateIds: [],
        lessonsWithoutVocabulary: 0,
        lessonsWithoutMistakes: 0,
        lessonsWithoutIndependentPractice: 0,
        openResponseQuestions: 0,
        malformedAssessmentQuestions: 0,
        lessonsWithGenericWording: 0,
        repeatedPrompts: 0,
        details: []
    };
    const ids = new Set();
    const duplicateIds = new Set();

    lessons.forEach(lesson => {
        const id = lesson && lesson.id ? lesson.id : "(missing id)";
        if (ids.has(id)) duplicateIds.add(id);
        ids.add(id);

        const level = lesson && lesson.level ? lesson.level : "unknown";
        report.levels[level] = (report.levels[level] || 0) + 1;

        if (!Array.isArray(lesson.vocabulary) || !lesson.vocabulary.length) report.lessonsWithoutVocabulary++;
        if (!Array.isArray(lesson.mistakes) || !lesson.mistakes.length) report.lessonsWithoutMistakes++;
        if (!Array.isArray(lesson.independentPractice) || !lesson.independentPractice.length) report.lessonsWithoutIndependentPractice++;

        const prompts = [];
        ["guidedPractice", "activities", "practice", "independentPractice", "test"].forEach(section => {
            (Array.isArray(lesson[section]) ? lesson[section] : []).forEach((question, index) => {
                const audit = wordUpQuestionAudit(question, section + "[" + index + "]");
                if (audit.openResponse) report.openResponseQuestions++;
                if (!audit.valid) {
                    report.malformedAssessmentQuestions += audit.errors.length;
                    report.details.push({ id, section, index, errors: audit.errors });
                }
                const prompt = question && (question.question || question.prompt || question.text);
                if (prompt) prompts.push(String(prompt).trim().toLowerCase());
            });
        });

        if (new Set(prompts).size !== prompts.length) report.repeatedPrompts++;

        const validation = wordUpValidateLesson(lesson);
        if (validation.warnings.some(warning => warning.includes("generic"))) {
            report.lessonsWithGenericWording++;
        }
    });

    report.duplicateIds = Array.from(duplicateIds);
    return report;
}

window.wordUpValidateLesson = wordUpValidateLesson;
window.wordUpValidateAllContent = wordUpValidateAllContent;
window.wordUpQuestionAudit = wordUpQuestionAudit;
window.wordUpContentQualityReport = wordUpContentQualityReport;

console.log("WordUp V12.2 Content Validator loaded.");
