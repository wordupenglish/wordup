/*
=========================================================
 WORDUP V12.1 CONTENT REGISTRY
=========================================================
*/

const WORDUP_CONTENT_REGISTRY = {

    foundation:
        window.WORDUP_FOUNDATION_CONTENT || [],

    a1:
        window.WORDUP_A1_CONTENT || [],

    a2:
        window.WORDUP_A2_CONTENT || [],

    b1: window.WORDUP_B1_CONTENT || [],

    b2: window.WORDUP_B2_CONTENT || [],

    c1: window.WORDUP_C1_CONTENT || [],

    c2: window.WORDUP_C2_CONTENT || [],

    academic: window.WORDUP_ACADEMIC_CONTENT || []

};

/*
 * Ensure every registered lesson has a meaningful independent task.
 * Older curriculum records predate this field, so add a skill-specific task
 * without replacing any authored practice supplied by the lesson.
 */
function wordUpEnsureIndependentPractice(lesson) {
    if (!lesson || (Array.isArray(lesson.independentPractice) && lesson.independentPractice.length)) {
        return lesson;
    }

    const topic = String(lesson.topic || lesson.title || "the lesson topic").trim();
    const objective = String(lesson.objective || "use the target skill accurately").trim();
    const tasks = {
        grammar: "Write five original sentences that use " + topic + " accurately. Include different sentence patterns where appropriate, then explain one important grammar choice.",
        vocabulary: "Write a short paragraph using at least five words from this lesson's vocabulary. Highlight the collocations and explain how the context supports each meaning.",
        reading: "Read a new text related to " + topic + ". Identify its main idea, two supporting details, and one inference supported by evidence from the text.",
        listening: "Listen to a short recording related to " + topic + " without reading a transcript first. Summarise the main message, record three details, then check your understanding.",
        speaking: "Give a one- to two-minute spoken response about " + topic + ". Record it if possible, review clarity and fluency, and identify one improvement.",
        writing: "Write a focused paragraph that demonstrates this objective: " + objective + " Revise it for organisation, supporting detail, grammar, and clarity."
    };

    lesson.independentPractice = [
        tasks[lesson.skill] || "Apply " + topic + " independently in a realistic situation. Explain your choices and review your work for accuracy."
    ];
    return lesson;
}

Object.keys(WORDUP_CONTENT_REGISTRY).forEach(level => {
    WORDUP_CONTENT_REGISTRY[level] = WORDUP_CONTENT_REGISTRY[level].map(wordUpEnsureIndependentPractice);
});

window.wordUpEnsureIndependentPractice = wordUpEnsureIndependentPractice;

function wordUpGetAllContent(){

    return Object.values(
        WORDUP_CONTENT_REGISTRY
    ).flat();

}


function wordUpGetLevelContent(level){

    return (
        WORDUP_CONTENT_REGISTRY[level] || []
    );

}


function wordUpGetSkillContent(
    level,
    skill
){

    return wordUpGetLevelContent(level)
        .filter(
            lesson => lesson.skill === skill
        );

}


function wordUpFindLesson(id){

    return wordUpGetAllContent()
        .find(
            lesson => lesson.id === id
        );

}


function wordUpContentStatistics(){

    const all =
        wordUpGetAllContent();

    const statistics = {

        totalLessons:
            all.length,

        levels: {},

        skills: {}

    };

    all.forEach(
        lesson => {

            statistics.levels[
                lesson.level
            ] =
                (
                    statistics.levels[
                        lesson.level
                    ] || 0
                ) + 1;

            statistics.skills[
                lesson.skill
            ] =
                (
                    statistics.skills[
                        lesson.skill
                    ] || 0
                ) + 1;

        }
    );

    return statistics;

}


window.WORDUP_CONTENT_REGISTRY =
    WORDUP_CONTENT_REGISTRY;

window.wordUpGetAllContent =
    wordUpGetAllContent;

window.wordUpGetLevelContent =
    wordUpGetLevelContent;

window.wordUpGetSkillContent =
    wordUpGetSkillContent;

window.wordUpFindLesson =
    wordUpFindLesson;

window.wordUpContentStatistics =
    wordUpContentStatistics;


console.log(
    "WordUp V12.1 Content Registry loaded."
);


