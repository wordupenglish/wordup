/*
=========================================================
WORDUP V11 CURRICULUM ENGINE
=========================================================

Structure:

Level
  ↓
Session
  ↓
Lessons
  ↓
Practice
  ↓
Test
  ↓
Result
  ↓
Next Session

=========================================================
*/

const WORDUP_V11_LEVELS = [
    "foundation",
    "a1",
    "a2",
    "b1",
    "b2",
    "c1",
    "c2",
    "academic"
];

const WORDUP_V11_SKILLS = [
    "writing",
    "grammar",
    "vocabulary",
    "reading",
    "listening"
];

const WORDUP_V11_SESSION_TYPES = [
    "lesson",
    "practice",
    "test"
];

const WORDUP_V11_STORAGE = "wordup_v11_progress";


function wordUpV11LoadProgress() {

    try {

        const saved =
            localStorage.getItem(WORDUP_V11_STORAGE);

        if (saved) {
            return JSON.parse(saved);
        }

    } catch (error) {

        console.error(
            "WordUp V11 progress error:",
            error
        );

    }

    return {
        completedLessons: [],
        completedSessions: [],
        completedTests: [],
        scores: {},
        unlocked: {
            foundation: true
        }
    };
}


function wordUpV11SaveProgress(progress) {

    localStorage.setItem(
        WORDUP_V11_STORAGE,
        JSON.stringify(progress)
    );

}


function wordUpV11IsLessonComplete(
    progress,
    lessonId
) {

    return progress.completedLessons
        .includes(lessonId);

}


function wordUpV11CompleteLesson(
    progress,
    lessonId
) {

    if (
        !progress.completedLessons
            .includes(lessonId)
    ) {

        progress.completedLessons.push(
            lessonId
        );

    }

    wordUpV11SaveProgress(progress);

}


function wordUpV11CompleteSession(
    progress,
    sessionId
) {

    if (
        !progress.completedSessions
            .includes(sessionId)
    ) {

        progress.completedSessions.push(
            sessionId
        );

    }

    wordUpV11SaveProgress(progress);

}


function wordUpV11CompleteTest(
    progress,
    testId,
    score
) {

    if (
        !progress.completedTests
            .includes(testId)
    ) {

        progress.completedTests.push(
            testId
        );

    }

    progress.scores[testId] = score;

    wordUpV11SaveProgress(progress);

}


function wordUpV11UnlockLevel(
    progress,
    level
) {

    progress.unlocked[level] = true;

    wordUpV11SaveProgress(progress);

}


function wordUpV11IsLevelUnlocked(
    progress,
    level
) {

    return !!progress.unlocked[level];

}


function wordUpV11CalculateTestStatus(
    score,
    passingScore = 70
) {

    return {
        passed: score >= passingScore,
        score,
        passingScore
    };

}


window.wordUpV11 = {

    loadProgress:
        wordUpV11LoadProgress,

    saveProgress:
        wordUpV11SaveProgress,

    completeLesson:
        wordUpV11CompleteLesson,

    completeSession:
        wordUpV11CompleteSession,

    completeTest:
        wordUpV11CompleteTest,

    unlockLevel:
        wordUpV11UnlockLevel,

    isLevelUnlocked:
        wordUpV11IsLevelUnlocked,

    calculateTestStatus:
        wordUpV11CalculateTestStatus

};

console.log(
    "WordUp V11 Curriculum Engine loaded."
);
