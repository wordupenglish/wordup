/*
=========================================================
 WORDUP V12.1 B2 CONTENT
=========================================================
*/

const WORDUP_B2_CONTENT = [

{
    id: "b2-writing-thesis-statements-1",

    level: "b2",

    skill: "writing",

    topic: "Thesis Statements",

    objective:
        "Write focused thesis statements that clearly communicate the central argument of an academic essay.",

    explanation:
        "A thesis statement presents the central claim or controlling idea of an essay. An effective thesis is specific, focused, and arguable when the assignment requires an argument. It should guide the reader and help organize the body paragraphs.",

    rules: [

        "State the central idea clearly.",

        "Avoid overly broad claims.",

        "Make the scope appropriate for the essay.",

        "Use precise language.",

        "Make the relationship between the topic and main points clear."

    ],

    examples: [

        "Smartphones can affect students' academic performance by reducing study time, increasing distraction, and encouraging multitasking.",

        "Regular reading can improve language development by expanding vocabulary, increasing exposure to grammatical structures, and strengthening comprehension.",

        "Online education provides greater flexibility, but its effectiveness depends on student engagement and access to reliable technology."

    ],

    mistakes: [

        "Writing only a topic instead of a claim.",

        "Making an extremely broad statement.",

        "Including several unrelated ideas.",

        "Using vague words such as 'things' or 'stuff'."

    ],

    vocabulary: [

        {
            word: "claim",
            meaning: "a statement that presents a position or idea"
        },

        {
            word: "scope",
            meaning: "the range or limits of a subject"
        },

        {
            word: "arguable",
            meaning: "open to reasonable disagreement or debate"
        },

        {
            word: "central idea",
            meaning: "the main idea controlling a piece of writing"
        }

    ],

    practice: [

        {
            type: "writing",

            question:
                "Which is the strongest thesis statement?",

            options: [

                "Technology is important.",

                "This essay will talk about technology.",

                "Smartphone use can affect students' academic performance by increasing distraction, reducing study time, and encouraging multitasking.",

                "There are many things about smartphones."

            ],

            answer: 2,

            explanation:
                "The third option presents a specific and focused central claim with clear supporting points."
        },

        {
            type: "writing",

            question:
                "What is one important function of a thesis statement?",

            options: [

                "To provide every detail in the essay",

                "To state the central idea of the essay",

                "To replace the conclusion",

                "To list every source used"

            ],

            answer: 1,

            explanation:
                "The thesis communicates the central idea or argument."
        }

    ],

    test: [

        {
            type: "writing",

            question:
                "Which thesis has an appropriate academic scope?",

            options: [

                "Education is important for everything in life.",

                "This essay is about schools.",

                "Online learning can benefit university students by increasing flexibility, expanding access, and supporting independent study.",

                "Universities are places where students learn many things."

            ],

            answer: 2,

            explanation:
                "The thesis identifies a specific subject and three manageable dimensions."
        },

        {
            type: "writing",

            question:
                "Which feature is most important for a focused thesis?",

            options: [

                "Length alone",

                "Specificity and clear central focus",

                "Using difficult vocabulary",

                "Including as many ideas as possible"

            ],

            answer: 1,

            explanation:
                "A focused thesis should communicate a clear and appropriately limited central idea."
        }

    ],

    review: [

        "A thesis states the central idea or argument.",

        "A strong thesis is specific and focused.",

        "The scope should match the essay.",

        "Avoid vague or overly broad claims."

    ],

    duration: 25
}

];


window.WORDUP_B2_CONTENT =
    WORDUP_B2_CONTENT;

console.log(
    "B2 content loaded:",
    WORDUP_B2_CONTENT.length
);

