/*
=========================================================
 WORDUP V12 PRACTICE / TEST ENGINE
=========================================================

PRACTICE
- easier
- guided
- feedback
- reinforcement

TEST
- harder
- mixed skills
- no immediate answers
- final score
- progression requirement

=========================================================
*/

function wordUpV12Score(
    questions,
    answers
){

    if(!questions.length){
        return 0;
    }

    let correct = 0;

    questions.forEach(
        (question,index)=>{

            if(
                answers[index] ===
                question.answer
            ){
                correct++;
            }

        }
    );

    return Math.round(
        (correct / questions.length) * 100
    );

}


function wordUpV12PracticeScore(
    questions,
    answers
){

    return wordUpV12Score(
        questions,
        answers
    );

}


function wordUpV12TestScore(
    questions,
    answers
){

    return wordUpV12Score(
        questions,
        answers
    );

}


function wordUpV12TestIsHarder(
    practice,
    test
){

    return (
        test.length >= practice.length &&
        test.length > 0
    );

}


function wordUpV12CanUnlock(
    score
){

    return score >= 70;

}


window.wordUpV12PracticeScore =
    wordUpV12PracticeScore;

window.wordUpV12TestScore =
    wordUpV12TestScore;

window.wordUpV12CanUnlock =
    wordUpV12CanUnlock;

window.wordUpV12TestIsHarder =
    wordUpV12TestIsHarder;

console.log(
    "WordUp V12 Practice/Test Engine loaded."
);
