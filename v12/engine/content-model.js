/*
=========================================================
 WORDUP V12 CONTENT MODEL
 Complete self-study lesson structure
 Backward compatible with existing lessons
=========================================================
*/

class WordUpLesson {

    constructor(data = {}) {

        /* Core identity */
        this.id = data.id || "";
        this.level = data.level || "";
        this.skill = data.skill || "";
        this.topic = data.topic || "";

        /* Learning foundation */
        this.objective = data.objective || "";
        this.prerequisites = data.prerequisites || [];
        this.introduction = data.introduction || "";
        this.explanation = data.explanation || "";

        /* Teaching content */
        this.learningPoints = data.learningPoints || [];
        this.rules = data.rules || [];
        this.examples = data.examples || [];
        this.examplesInContext = data.examplesInContext || [];
        this.context = data.context || [];
        this.notes = data.notes || [];
        this.vocabulary = data.vocabulary || [];
        this.mistakes = data.mistakes || [];

        /* Practice */
        this.guidedPractice = data.guidedPractice || [];
        this.activities = data.activities || [];
        this.practice = data.practice || [];
        this.independentPractice = data.independentPractice || [];

        /* Assessment */
        this.test = data.test || [];

        /* Review and progression */
        this.review = data.review || [];
        this.mastery = data.mastery || {};
        this.nextLesson = data.nextLesson || "";

        /* Optional learning resources */
        this.media = data.media || {};
        this.skillContent = data.skillContent || {};

        /* Timing */
        this.duration = Number(data.duration || data.estimatedTime || 10);
        this.estimatedTime = Number(data.estimatedTime || this.duration);
    }

    isComplete() {

        return Boolean(
            this.id &&
            this.level &&
            this.skill &&
            this.topic &&
            this.objective &&
            this.explanation &&
            this.rules.length > 0 &&
            this.examples.length > 0 &&
            this.practice.length > 0 &&
            this.test.length > 0
        );
    }

    getPracticeCount() {
        return Array.isArray(this.practice)
            ? this.practice.length
            : 0;
    }

    getTestCount() {
        return Array.isArray(this.test)
            ? this.test.length
            : 0;
    }

    getLearningPoints() {
        return Array.isArray(this.learningPoints)
            ? this.learningPoints
            : [];
    }

    getActivities() {
        return Array.isArray(this.activities)
            ? this.activities
            : [];
    }

    getWeakAreas(results = []) {

        if (!Array.isArray(results)) {
            return [];
        }

        return results
            .filter(item => item && item.correct === false)
            .map(item => item.topic || item.skill || "")
            .filter(Boolean);
    }
}


/* Factory */

function wordUpCreateLesson(data) {
    return new WordUpLesson(data);
}


/* Global API */

window.WordUpLesson = WordUpLesson;
window.wordUpCreateLesson = wordUpCreateLesson;

console.log("WordUp V12 Content Model loaded.");