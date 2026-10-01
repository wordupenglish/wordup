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

    b1:
        window.WORDUP_B1_CONTENT || [],

    b2:
        window.WORDUP_B2_CONTENT || [],

    c1:
        window.WORDUP_C1_CONTENT || [],

    c2:
        window.WORDUP_C2_CONTENT || [],

    academic:
        window.WORDUP_ACADEMIC_CONTENT || []

};


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

