/*
=========================================================
 WORDUP V12.2 QUESTION ENGINE
 Consistent answer checking for indexed and text MCQs.
=========================================================
*/

const WORDUP_QUESTION_TYPES = [
    "multiple-choice",
    "sentence-completion",
    "error-correction",
    "meaning",
    "context",
    "reading",
    "grammar",
    "vocabulary",
    "writing"
];

function wordUpCreateQuestion(type, question, options, answer, explanation = "") {
    return {
        type,
        question,
        options: Array.isArray(options) ? options : [],
        answer,
        explanation
    };
}

function wordUpNormalizeAnswer(value) {
    return String(value ?? "").trim().replace(/\\s+/g, " ").toLocaleLowerCase();
}

function wordUpCheckQuestion(question, submittedAnswer) {
    if (!question || submittedAnswer === undefined || submittedAnswer === null || String(submittedAnswer).trim() === "") {
        return false;
    }

    const options = Array.isArray(question.options) ? question.options : [];
    const expected = question.answer ?? question.correctAnswer ?? question.correct;
    if (expected === undefined || expected === null) return false;

    const expectedText = String(expected).trim();
    const expectedIsIndex = expectedText !== "" &&
        String(Number(expectedText)) === expectedText &&
        Number.isInteger(Number(expectedText));

    if (options.length) {
        const expectedOption = expectedIsIndex ? options[Number(expectedText)] : expected;
        const submittedText = String(submittedAnswer).trim();
        const submittedIsIndex = String(Number(submittedText)) === submittedText &&
            Number.isInteger(Number(submittedText));
        const submittedOption = submittedIsIndex ? options[Number(submittedText)] : submittedAnswer;
        if (expectedOption === undefined || submittedOption === undefined) return false;
        return wordUpNormalizeAnswer(expectedOption) === wordUpNormalizeAnswer(submittedOption);
    }

    return wordUpNormalizeAnswer(submittedAnswer) === wordUpNormalizeAnswer(expected);
}

function wordUpScoreQuestions(questions, answers) {
    if (!Array.isArray(questions) || !questions.length || !answers) return 0;
    let correct = 0;
    questions.forEach((question, index) => {
        if (wordUpCheckQuestion(question, answers[index])) correct++;
    });
    return Math.round((correct / questions.length) * 100);
}

window.WORDUP_QUESTION_TYPES = WORDUP_QUESTION_TYPES;
window.wordUpCreateQuestion = wordUpCreateQuestion;
window.wordUpCheckQuestion = wordUpCheckQuestion;
window.wordUpScoreQuestions = wordUpScoreQuestions;

console.log("WordUp V12.2 Question Engine loaded.");
