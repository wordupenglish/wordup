/*
=========================================================
 WORDUP V12.2 PROGRESS ENGINE
 Idempotent rewards, reliable daily streaks, safe storage.
=========================================================
*/

const WORDUP_PROGRESS_KEY = "wordup_v12_progress";

function wordUpLocalDateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return year + "-" + month + "-" + day;
}

function wordUpNormalizeProgress(data = {}) {
    return {
        ...data,
        lessons: data.lessons && typeof data.lessons === "object" ? data.lessons : {},
        tests: data.tests && typeof data.tests === "object" ? data.tests : {},
        scores: data.scores && typeof data.scores === "object" ? data.scores : {},
        xp: Number.isFinite(Number(data.xp)) ? Math.max(0, Number(data.xp)) : 0,
        streak: Number.isFinite(Number(data.streak)) ? Math.max(0, Number(data.streak)) : 0,
        mistakes: Array.isArray(data.mistakes) ? data.mistakes : [],
        lastActiveDate: typeof data.lastActiveDate === "string" ? data.lastActiveDate : ""
    };
}

function wordUpGetProgress() {
    try {
        const saved = localStorage.getItem(WORDUP_PROGRESS_KEY);
        return wordUpNormalizeProgress(saved ? JSON.parse(saved) : {});
    } catch (error) {
        console.error("Progress loading error:", error);
        return wordUpNormalizeProgress();
    }
}

function wordUpSaveProgress(progress) {
    try {
        localStorage.setItem(WORDUP_PROGRESS_KEY, JSON.stringify(wordUpNormalizeProgress(progress)));
        return true;
    } catch (error) {
        console.error("Progress saving error:", error);
        return false;
    }
}

function wordUpRecordLearningActivity(progress) {
    const today = wordUpLocalDateKey();
    const previous = progress.lastActiveDate;
    if (previous !== today) {
        if (previous) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            progress.streak = previous === wordUpLocalDateKey(yesterday)
                ? Math.max(1, Number(progress.streak) || 0) + 1
                : 1;
        } else {
            progress.streak = Math.max(1, Number(progress.streak) || 0);
        }
        progress.lastActiveDate = today;
    }
}

function wordUpCompleteLesson(id) {
    if (!id) return wordUpGetProgress();
    const progress = wordUpGetProgress();
    const alreadyCompleted = Boolean(progress.lessons[id] && progress.lessons[id].completed);

    if (!alreadyCompleted) {
        progress.lessons[id] = { completed: true, completedAt: new Date().toISOString() };
        progress.xp += 10;
    }

    wordUpRecordLearningActivity(progress);
    wordUpSaveProgress(progress);
    return progress;
}

function wordUpCompleteTest(id, score) {
    if (!id || !Number.isFinite(Number(score))) return wordUpGetProgress();
    const numericScore = Math.max(0, Math.min(100, Math.round(Number(score))));
    const progress = wordUpGetProgress();
    const previous = progress.tests[id] || {};
    const firstAttempt = !previous.attempted;
    const firstPass = numericScore >= 70 && !previous.passed;

    if (firstAttempt) progress.xp += 10;
    if (firstPass) progress.xp += 20;

    progress.tests[id] = {
        ...previous,
        attempted: true,
        completed: true,
        passed: Boolean(previous.passed || numericScore >= 70),
        completedAt: new Date().toISOString(),
        score: numericScore,
        attempts: Math.max(0, Number(previous.attempts) || 0) + 1
    };
    progress.scores[id] = Math.max(
        Number.isFinite(Number(progress.scores[id])) ? Number(progress.scores[id]) : 0,
        numericScore
    );

    wordUpRecordLearningActivity(progress);
    wordUpSaveProgress(progress);
    return progress;
}

function wordUpRecordMistake(lessonId, question, answer) {
    const progress = wordUpGetProgress();
    progress.mistakes.push({
        lessonId: lessonId || "",
        question: question || "",
        answer: answer ?? "",
        createdAt: new Date().toISOString()
    });
    wordUpRecordLearningActivity(progress);
    wordUpSaveProgress(progress);
    return progress;
}

function wordUpGetCompletedLessons() {
    const progress = wordUpGetProgress();
    return Object.keys(progress.lessons).filter(id => progress.lessons[id] && progress.lessons[id].completed);
}

window.wordUpGetProgress = wordUpGetProgress;
window.wordUpSaveProgress = wordUpSaveProgress;
window.wordUpCompleteLesson = wordUpCompleteLesson;
window.wordUpCompleteTest = wordUpCompleteTest;
window.wordUpRecordMistake = wordUpRecordMistake;
window.wordUpGetCompletedLessons = wordUpGetCompletedLessons;

console.log("WordUp V12.2 Progress Engine loaded.");
