/*
=========================================================
 WORDUP V12.1 ACADEMIC CONTENT
=========================================================
*/

const WORDUP_ACADEMIC_CONTENT = [

{
    id: "academic-writing-paraphrasing-1",

    level: "academic",

    skill: "writing",

    topic: "Academic Paraphrasing",

    objective:
        "Rewrite source information accurately in your own words while preserving the original meaning and acknowledging the source.",

    explanation:
        "Paraphrasing means expressing information from a source using different wording and sentence structure while keeping the original meaning. A good academic paraphrase is not simply a few word substitutions. It requires genuine restructuring and appropriate citation.",

    rules: [

        "Understand the original passage before rewriting it.",

        "Change both wording and sentence structure.",

        "Preserve the original meaning accurately.",

        "Do not add ideas that are not supported by the source.",

        "Cite the original source when required."

    ],

    examples: [

        "Original idea: Regular exercise can improve concentration.",

        "Paraphrase: Consistent physical activity may help people maintain better focus.",

        "Weak paraphrase: Regular exercise can make concentration better."

    ],

    mistakes: [

        "Changing only a few words.",

        "Changing the meaning of the source.",

        "Failing to cite the source.",

        "Adding unsupported information."

    ],

    vocabulary: [

        {
            word: "paraphrase",
            meaning: "to express information from a source using different words and structure"
        },

        {
            word: "source",
            meaning: "the original material from which information is taken"
        },

        {
            word: "preserve",
            meaning: "to keep something in its original condition or meaning"
        },

        {
            word: "citation",
            meaning: "a reference identifying the source of information"
        }

    ],

    practice: [

        {
            type: "writing",

            question:
                "Which is the strongest paraphrase of 'Regular reading improves vocabulary'?",

            options: [

                "Regular reading improves vocabulary.",

                "Reading on a consistent basis can help expand a person's vocabulary.",

                "Reading regularly improves vocabulary.",

                "Regular reading makes vocabulary better."

            ],

            answer: 1,

            explanation:
                "The sentence changes the wording and structure while preserving the original meaning."
        },

        {
            type: "writing",

            question:
                "What should a good academic paraphrase preserve?",

            options: [

                "Every original word",

                "The original meaning",

                "The original sentence structure",

                "Only the punctuation"

            ],

            answer: 1,

            explanation:
                "A paraphrase should preserve the source's meaning while using new wording and structure."
        }

    ],

    test: [

        {
            type: "writing",

            question:
                "Which practice is academically appropriate?",

            options: [

                "Replace a few words and present the sentence as completely original.",

                "Rewrite the idea substantially and acknowledge the source.",

                "Copy the sentence and remove the author's name.",

                "Change the punctuation only."

            ],

            answer: 1,

            explanation:
                "Academic paraphrasing requires genuine rewriting and appropriate source acknowledgment."
        },

        {
            type: "writing",

            question:
                "Why is citation still needed when information is paraphrased?",

            options: [

                "Because the underlying idea came from a source.",

                "Because paraphrases must contain quotations.",

                "Because paraphrasing means copying.",

                "Because citations replace explanation."

            ],

            answer: 0,

            explanation:
                "Changing the wording does not make the source's idea your own."
        }

    ],

    review: [

        "Understand the source first.",

        "Rewrite with genuinely different wording and structure.",

        "Preserve the original meaning.",

        "Acknowledge the source appropriately."

    ],

    duration: 25
},


{
    id: "academic-writing-thesis-1",

    level: "academic",

    skill: "writing",

    topic: "Academic Thesis Statements",

    objective:
        "Develop a clear thesis that establishes the central direction of an academic essay.",

    explanation:
        "An academic thesis statement communicates the central claim or controlling idea of an essay. It should be specific enough to guide the discussion while remaining manageable within the assigned length.",

    rules: [

        "Identify the central subject.",

        "State a clear position or controlling idea when appropriate.",

        "Limit the scope.",

        "Avoid vague claims.",

        "Make sure body paragraphs can directly support the thesis."

    ],

    examples: [

        "Regular reading can improve university students' English proficiency by expanding vocabulary, increasing grammatical awareness, and strengthening reading comprehension.",

        "Although online education increases access to learning, its effectiveness depends partly on student engagement, course design, and reliable technological access."

    ],

    mistakes: [

        "Writing only the essay topic.",

        "Making a claim that is too broad.",

        "Including unrelated arguments.",

        "Making claims that the essay cannot support."

    ],

    vocabulary: [

        {
            word: "thesis",
            meaning: "the central claim or controlling idea of an academic paper"
        },

        {
            word: "scope",
            meaning: "the boundaries or limits of a topic"
        },

        {
            word: "argument",
            meaning: "a reasoned position supported by evidence or reasoning"
        }

    ],

    practice: [

        {
            type: "writing",

            question:
                "Which sentence is most suitable as an academic thesis?",

            options: [

                "Education is important.",

                "This essay is about education.",

                "Online education can expand access to learning while requiring strong student engagement and effective course design.",

                "There are many things to say about education."

            ],

            answer: 2,

            explanation:
                "The thesis presents a focused central idea and identifies manageable dimensions."
        }

    ],

    test: [

        {
            type: "writing",

            question:
                "What should a thesis help the reader understand?",

            options: [

                "The entire essay word for word",

                "The central direction of the essay",

                "Every source in the reference list",

                "Only the conclusion"

            ],

            answer: 1,

            explanation:
                "The thesis establishes the central direction of the paper."
        }

    ],

    review: [

        "A thesis gives the essay a central direction.",

        "Keep the claim specific and manageable.",

        "Make sure the body can support the thesis."

    ],

    duration: 22
}

];


window.WORDUP_ACADEMIC_CONTENT =
    WORDUP_ACADEMIC_CONTENT;

console.log(
    "Academic content loaded:",
    WORDUP_ACADEMIC_CONTENT.length
);

