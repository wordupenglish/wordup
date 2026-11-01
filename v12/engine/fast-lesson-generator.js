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

    function taskText(task) {
        if (typeof task === "string") return task;
        return task && (task.prompt || task.instruction || task.question || task.text) || "";
    }

    function defaultContext(definition) {
        const topic = definition.topic.toLowerCase();
        const contexts = {
            grammar: "Use " + topic + " when speaking and writing about real situations. Pay attention to the intended meaning, the surrounding words, and the time or relationship expressed by the sentence.",
            vocabulary: "Use the words in " + topic + " in meaningful sentences and familiar situations. Notice their meanings, word forms, and the words that commonly appear with them.",
            reading: "Use " + topic + " to identify purpose, key information, and supporting details. Read for the overall message first, then return to the text to confirm specific information.",
            listening: "Use " + topic + " to practise understanding the main message and important details. Listen for context, speaker purpose, and key information such as names, places, times, and actions.",
            speaking: "Use " + topic + " in everyday conversations. Organise your message, choose language that fits the situation, and speak clearly enough for the listener to follow.",
            writing: "Use " + topic + " when writing for a clear purpose and audience. Organise your ideas, connect supporting details, and review the text for accuracy and clarity."
        };
        return contexts[definition.skill] || "Apply " + topic + " in a realistic communication task.";
    }

    function defaultMistakes(definition) {
        const topic = definition.topic.toLowerCase();
        const bySkill = {
            grammar: ["Choosing a form without checking the intended meaning or time reference in " + topic + ".", "Leaving out a required auxiliary, verb form, or word-order element.", "Using the structure in a context where it does not express the intended meaning."],
            vocabulary: ["Choosing a word because it looks familiar without checking its exact meaning.", "Using a word with an unnatural collocation or incorrect word form.", "Confusing two related words that have different uses in context."],
            reading: ["Focusing on individual words and missing the overall purpose of the text.", "Treating one supporting detail as if it were the main idea.", "Making an inference that is not supported by information in the text."],
            listening: ["Focusing on every word and missing the speaker's main message.", "Confusing details such as names, places, times, or quantities.", "Ignoring context or speaker purpose when interpreting a response."],
            speaking: ["Giving information without organising it into a clear message.", "Choosing a phrase that does not fit the relationship or situation.", "Speaking too quickly or unclearly for the listener to follow the key information."],
            writing: ["Writing before deciding the purpose and main idea.", "Using linking words without showing the correct relationship between ideas.", "Finishing without checking sentence structure, spelling, and punctuation."]
        };
        return bySkill[definition.skill] || ["Using " + topic + " without considering the purpose.", "Ignoring the context in which the language is used.", "Submitting work without checking meaning and accuracy."];
    }

    function defaultGuidedPractice(definition, activities) {
        const tasks = (activities || []).map(taskText).filter(Boolean);
        return [
            ...tasks.slice(0, 3),
            "Compare your responses with the lesson rules and examples.",
            "Correct one response and explain why the revised version is more accurate."
        ];
    }

    function defaultIndependentPractice(definition, activities) {
        const topic = definition.topic.toLowerCase();
        const tasks = (activities || []).map(taskText).filter(Boolean);
        const first = tasks[tasks.length - 1] || "Apply the target skill in a new situation.";
        const skillTask = {
            grammar: "Create five original sentences using " + topic + " in different contexts, then explain one important grammar choice.",
            vocabulary: "Write a short paragraph using at least five target words accurately and underline the collocations.",
            reading: "Read a new " + topic + " text. Identify its purpose, main idea, and two details that support it.",
            listening: "Listen to a new " + topic + " recording. Note the main message and at least three key details.",
            speaking: "Give a one-minute spoken response about " + topic + ". Record it if possible and review clarity and fluency.",
            writing: "Write a short " + topic + " text for a clear audience and purpose. Revise it for organisation and accuracy."
        };
        return [first, skillTask[definition.skill] || "Apply the target skill independently.", "Review your work and identify one improvement for your next attempt."];
    }
    function buildLesson(definition, index, allDefinitions) {
        const next = allDefinitions[index + 1];

        const examples = definition.examples || definition.examplesInContext || [
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

        const mistakes = definition.mistakes || defaultMistakes(definition);
        const guidedPractice = definition.guidedPractice || defaultGuidedPractice(definition, activities);
        const independentPractice = definition.independentPractice || defaultIndependentPractice(definition, activities);
        const context = definition.context || defaultContext(definition);

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
                (definition.keyPoint
                    ? definition.keyPoint + " " + definition.objective
                    : definition.objective + " This lesson focuses on the language choices and practical decisions needed to use " + definition.topic.toLowerCase() + " accurately."),

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

            context,

            vocabulary,
            mistakes,

            guidedPractice,

            activities,

            practice,

            independentPractice,

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

            transcript: definition.transcript || "",
            readingPassage: definition.readingPassage || "",
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
