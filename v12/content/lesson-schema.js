/*
=========================================================
 WORDUP LESSON CONTENT SCHEMA
 Reusable structure for complete self-study lessons
=========================================================
*/

const WORDUP_LESSON_SCHEMA = {

    id: "",
    level: "",
    skill: "",
    topic: "",

    objective: "",
    prerequisites: [],

    introduction: "",

    explanation: "",

    learningPoints: [],

    rules: [],

    examples: [],

    examplesInContext: [],

    context: [],

    notes: [],

    vocabulary: [],

    mistakes: [],

    guidedPractice: [],

    activities: [],

    practice: [],

    independentPractice: [],

    test: [],

    review: [],

    mastery: {
        passingScore: 70,
        skills: [],
        criteria: []
    },

    nextLesson: "",

    media: {
        audio: [],
        images: [],
        video: []
    },

    skillContent: {},

    duration: 10,
    estimatedTime: 10
};


/*
---------------------------------------------------------
 Create a lesson using the standard WordUp structure
---------------------------------------------------------
*/

function wordUpCreateRichLesson(data = {}) {

    return wordUpCreateLesson({
        ...WORDUP_LESSON_SCHEMA,
        ...data,

        mastery: {
            ...WORDUP_LESSON_SCHEMA.mastery,
            ...(data.mastery || {})
        },

        media: {
            ...WORDUP_LESSON_SCHEMA.media,
            ...(data.media || {})
        },

        skillContent: {
            ...WORDUP_LESSON_SCHEMA.skillContent,
            ...(data.skillContent || {})
        }
    });
}


/*
---------------------------------------------------------
 Export
---------------------------------------------------------
*/

window.WORDUP_LESSON_SCHEMA = WORDUP_LESSON_SCHEMA;
window.wordUpCreateRichLesson = wordUpCreateRichLesson;

console.log("WordUp Lesson Content Schema loaded.");