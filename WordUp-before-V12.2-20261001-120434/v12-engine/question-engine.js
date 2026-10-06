/*
=========================================================
 WORDUP V12.1 QUESTION ENGINE
=========================================================
*/

const WORDUP_QUESTION_TYPES = [

    "multiple-choice",
    "sentence-completion",
    "error-correction",
    "meaning",
    "context",
    "reading",
    "grammar",
    "vocabulary",
    "writing"

];


function wordUpCreateQuestion(
    type,
    question,
    options,
    answer,
    explanation = ""
){

    return {

        type,

        question,

        options: options || [],

        answer,

        explanation

    };

}


function wordUpCheckQuestion(
    question,
    answer
){

    return (
        String(answer).toLowerCase().trim() ===
        String(question.answer).toLowerCase().trim()
    );

}


function wordUpScoreQuestions(
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
                wordUpCheckQuestion(
                    question,
                    answers[index]
                )
            ){

                correct++;

            }

        }
    );

    return Math.round(
        (correct / questions.length) * 100
    );

}


window.WORDUP_QUESTION_TYPES =
    WORDUP_QUESTION_TYPES;

window.wordUpCreateQuestion =
    wordUpCreateQuestion;

window.wordUpCheckQuestion =
    wordUpCheckQuestion;

window.wordUpScoreQuestions =
    wordUpScoreQuestions;


console.log(
    "WordUp V12.1 Question Engine loaded."
);

