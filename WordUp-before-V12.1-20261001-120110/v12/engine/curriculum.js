/*
=========================================================
 WORDUP V12 MASTER CURRICULUM
=========================================================

LEVEL
  ↓
SESSION
  ↓
LESSONS
  ↓
PRACTICE
  ↓
TEST
  ↓
RESULT
  ↓
NEXT SESSION

=========================================================
*/

const WORDUP_V12_LEVELS = [
    "foundation",
    "a1",
    "a2",
    "b1",
    "b2",
    "c1",
    "c2",
    "academic"
];

const WORDUP_V12_SKILLS = [
    "writing",
    "grammar",
    "vocabulary",
    "reading",
    "listening"
];

const WORDUP_V12_STORAGE =
    "wordup_v12_progress";

function wordUpV12LoadProgress(){

    try{

        const saved =
            localStorage.getItem(
                WORDUP_V12_STORAGE
            );

        if(saved){
            return JSON.parse(saved);
        }

    }catch(error){

        console.error(
            "WordUp V12 progress error:",
            error
        );

    }

    return {
        completedLessons: [],
        completedPractices: [],
        completedTests: [],
        scores: {},
        unlockedLevels: {
            foundation: true
        }
    };
}


function wordUpV12SaveProgress(progress){

    localStorage.setItem(
        WORDUP_V12_STORAGE,
        JSON.stringify(progress)
    );

}


function wordUpV12CompleteLesson(id){

    const progress =
        wordUpV12LoadProgress();

    if(
        !progress.completedLessons.includes(id)
    ){
        progress.completedLessons.push(id);
    }

    wordUpV12SaveProgress(progress);
}


function wordUpV12CompletePractice(id){

    const progress =
        wordUpV12LoadProgress();

    if(
        !progress.completedPractices.includes(id)
    ){
        progress.completedPractices.push(id);
    }

    wordUpV12SaveProgress(progress);
}


function wordUpV12CompleteTest(
    id,
    score
){

    const progress =
        wordUpV12LoadProgress();

    if(
        !progress.completedTests.includes(id)
    ){
        progress.completedTests.push(id);
    }

    progress.scores[id] = score;

    wordUpV12SaveProgress(progress);

}


function wordUpV12TestPassed(score){

    return score >= 70;

}


window.WORDUP_V12_LEVELS =
    WORDUP_V12_LEVELS;

window.WORDUP_V12_SKILLS =
    WORDUP_V12_SKILLS;

window.wordUpV12LoadProgress =
    wordUpV12LoadProgress;

window.wordUpV12SaveProgress =
    wordUpV12SaveProgress;

window.wordUpV12CompleteLesson =
    wordUpV12CompleteLesson;

window.wordUpV12CompletePractice =
    wordUpV12CompletePractice;

window.wordUpV12CompleteTest =
    wordUpV12CompleteTest;

window.wordUpV12TestPassed =
    wordUpV12TestPassed;

console.log(
    "WordUp V12 Master Curriculum loaded."
);
