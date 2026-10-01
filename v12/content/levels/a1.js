/*
=========================================================
 WORDUP V12.1 A1 CONTENT
=========================================================
*/

const WORDUP_A1_CONTENT = [

{
    id: "a1-grammar-present-simple-1",

    level: "a1",

    skill: "grammar",

    topic: "Present Simple",

    objective:
        "Use the present simple to talk about routines, habits, facts, and regular activities.",

    explanation:
        "The present simple is commonly used for repeated actions, routines, habits, and facts. With I, you, we, and they, use the base form of the verb. With he, she, and it, the verb usually takes -s or -es.",

    rules: [

        "I work every day.",

        "You work every day.",

        "He works every day.",

        "She studies English.",

        "Use do or does to form many questions and negatives."

    ],

    examples: [

        "I study English every evening.",

        "She works at a hospital.",

        "They live in Kabul.",

        "Does he speak English?"

    ],

    mistakes: [

        "He work every day.",

        "She study English.",

        "Does he speaks English?",

        "I am go to school every day."

    ],

    vocabulary: [

        {
            word: "routine",
            meaning: "something that happens regularly"
        },

        {
            word: "habit",
            meaning: "something a person regularly does"
        },

        {
            word: "usually",
            meaning: "in most cases or on most occasions"
        }

    ],

    practice: [

        {
            type: "grammar",

            question:
                "She ____ English every day.",

            options: [

                "study",

                "studies",

                "studying",

                "studied"

            ],

            answer: 1,

            explanation:
                "With she, the present simple verb usually takes -s or -es."
        },

        {
            type: "grammar",

            question:
                "They ____ in Kabul.",

            options: [

                "lives",

                "living",

                "live",

                "lived"

            ],

            answer: 2,

            explanation:
                "With they, use the base form live."
        },

        {
            type: "grammar",

            question:
                "____ he work on Fridays?",

            options: [

                "Do",

                "Does",

                "Is",

                "Are"

            ],

            answer: 1,

            explanation:
                "Use does with he, she, and it in present-simple questions."
        }

    ],

    test: [

        {
            type: "grammar",

            question:
                "My brother ____ football every weekend.",

            options: [

                "play",

                "plays",

                "playing",

                "played"

            ],

            answer: 1,

            explanation:
                "My brother is third-person singular, so use plays."
        },

        {
            type: "grammar",

            question:
                "Which sentence is correct?",

            options: [

                "She don't like coffee.",

                "She doesn't likes coffee.",

                "She doesn't like coffee.",

                "She not like coffee."

            ],

            answer: 2,

            explanation:
                "After doesn't, use the base form of the verb: like."
        }

    ],

    review: [

        "Use the present simple for routines and facts.",

        "He/she/it normally takes -s or -es.",

        "Use do/does for questions and negatives."

    ],

    duration: 15
}

];


window.WORDUP_A1_CONTENT =
    WORDUP_A1_CONTENT;


console.log(
    "A1 content loaded:",
    WORDUP_A1_CONTENT.length
);

