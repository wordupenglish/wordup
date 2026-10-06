/*
=========================================================
 WORDUP CURRICULUM EXPANSION ENGINE
 Uses the existing V12 master curriculum map.
 Does NOT create a new curriculum version.
=========================================================
*/

(function () {

    "use strict";

    const LEVEL_NAMES = {
        foundation: "Foundation",
        a1: "A1",
        a2: "A2",
        b1: "B1",
        b2: "B2",
        c1: "C1",
        c2: "C2",
        academic: "Academic English"
    };

    const SKILL_NAMES = {
        writing: "Writing",
        grammar: "Grammar",
        vocabulary: "Vocabulary",
        reading: "Reading",
        listening: "Listening"
    };

    const SKILL_ICONS = {
        writing: "✍️",
        grammar: "🔤",
        vocabulary: "📚",
        reading: "📖",
        listening: "🎧"
    };

    function slugify(value) {
        return String(value)
            .toLowerCase()
            .replace(/&/g, " and ")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    }

    function levelName(level) {
        return LEVEL_NAMES[level] || level;
    }

    function skillName(skill) {
        return SKILL_NAMES[skill] || skill;
    }

    function buildObjective(level, skill, topic) {

        if (skill === "writing") {
            return "Develop the ability to use " + topic +
                " clearly and appropriately in written English.";
        }

        if (skill === "grammar") {
            return "Understand and use " + topic +
                " accurately in clear English sentences.";
        }

        if (skill === "vocabulary") {
            return "Build useful vocabulary knowledge related to " + topic +
                " and use it appropriately in context.";
        }

        if (skill === "reading") {
            return "Develop reading skills through " + topic +
                " and learn to understand meaning, structure, and important information.";
        }

        if (skill === "listening") {
            return "Develop listening skills through " + topic +
                " and identify important meaning, information, and context.";
        }

        return "Develop English skills through " + topic + ".";
    }

    function buildExplanation(level, skill, topic) {

        const levelText = levelName(level);

        if (skill === "writing") {
            return (
                "This " + levelText + " writing lesson focuses on " + topic + ". " +
                "Learners should first understand the purpose of the writing task, " +
                "then organize ideas clearly, choose appropriate language, and check " +
                "grammar, vocabulary, punctuation, and overall clarity before finishing."
            );
        }

        if (skill === "grammar") {
            return (
                "This " + levelText + " grammar lesson focuses on " + topic + ". " +
                "The goal is not only to recognize the form but also to understand " +
                "how it works in real communication. Learners should notice the structure, " +
                "understand its meaning, use it in context, and check their sentences for accuracy."
            );
        }

        if (skill === "vocabulary") {
            return (
                "This " + levelText + " vocabulary lesson focuses on " + topic + ". " +
                "Good vocabulary learning includes understanding meaning, noticing words " +
                "in context, learning common combinations, and using new vocabulary accurately " +
                "rather than memorizing isolated words."
            );
        }

        if (skill === "reading") {
            return (
                "This " + levelText + " reading lesson focuses on " + topic + ". " +
                "Effective readers identify the purpose of a text, locate important information, " +
                "connect ideas, use context to understand unfamiliar language, and distinguish " +
                "main ideas from supporting details."
            );
        }

        if (skill === "listening") {
            return (
                "This " + levelText + " listening lesson focuses on " + topic + ". " +
                "Effective listening requires attention to key words, context, speaker purpose, " +
                "organization, and meaning. Learners should focus on understanding the message " +
                "rather than trying to recognize every single word."
            );
        }

        return "This lesson develops English through " + topic + ".";
    }

    function buildRules(skill, topic) {

        if (skill === "writing") {
            return [
                "Understand the purpose before writing.",
                "Organize ideas in a logical order.",
                "Use language appropriate to the task and audience.",
                "Check grammar, vocabulary, spelling, and punctuation.",
                "Revise the final text for clarity."
            ];
        }

        if (skill === "grammar") {
            return [
                "Identify the grammatical structure.",
                "Understand its meaning and function.",
                "Notice the structure in real sentences.",
                "Use the structure in an appropriate context.",
                "Check the final sentence for accuracy."
            ];
        }

        if (skill === "vocabulary") {
            return [
                "Learn the meaning of the word or expression.",
                "Notice how it is used in context.",
                "Learn useful word combinations.",
                "Pay attention to register and appropriateness.",
                "Use the vocabulary in a complete sentence."
            ];
        }

        if (skill === "reading") {
            return [
                "Identify the purpose of the text.",
                "Look for the main idea.",
                "Find supporting information.",
                "Use context when a word is unfamiliar.",
                "Check that your interpretation is supported by the text."
            ];
        }

        if (skill === "listening") {
            return [
                "Identify the situation and topic.",
                "Listen for the main message.",
                "Notice important details.",
                "Use context to interpret unfamiliar language.",
                "Check your understanding against the complete message."
            ];
        }

        return [];
    }

    function buildExamples(level, skill, topic) {

        if (skill === "writing") {
            return [
                "The lesson focuses on " + topic + ".",
                "A clear response should organize ideas around the purpose of " + topic + ".",
                "After writing, check the text for accuracy and clarity."
            ];
        }

        if (skill === "grammar") {
            return [
                "Learners study " + topic + " in meaningful sentences.",
                "The structure should be understood through both form and meaning.",
                "Always check how " + topic + " functions in context."
            ];
        }

        if (skill === "vocabulary") {
            return [
                "The lesson develops vocabulary connected with " + topic + ".",
                "New vocabulary should be understood through context.",
                "Learners should use new vocabulary in complete sentences."
            ];
        }

        if (skill === "reading") {
            return [
                "A reader can use " + topic + " to understand a text more effectively.",
                "Important information should be supported by evidence from the text.",
                "Good reading connects individual details to the overall meaning."
            ];
        }

        if (skill === "listening") {
            return [
                "A listener can use " + topic + " to understand spoken English.",
                "Important information should be identified from the speaker's message.",
                "Context helps listeners interpret unfamiliar words and expressions."
            ];
        }

        return [];
    }

    function buildVocabulary(skill, topic) {

        const common = [
            {
                word: "context",
                meaning: "the situation or surrounding information that helps explain meaning"
            },
            {
                word: "accuracy",
                meaning: "the quality of being correct"
            },
            {
                word: "purpose",
                meaning: "the reason why something is done or created"
            },
            {
                word: "appropriate",
                meaning: "suitable for a particular situation"
            }
        ];

        if (skill === "grammar") {
            common.push({
                word: "structure",
                meaning: "the way parts of a language are organized"
            });
        }

        if (skill === "writing") {
            common.push({
                word: "coherence",
                meaning: "clear and logical connection between ideas"
            });
        }

        if (skill === "reading") {
            common.push({
                word: "evidence",
                meaning: "information that supports an idea or interpretation"
            });
        }

        if (skill === "listening") {
            common.push({
                word: "speaker",
                meaning: "the person who is talking"
            });
        }

        if (skill === "vocabulary") {
            common.push({
                word: "collocation",
                meaning: "a combination of words that commonly occur together"
            });
        }

        return common;
    }

    function buildPractice(skill, topic, level, allTopics) {

        const distractors = allTopics
            .filter(item => item !== topic)
            .slice(0, 3);

        while (distractors.length < 3) {
            distractors.push("another English topic");
        }

        return [
            {
                type: "multiple-choice",
                question: "Which topic is the focus of this lesson?",
                options: [
                    topic,
                    distractors[0],
                    distractors[1],
                    distractors[2]
                ],
                answer: 0,
                explanation:
                    "This lesson focuses on " + topic + "."
            },

            {
                type: "multiple-choice",
                question: "What should a learner do when studying " + topic + "?",
                options: [
                    "Understand the topic and use it in context",
                    "Memorize unrelated information",
                    "Ignore examples",
                    "Avoid practice"
                ],
                answer: 0,
                explanation:
                    "Understanding and using the topic in context is an important part of effective learning."
            },

            {
                type: "multiple-choice",
                question: "Which approach supports learning " + topic + "?",
                options: [
                    "Study meaning, examples, and use",
                    "Study without examples",
                    "Avoid checking mistakes",
                    "Use the topic without understanding it"
                ],
                answer: 0,
                explanation:
                    "Meaning, examples, practice, and review help learners develop usable English."
            }
        ];
    }

    function buildTest(skill, topic, level, allTopics) {

        const distractors = allTopics
            .filter(item => item !== topic)
            .slice(-3);

        while (distractors.length < 3) {
            distractors.push("another English topic");
        }

        return [
            {
                type: "multiple-choice",
                question: "What is the main focus of this lesson?",
                options: [
                    topic,
                    distractors[0],
                    distractors[1],
                    distractors[2]
                ],
                answer: 0,
                explanation:
                    "The lesson focuses on " + topic + "."
            },

            {
                type: "multiple-choice",
                question: "Which learning action is most useful for " + topic + "?",
                options: [
                    "Understand it and apply it in context",
                    "Ignore the examples",
                    "Study it without practice",
                    "Avoid reviewing mistakes"
                ],
                answer: 0,
                explanation:
                    "Applying new knowledge in context helps turn recognition into usable English."
            },

            {
                type: "multiple-choice",
                question: "Before considering this topic mastered, a learner should:",
                options: [
                    "Understand, practise, and review it",
                    "Only read its title",
                    "Skip the practice activities",
                    "Avoid assessment"
                ],
                answer: 0,
                explanation:
                    "Mastery requires understanding, practice, review, and successful assessment."
            }
        ];
    }

    function buildLesson(level, skill, topic, index, allTopics) {

        const id =
            "curriculum-" +
            level +
            "-" +
            skill +
            "-" +
            slugify(topic);

        return {
            id: id,

            level: level,

            skill: skill,

            topic: topic,

            unit: skillName(skill),

            unitOrder: index + 1,

            source: "WORDUP_V12_MASTER_MAP",

            curriculum: true,

            icon: SKILL_ICONS[skill],

            objective: buildObjective(level, skill, topic),

            explanation: buildExplanation(level, skill, topic),

            rules: buildRules(skill, topic),

            examples: buildExamples(level, skill, topic),

            mistakes: [
                "Trying to complete the lesson without understanding the main idea.",
                "Ignoring examples and context.",
                "Repeating the same mistake without reviewing the explanation.",
                "Moving forward without checking understanding."
            ],

            vocabulary: buildVocabulary(skill, topic),

            practice: buildPractice(
                skill,
                topic,
                level,
                allTopics
            ),

            test: buildTest(
                skill,
                topic,
                level,
                allTopics
            ),

            review: [
                "Review the meaning and purpose of " + topic + ".",
                "Study the examples again.",
                "Complete the practice activities.",
                "Review mistakes before taking the test."
            ],

            duration: skill === "writing" ? 20 :
                      skill === "reading" ? 18 :
                      skill === "listening" ? 18 :
                      skill === "grammar" ? 15 :
                      12
        };
    }

    function expandCurriculum() {

        if (!window.WORDUP_V12_CURRICULUM) {
            console.error(
                "WordUp curriculum expansion: master map is not loaded."
            );
            return;
        }

        if (!window.WORDUP_CONTENT_REGISTRY) {
            console.error(
                "WordUp curriculum expansion: content registry is not loaded."
            );
            return;
        }

        const curriculum = window.WORDUP_V12_CURRICULUM;
        const registry = window.WORDUP_CONTENT_REGISTRY;

        let added = 0;
        let existing = 0;

        Object.keys(curriculum).forEach(level => {

            if (!registry[level]) {
                registry[level] = [];
            }

            const levelMap = curriculum[level];

            Object.keys(levelMap).forEach(skill => {

                if (!registry[level][skill]) {
                    // Registry stores arrays by level, so this branch
                    // is intentionally unused. Kept defensive.
                }

                const topics = Array.isArray(levelMap[skill])
                    ? levelMap[skill]
                    : [];

                const existingTopics = registry[level]
                    .filter(item =>
                        item &&
                        item.skill === skill &&
                        item.level === level
                    )
                    .map(item => item.topic);

                topics.forEach((topic, index) => {

                    if (existingTopics.includes(topic)) {
                        existing++;
                        return;
                    }

                    const allTopics = topics;

                    const lesson = buildLesson(
                        level,
                        skill,
                        topic,
                        index,
                        allTopics
                    );

                    registry[level].push(lesson);

                    added++;
                });
            });
        });

        window.WORDUP_CURRICULUM_EXPANDED = true;

        window.WORDUP_CURRICULUM_EXPANSION_STATS = {
            added: added,
            existing: existing,
            total: Object.values(registry)
                .reduce((sum, items) =>
                    sum + (Array.isArray(items) ? items.length : 0), 0)
        };

        console.log(
            "WordUp curriculum expanded:",
            window.WORDUP_CURRICULUM_EXPANSION_STATS
        );
    }

    expandCurriculum();

})();
