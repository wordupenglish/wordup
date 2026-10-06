/*
=========================================================
 WORDUP V12.1 PROGRESS ENGINE
=========================================================
*/

const WORDUP_PROGRESS_KEY =
    "wordup_v12_progress";

function wordUpGetProgress(){

    try{

        const saved =
            localStorage.getItem(
                WORDUP_PROGRESS_KEY
            );

        if(saved){

            const data =
                JSON.parse(saved);

            return {

                lessons:
                    data.lessons || {},

                tests:
                    data.tests || {},

                scores:
                    data.scores || {},

                xp:
                    data.xp || 0,

                streak:
                    data.streak || 0,

                mistakes:
                    data.mistakes || []

            };

        }

    }catch(error){

        console.error(
            "Progress loading error:",
            error
        );

    }

    return {

        lessons: {},

        tests: {},

        scores: {},

        xp: 0,

        streak: 0,

        mistakes: []

    };

}


function wordUpSaveProgress(progress){

    localStorage.setItem(
        WORDUP_PROGRESS_KEY,
        JSON.stringify(progress)
    );

}


function wordUpCompleteLesson(id){

    const progress =
        wordUpGetProgress();

    progress.lessons[id] = {

        completed: true,

        completedAt:
            new Date().toISOString()

    };

    progress.xp += 10;

    wordUpSaveProgress(progress);

    return progress;

}


function wordUpCompleteTest(
    id,
    score
){

    const progress =
        wordUpGetProgress();

    progress.tests[id] = {

        completed: true,

        completedAt:
            new Date().toISOString(),

        score

    };

    progress.scores[id] =
        score;

    progress.xp +=
        score >= 70 ? 30 : 10;

    wordUpSaveProgress(progress);

    return progress;

}


function wordUpRecordMistake(
    lessonId,
    question,
    answer
){

    const progress =
        wordUpGetProgress();

    progress.mistakes.push({

        lessonId,

        question,

        answer,

        createdAt:
            new Date().toISOString()

    });

    wordUpSaveProgress(progress);

    return progress;

}


function wordUpGetCompletedLessons(){

    const progress =
        wordUpGetProgress();

    return Object.keys(
        progress.lessons
    );

}


window.wordUpGetProgress =
    wordUpGetProgress;

window.wordUpSaveProgress =
    wordUpSaveProgress;

window.wordUpCompleteLesson =
    wordUpCompleteLesson;

window.wordUpCompleteTest =
    wordUpCompleteTest;

window.wordUpRecordMistake =
    wordUpRecordMistake;

window.wordUpGetCompletedLessons =
    wordUpGetCompletedLessons;


console.log(
    "WordUp V12.1 Progress Engine loaded."
);

