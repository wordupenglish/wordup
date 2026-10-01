/*
=========================================================
 WORDUP V12.1 A2 CONTENT
=========================================================
*/

const WORDUP_A2_CONTENT = [

{
    id: "a2-grammar-present-perfect-1",

    level: "a2",

    skill: "grammar",

    topic: "Present Perfect",

    objective:
        "Use the present perfect to connect past experiences or actions with the present.",

    explanation:
        "The present perfect is formed with have or has plus the past participle. It is commonly used for life experiences, recent actions with present results, and situations that continue up to now.",

    rules: [

        "I have finished my homework.",

        "She has visited Herat.",

        "Use has with he, she, and it.",

        "Use have with I, you, we, and they.",

        "The main verb appears in the past-participle form."

    ],

    examples: [

        "I have finished the assignment.",

        "She has already eaten.",

        "They have visited several cities.",

        "Have you ever studied abroad?"

    ],

    mistakes: [

        "I have went there.",

        "She have finished.",

        "Did you ever visited Kabul?",

        "I have seen him yesterday."

    ],

    vocabulary: [

        {
            word: "experience",
            meaning: "something that happens to or is done by a person"
        },

        {
            word: "recently",
            meaning: "not long ago"
        },

        {
            word: "already",
            meaning: "before now or before a particular time"
        }

    ],

    practice: [

        {
            type: "grammar",

            question:
                "She ____ finished her homework.",

            options: [

                "have",

                "has",

                "is",

                "did"

            ],

            answer: 1,

            explanation:
                "Use has with she."
        },

        {
            type: "grammar",

            question:
                "I have ____ that movie before.",

            options: [

                "see",

                "saw",

                "seen",

                "seeing"

            ],

            answer: 2,

            explanation:
                "The past participle of see is seen."
        }

    ],

    test: [

        {
            type: "grammar",

            question:
                "Which sentence is correct?",

            options: [

                "He have finished his work.",

                "He has finished his work.",

                "He has finish his work.",

                "He finished has his work."

            ],

            answer: 1,

            explanation:
                "The present perfect uses has + past participle with he."
        },

        {
            type: "grammar",

            question:
                "Which sentence describes an experience?",

            options: [

                "I am visiting Herat now.",

                "I visited Herat yesterday.",

                "I have visited Herat several times.",

                "I visit Herat every week."

            ],

            answer: 2,

            explanation:
                "Present perfect can describe life experience without specifying a finished past time."
        }

    ],

    review: [

        "Present perfect = have/has + past participle.",

        "Use it for experiences and present-related past actions.",

        "Do not normally use a finished past-time expression with present perfect."

    ],

    duration: 18
}

];


window.WORDUP_A2_CONTENT =
    WORDUP_A2_CONTENT;

console.log(
    "A2 content loaded:",
    WORDUP_A2_CONTENT.length
);

