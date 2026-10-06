(function () {
    "use strict";

    /*
     * WordUp Fast Lesson Generator
     * Creates rich self-study lessons from compact lesson definitions.
     */

    function makeOptions(correct, distractors) {
        const options = [correct, ...distractors];
        return options.map((value, index) => ({
            text: value,
            correct: index === 0
        }));
    }

    function makeMCQ(question, correct, distractors) {
        return {
            question,
            options: [correct, ...distractors],
            answer: 0
        };
    }

    function buildLesson(definition, index, allDefinitions) {
        const next = allDefinitions[index + 1];

        const examples = definition.examples || [
            `This is an example of ${definition.topic.toLowerCase()}.`,
            `We use this language in everyday communication.`,
            `The example shows how the target language works.`,
            `Use the pattern carefully in your own English.`
        ];

        const vocabulary = definition.vocabulary || [
            {
                word: definition.keyWord || "example",
                meaning: "a word or sentence that helps explain an idea"
            },
            {
                word: "practice",
                meaning: "an activity that helps you improve a skill"
            },
            {
                word: "meaning",
                meaning: "what a word, sentence, or expression communicates"
            },
            {
                word: "correct",
                meaning: "right or accurate"
            }
        ];

        const rules = definition.rules || [
            `Understand the main pattern before using ${definition.topic.toLowerCase()}.`,
            "Use complete and clear sentences.",
            "Check grammar, spelling, and punctuation.",
            "Use the language in meaningful context."
        ];

        const activities = definition.activities || [
            {
                type: "guided-practice",
                prompt: `Complete guided practice using ${definition.topic.toLowerCase()}.`
            },
            {
                type: "error-correction",
                prompt: "Find and correct mistakes in example sentences."
            },
            {
                type: "sentence-building",
                prompt: "Create your own sentences using the lesson pattern."
            },
            {
                type: "real-life-use",
                prompt: "Use the target language in a realistic everyday situation."
            }
        ];

        const practice = definition.practice || [
            makeMCQ(
                `Which statement best describes ${definition.topic.toLowerCase()}?`,
                definition.keyPoint || `It is used correctly according to the lesson.`,
                [
                    "It should always be avoided.",
                    "It has no connection to communication.",
                    "It is only used in advanced academic writing."
                ]
            ),
            makeMCQ(
                "Which approach is best for improving this skill?",
                "Understand the pattern and practice it in context.",
                [
                    "Memorize random sentences without understanding them.",
                    "Avoid using the skill.",
                    "Use incorrect forms repeatedly."
                ]
            ),
            makeMCQ(
                "What should you check when completing an English exercise?",
                "Meaning, grammar, and accuracy.",
                [
                    "Only the number of words.",
                    "Only difficult vocabulary.",
                    "Nothing after writing."
                ]
            ),
            makeMCQ(
                "Which sentence is most useful for learning?",
                examples[0],
                [
                    "A sentence unrelated to the topic.",
                    "A sentence with no clear meaning.",
                    "A sentence containing random words."
                ]
            )
        ];

        const test = definition.test || [
            makeMCQ(
                `What is the main goal of the lesson "${definition.topic}"?`,
                definition.objective,
                [
                    "To avoid using English in real situations.",
                    "To memorize unrelated vocabulary.",
                    "To study a completely different topic."
                ]
            ),
            makeMCQ(
                "Which learner demonstrates good understanding?",
                "A learner who can use the target language independently.",
                [
                    "A learner who only recognizes the title.",
                    "A learner who never practices.",
                    "A learner who copies every example."
                ]
            ),
            makeMCQ(
                "What should a learner do after making a mistake?",
                "Identify the mistake, understand it, and try again.",
                [
                    "Ignore the mistake completely.",
                    "Stop learning the topic.",
                    "Memorize the incorrect form."
                ]
            ),
            makeMCQ(
                "What indicates lesson mastery?",
                definition.mastery ||
                "The learner can use the target language accurately in a new context.",
                [
                    "The learner can only repeat one example.",
                    "The learner remembers the lesson title.",
                    "The learner avoids independent practice."
                ]
            )
        ];

        return {
            id: definition.id,
            level: definition.level,
            skill: definition.skill,
            topic: definition.topic,

            objective: definition.objective,
            prerequisites: definition.prerequisites || [],

            introduction:
                definition.introduction ||
                `This lesson develops your ability to use ${definition.topic.toLowerCase()} clearly and accurately.`,

            explanation:
                definition.explanation ||
                `In this lesson, you will learn the main ideas, patterns, and practical uses of ${definition.topic.toLowerCase()}.`,

            learningPoints:
                definition.learningPoints || [
                    `Understand ${definition.topic.toLowerCase()}.`,
                    "Recognize the target language in context.",
                    "Use the target language accurately.",
                    "Practice independently.",
                    "Apply the skill to a new situation."
                ],

            rules,
            examples,
            examplesInContext:
                definition.examplesInContext ||
                examples.map(example =>
                    `Context: ${example}`
                ),

            context:
                definition.context ||
                "This language is useful in everyday communication, education, work, and real-life situations.",

            vocabulary,
            mistakes:
                definition.mistakes || [
                    "Using the wrong structure.",
                    "Ignoring the meaning of the sentence.",
                    "Forgetting basic grammar or punctuation.",
                    "Copying examples without understanding them."
                ],

            guidedPractice:
                definition.guidedPractice || [
                    "Review the explanation.",
                    "Study the examples.",
                    "Complete the guided activities.",
                    "Check your answers.",
                    "Try the task again without looking at the example."
                ],

            activities,

            practice,

            independentPractice:
                definition.independentPractice || [
                    `Create your own examples using ${definition.topic.toLowerCase()}.`,
                    "Complete the task without looking at the lesson examples.",
                    "Read your answers and check their meaning.",
                    "Correct your mistakes.",
                    "Create one new example from a real-life situation."
                ],

            test,

            review:
                definition.review || [
                    `Review the main ideas of ${definition.topic.toLowerCase()}.`,
                    "Review the rules.",
                    "Review the examples.",
                    "Review common mistakes.",
                    "Complete the test again after reviewing."
                ],

            mastery:
                definition.mastery ||
                `You can use ${definition.topic.toLowerCase()} accurately and independently in a new context.`,

            nextLesson:
                definition.nextLesson ||
                (next ? next.id : null),

            estimatedTime: definition.estimatedTime || 40,
            duration: definition.duration || definition.estimatedTime || 40,

            media: definition.media || {},
            skillContent: definition.skillContent || {}
        };
    }

    window.WORDUP_FAST_LESSON_GENERATOR = {
        buildLesson,
        buildLessons(definitions) {
            return definitions.map((definition, index) =>
                buildLesson(definition, index, definitions)
            );
        }
    };

    console.log("WordUp Fast Lesson Generator loaded.");
})();
