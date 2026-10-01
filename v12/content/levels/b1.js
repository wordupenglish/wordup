/*
=========================================================
 WORDUP V12.1 B1 CONTENT
=========================================================
*/

const WORDUP_B1_CONTENT = [

{
    id: "b1-writing-cause-effect-1",

    level: "b1",

    skill: "writing",

    topic: "Cause and Effect Writing",

    objective:
        "Explain why something happens and describe its results in a clear paragraph.",

    explanation:
        "Cause and effect writing explains relationships between events or situations. A cause answers the question 'Why did it happen?' An effect answers 'What happened as a result?' Clear writing uses logical connectors and develops each main idea with supporting details.",

    rules: [

        "Clearly identify the main cause or causes.",

        "Clearly explain the resulting effect or effects.",

        "Use logical connectors such as because, therefore, as a result, and consequently.",

        "Develop the main idea with specific supporting details.",

        "Keep the paragraph focused on one central relationship."

    ],

    examples: [

        "Excessive smartphone use can reduce students' study time.",

        "Many students spend several hours online; as a result, they may have less time for homework.",

        "Because traffic is heavy in the morning, many workers arrive late."

    ],

    mistakes: [

        "Listing causes without explaining the effects.",

        "Using connectors without showing a logical relationship.",

        "Including unrelated examples.",

        "Writing a paragraph without a clear topic sentence."

    ],

    vocabulary: [

        {
            word: "cause",
            meaning: "a reason that makes something happen"
        },

        {
            word: "effect",
            meaning: "a result of an action or situation"
        },

        {
            word: "consequently",
            meaning: "as a result"
        },

        {
            word: "therefore",
            meaning: "for that reason"
        }

    ],

    practice: [

        {
            type: "writing",

            question:
                "Which sentence is the clearest cause-and-effect statement?",

            options: [

                "Smartphones are popular and expensive.",

                "Many students use smartphones; as a result, they may spend less time studying.",

                "Students have smartphones in their bags.",

                "Smartphones come in different colors."

            ],

            answer: 1,

            explanation:
                "The sentence clearly connects smartphone use with a possible reduction in study time."
        },

        {
            type: "vocabulary",

            question:
                "Which connector means 'as a result'?",

            options: [

                "however",

                "therefore",

                "although",

                "while"

            ],

            answer: 1,

            explanation:
                "Therefore introduces a result or conclusion."
        }

    ],

    test: [

        {
            type: "writing",

            question:
                "Which topic sentence best introduces a paragraph about the effects of traffic?",

            options: [

                "Traffic is something that people see.",

                "Traffic has several negative effects on people's daily lives.",

                "Cars can be many different colors.",

                "People sometimes buy cars."

            ],

            answer: 1,

            explanation:
                "The sentence clearly establishes the paragraph's main focus."
        },

        {
            type: "writing",

            question:
                "Which sentence logically expresses a result?",

            options: [

                "The weather was extremely cold; therefore, the match was cancelled.",

                "The weather was extremely cold; however, therefore the match.",

                "The weather was cold because therefore the match.",

                "The weather was cold although as a result."

            ],

            answer: 0,

            explanation:
                "Therefore correctly introduces the result."
        }

    ],

    review: [

        "Cause = why something happens.",

        "Effect = what happens as a result.",

        "Use connectors to make relationships clear.",

        "Support the main idea with relevant details."

    ],

    duration: 20
}

];


window.WORDUP_B1_CONTENT =
    WORDUP_B1_CONTENT;

console.log(
    "B1 content loaded:",
    WORDUP_B1_CONTENT.length
);

