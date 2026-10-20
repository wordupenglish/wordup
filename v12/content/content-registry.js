/*
=========================================================
 WORDUP V12.1 CONTENT REGISTRY
 Dynamic arrays: supports lessons loaded after this script.
=========================================================
*/

const WORDUP_CONTENT_LEVEL_KEYS = {
    foundation: "WORDUP_FOUNDATION_CONTENT",
    a1: "WORDUP_A1_CONTENT",
    a2: "WORDUP_A2_CONTENT",
    b1: "WORDUP_B1_CONTENT",
    b2: "WORDUP_B2_CONTENT",
    c1: "WORDUP_C1_CONTENT",
    c2: "WORDUP_C2_CONTENT",
    academic: "WORDUP_ACADEMIC_CONTENT"
};

const WORDUP_CONTENT_REGISTRY = {};

Object.keys(WORDUP_CONTENT_LEVEL_KEYS).forEach(function (level) {
    Object.defineProperty(WORDUP_CONTENT_REGISTRY, level, {
        enumerable: true,
        configurable: false,
        get: function () {
            const key = WORDUP_CONTENT_LEVEL_KEYS[level];
            const content = window[key];
            return Array.isArray(content) ? content : [];
        }
    });
});

function wordUpLessonCompletenessScore(lesson) {
    if (!lesson || typeof lesson !== "object") return -1;

    const fields = [
        "introduction", "explanation", "objective", "review",
        "mastery", "rules", "examples", "examplesInContext",
        "learningPoints", "vocabulary", "activities", "practice",
        "test", "questions", "mistakes", "prerequisites"
    ];

    return fields.reduce(function (score, field) {
        const value = lesson[field];

        if (typeof value === "string" && value.trim()) {
            return score + Math.min(value.length, 500) / 100;
        }

        if (Array.isArray(value)) {
            return score + value.filter(Boolean).length * 2;
        }

        if (value && typeof value === "object") {
            return score + Object.keys(value).length;
        }

        return score;
    }, 0);
}

function wordUpGetAllContent() {
    const all = [];
    const indexById = new Map();

    Object.keys(WORDUP_CONTENT_LEVEL_KEYS).forEach(function (level) {
        wordUpGetLevelContent(level).forEach(function (lesson) {
            if (!lesson || !lesson.id) {
                all.push(lesson);
                return;
            }

            if (!indexById.has(lesson.id)) {
                indexById.set(lesson.id, all.length);
                all.push(lesson);
                return;
            }

            const index = indexById.get(lesson.id);
            const current = all[index];

            if (
                wordUpLessonCompletenessScore(lesson) >
                wordUpLessonCompletenessScore(current)
            ) {
                all[index] = lesson;
            }
        });
    });

    return all;
}

function wordUpMergeLessonValues(preferred, secondary) {
    if (preferred === undefined || preferred === null) return secondary;
    if (secondary === undefined || secondary === null) return preferred;

    if (Array.isArray(preferred) && Array.isArray(secondary)) {
        const combined = preferred.slice();
        const seen = new Set(combined.map(function (item) {
            return JSON.stringify(item);
        }));

        secondary.forEach(function (item) {
            const key = JSON.stringify(item);
            if (!seen.has(key)) {
                seen.add(key);
                combined.push(item);
            }
        });

        return combined;
    }

    if (
        typeof preferred === "object" &&
        typeof secondary === "object" &&
        !Array.isArray(preferred) &&
        !Array.isArray(secondary)
    ) {
        const merged = Object.assign({}, secondary, preferred);
        const keys = new Set(
            Object.keys(preferred).concat(Object.keys(secondary))
        );

        keys.forEach(function (key) {
            merged[key] = wordUpMergeLessonValues(
                preferred[key],
                secondary[key]
            );
        });

        return merged;
    }

    return preferred;
}

function wordUpMergeDuplicateLessons(first, second) {
    const firstScore = wordUpLessonCompletenessScore(first);
    const secondScore = wordUpLessonCompletenessScore(second);

    const preferred = secondScore > firstScore ? second : first;
    const secondary = preferred === first ? second : first;

    return wordUpMergeLessonValues(preferred, secondary);
}

function wordUpGetLevelContent(level) {
    if (!Object.prototype.hasOwnProperty.call(
        WORDUP_CONTENT_LEVEL_KEYS, level
    )) {
        return [];
    }

    const key = WORDUP_CONTENT_LEVEL_KEYS[level];
    const content = window[key];

    if (!Array.isArray(content)) return [];

    const unique = [];
    const indexById = new Map();

    content.forEach(function (lesson) {
        if (!lesson || !lesson.id) {
            unique.push(lesson);
            return;
        }

        if (!indexById.has(lesson.id)) {
            indexById.set(lesson.id, unique.length);
            unique.push(lesson);
            return;
        }

        const index = indexById.get(lesson.id);
        unique[index] = wordUpMergeDuplicateLessons(
            unique[index], lesson
        );
    });

    return unique;
}

function wordUpGetSkillContent(level, skill) {
    return wordUpGetLevelContent(level).filter(function (lesson) {
        return lesson && lesson.skill === skill;
    });
}

function wordUpFindLesson(id) {
    return wordUpGetAllContent().find(function (lesson) {
        return lesson && lesson.id === id;
    });
}

function wordUpContentStatistics() {
    const all = wordUpGetAllContent();
    const statistics = {
        totalLessons: all.length,
        levels: {},
        skills: {}
    };

    all.forEach(function (lesson) {
        if (!lesson) return;

        const level = lesson.level || "unassigned";
        const skill = lesson.skill || "unassigned";

        statistics.levels[level] =
            (statistics.levels[level] || 0) + 1;

        statistics.skills[skill] =
            (statistics.skills[skill] || 0) + 1;
    });

    return statistics;
}

window.WORDUP_CONTENT_REGISTRY = WORDUP_CONTENT_REGISTRY;
window.wordUpGetAllContent = wordUpGetAllContent;
window.wordUpGetLevelContent = wordUpGetLevelContent;
window.wordUpGetSkillContent = wordUpGetSkillContent;
window.wordUpFindLesson = wordUpFindLesson;
window.wordUpContentStatistics = wordUpContentStatistics;

console.log("WordUp dynamic content registry loaded.");
