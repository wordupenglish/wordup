/*
=========================================================
 WORDUP V12.1 CONTENT VALIDATOR
=========================================================
*/

function wordUpValidateLesson(lesson){

    const errors = [];

    if(!lesson.id)
        errors.push("Missing ID");

    if(!lesson.level)
        errors.push("Missing level");

    if(!lesson.skill)
        errors.push("Missing skill");

    if(!lesson.topic)
        errors.push("Missing topic");

    if(!lesson.objective)
        errors.push("Missing objective");

    if(!lesson.explanation)
        errors.push("Missing explanation");

    if(!lesson.rules?.length)
        errors.push("Missing rules");

    if(!lesson.examples?.length)
        errors.push("Missing examples");

    if(!lesson.practice?.length)
        errors.push("Missing practice");

    if(!lesson.test?.length)
        errors.push("Missing test");

    return {

        valid:
            errors.length === 0,

        errors

    };

}


function wordUpValidateAllContent(){

    const lessons =
        wordUpGetAllContent();

    const results = {

        total:
            lessons.length,

        valid: 0,

        invalid: 0,

        errors: []

    };

    lessons.forEach(
        lesson => {

            const result =
                wordUpValidateLesson(
                    lesson
                );

            if(result.valid){

                results.valid++;

            }else{

                results.invalid++;

                results.errors.push({

                    id: lesson.id,

                    errors:
                        result.errors

                });

            }

        }
    );

    return results;

}


window.wordUpValidateLesson =
    wordUpValidateLesson;

window.wordUpValidateAllContent =
    wordUpValidateAllContent;


console.log(
    "WordUp V12.1 Content Validator loaded."
);

