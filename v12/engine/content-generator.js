/*
=========================================================
 WORDUP V12 CONTENT GENERATOR
=========================================================

Each topic automatically receives:

- explanation
- rules
- examples
- common mistakes
- practice
- harder test

=========================================================
*/

function wordUpV12BuildLesson(
    level,
    skill,
    topic,
    index
){

    const id =
        `${level}-${skill}-${index + 1}`;

    return {

        id,

        title: topic,

        skill,

        level,

        explanation:
            `This lesson teaches ${topic}. Study the explanation carefully, review the rules, and then work through the examples before starting practice.`,

        rules: [

            `Understand the meaning and purpose of ${topic}.`,

            `Pay attention to how ${topic} is used in real English.`,

            `Use the structure consistently and accurately.`,

            `Check meaning, grammar, punctuation, and context.`

        ],

        examples: [

            `Example 1: ${topic} used in a clear sentence.`,

            `Example 2: A second example showing correct usage.`,

            `Example 3: A more natural example in context.`

        ],

        mistakes: [

            `Avoid confusing ${topic} with similar structures.`,

            `Do not ignore context when applying the rule.`,

            `Check your sentence before moving forward.`

        ]

    };

}


function wordUpV12BuildQuestions(
    topic,
    count,
    harder
){

    const questions = [];

    for(
        let i = 0;
        i < count;
        i++
    ){

        questions.push({

            question:
                harder
                    ? `Which option demonstrates the most accurate use of ${topic} in context?`
                    : `Which option best demonstrates ${topic}?`,

            options: [

                "Correct application",

                "Incorrect structure",

                "Unrelated structure",

                "Incomplete application"

            ],

            answer: 0

        });

    }

    return questions;

}


function wordUpV12BuildSession(
    level,
    skill,
    topic,
    index
){

    const lessons = [];

    for(
        let i = 0;
        i < 3;
        i++
    ){

        lessons.push(
            wordUpV12BuildLesson(
                level,
                skill,
                topic,
                index * 3 + i
            )
        );

    }

    return {

        id:
            `${level}-${skill}-session-${index + 1}`,

        level,

        skill,

        title:
            `Session ${index + 1}: ${topic}`,

        description:
            `Self-study session covering ${topic}. Complete every lesson before practice and the final test.`,

        lessons,

        practice:
            wordUpV12BuildQuestions(
                topic,
                5,
                false
            ),

        test:
            wordUpV12BuildQuestions(
                topic,
                8,
                true
            ),

        passingScore: 70

    };

}


window.wordUpV12BuildLesson =
    wordUpV12BuildLesson;

window.wordUpV12BuildSession =
    wordUpV12BuildSession;

window.wordUpV12BuildQuestions =
    wordUpV12BuildQuestions;

console.log(
    "WordUp V12 content generator loaded."
);
