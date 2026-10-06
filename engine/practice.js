/*
=========================================================
WORDUP V11 PRACTICE / TEST ENGINE
=========================================================

Practice:
- guided
- easier
- immediate feedback
- learning focused

Test:
- harder
- no immediate answers
- mixed question types
- final score
- passing requirement
=========================================================
*/

function wordUpV11PracticeScore(
    questions,
    answers
) {

    if (!questions.length) {
        return 0;
    }

    let correct = 0;

    questions.forEach(
        (question, index) => {

            if (
                answers[index] ===
                question.answer
            ) {

                correct++;

            }

        }
    );

    return Math.round(
        (correct / questions.length) * 100
    );

}


function wordUpV11TestScore(
    questions,
    answers
) {

    if (!questions.length) {
        return 0;
    }

    let correct = 0;

    questions.forEach(
        (question, index) => {

            if (
                answers[index] ===
                question.answer
            ) {

                correct++;

            }

        }
    );

    return Math.round(
        (correct / questions.length) * 100
    );

}


function wordUpV11CanUnlockNextSession(
    testScore
) {

    return testScore >= 70;

}


window.wordUpV11PracticeScore =
    wordUpV11PracticeScore;

window.wordUpV11TestScore =
    wordUpV11TestScore;

window.wordUpV11CanUnlockNextSession =
    wordUpV11CanUnlockNextSession;


console.log(
    "WordUp V11 Practice/Test Engine loaded."
);
