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
        listening: "Listening",
        speaking: "Speaking"
    };

    const SKILL_ICONS = {
        writing: "✍️",
        grammar: "🔤",
        vocabulary: "📚",
        reading: "📖",
        listening: "🎧",
        speaking: "🗣️"
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

        if (skill === "speaking") {
            return "Develop spoken English through " + topic +
                ", with attention to clear ideas, appropriate language, " +
                "fluency, pronunciation, and interaction.";
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

        if (skill === "speaking") {
            return (
                "This " + levelText + " speaking lesson focuses on " + topic + ". " +
                "Plan your message, organize ideas, choose language for your " +
                "audience, and practise speaking aloud. Pay attention to clarity, " +
                "pronunciation, fluency, and responding appropriately to others. " +
                "Record yourself when possible and review one area to improve."
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

    function buildAssessmentQuestion(question, correct, distractors, explanation, seed) {
        const options = [correct].concat(distractors).slice(0, 4);
        const offset = Math.abs(seed) % options.length;
        const rotated = options.slice(offset).concat(options.slice(0, offset));
        const answer = (options.length - offset) % options.length;

        return {
            type: "multiple-choice",
            question: question,
            options: rotated,
            answer: answer,
            explanation: explanation
        };
    }

    function assessmentSeed(topic, index, isTest) {
        const text = String(topic);
        let sum = isTest ? 17 : 3;

        for (let i = 0; i < text.length; i++) {
            sum += text.charCodeAt(i) * (i + 1);
        }

        return sum + index * 7;
    }

    function buildPractice(skill, topic, level, allTopics) {
        const prompts = {
            writing: [
                "Which approach best supports writing about " + topic + "?",
                "When revising writing about " + topic + ", what should you check?",
                "Which choice is most likely to improve a response about " + topic + "?"
            ],
            grammar: [
                "When studying " + topic + ", what should you examine in a sentence?",
                "How can you check your use of " + topic + "?",
                "Which approach best supports accurate use of " + topic + "?"
            ],
            vocabulary: [
                "How should you learn vocabulary related to " + topic + "?",
                "What helps you use vocabulary from " + topic + " accurately?",
                "Which action best develops usable vocabulary for " + topic + "?"
            ],
            reading: [
                "When reading a text about " + topic + ", what should you identify first?",
                "How should you support an interpretation of a text about " + topic + "?",
                "What is a useful strategy when reading about " + topic + "?"
            ],
            listening: [
                "When listening to material about " + topic + ", what should you focus on?",
                "How can context help you understand spoken material about " + topic + "?",
                "What should you do after listening to material about " + topic + "?"
            ],
            speaking: [
                "When speaking about " + topic + ", what should you do before presenting your ideas?",
                "Which technique can make speaking about " + topic + " clearer?",
                "How can you improve your spoken response about " + topic + "?"
            ]
        };

        const correct = {
            writing: [
                "Plan, organize, and support ideas for the task and audience",
                "Check organization, grammar, vocabulary, and punctuation",
                "Revise the response for purpose, clarity, and accuracy"
            ],
            grammar: [
                "Examine the form, meaning, and use in context",
                "Check whether the structure expresses the intended meaning",
                "Practise the structure in meaningful sentences"
            ],
            vocabulary: [
                "Study meaning, context, and common word combinations",
                "Use the words in appropriate sentences and situations",
                "Review meaning and practise using the words in context"
            ],
            reading: [
                "Identify the main idea and the writer's purpose",
                "Support the interpretation with evidence from the text",
                "Connect important details to the overall meaning"
            ],
            listening: [
                "Listen for the main message and relevant details",
                "Use the situation and surrounding message to interpret meaning",
                "Review the main message and check important details"
            ],
            speaking: [
                "Plan the main point and organize supporting ideas",
                "Use clear language, appropriate pace, and connected ideas",
                "Practise aloud and review clarity and fluency"
            ]
        };

        const wrong = {
            writing: [
                "Ignore the audience and write unrelated ideas",
                "Finish without reviewing the text",
                "Choose words without considering their meaning"
            ],
            grammar: [
                "Memorize a label without examining how it is used",
                "Ignore the sentence's intended meaning",
                "Avoid practising the structure in context"
            ],
            vocabulary: [
                "Memorize words without learning their meanings",
                "Use every word in exactly the same situation",
                "Ignore context and common word combinations"
            ],
            reading: [
                "Choose an interpretation without textual evidence",
                "Ignore the main idea and focus on one unrelated detail",
                "Assume that every unfamiliar word changes the main message"
            ],
            listening: [
                "Ignore the main message and focus on unrelated sounds",
                "Guess the entire message without using context",
                "Assume that every word must be understood before meaning is clear"
            ],
            speaking: [
                "Speak without considering the purpose or audience",
                "Ignore whether listeners can follow the message",
                "Avoid practising or reviewing your performance"
            ]
        };

        const skillPrompts = prompts[skill] || prompts.vocabulary;
        const correctAnswers = correct[skill] || correct.vocabulary;
        const distractors = wrong[skill] || wrong.vocabulary;

        return skillPrompts.map(function (question, index) {
            return buildAssessmentQuestion(
                question,
                correctAnswers[index],
                distractors,
                "For " + topic + ", this approach supports the " +
                    skillName(skill).toLowerCase() +
                    " skill by focusing on meaningful use and the purpose of the task.",
                assessmentSeed(topic, index, false)
            );
        });
    }

    function buildTest(skill, topic, level, allTopics) {
        const questions = {
            writing: [
                "Which plan is strongest for a writing task about " + topic + "?",
                "Which revision is most useful for a response about " + topic + "?",
                "What should a final check of writing about " + topic + " include?"
            ],
            grammar: [
                "Which method best checks understanding of " + topic + "?",
                "What matters when applying " + topic + " in a new sentence?",
                "How can a learner demonstrate accurate use of " + topic + "?"
            ],
            vocabulary: [
                "Which method best demonstrates knowledge of vocabulary for " + topic + "?",
                "What should guide the choice of a word related to " + topic + "?",
                "Which activity best checks whether vocabulary for " + topic + " can be used?"
            ],
            reading: [
                "Which evidence best supports an interpretation of a text about " + topic + "?",
                "How should a reader distinguish a main idea from a detail about " + topic + "?",
                "What is the strongest way to confirm an interpretation of " + topic + "?"
            ],
            listening: [
                "Which strategy best demonstrates understanding of spoken material about " + topic + "?",
                "What should a listener use to interpret an unfamiliar expression about " + topic + "?",
                "How can a listener check understanding of a message about " + topic + "?",
            ],
            speaking: [
                "Which response best demonstrates preparation for speaking about " + topic + "?",
                "What makes a spoken explanation of " + topic + " effective?",
                "How should a speaker respond during a discussion of " + topic + "?"
            ]
        };

        const correct = {
            writing: [
                "Set a clear purpose, organize ideas, and support the main point",
                "Improve clarity, organization, and language accuracy",
                "Review purpose, paragraph flow, grammar, and punctuation"
            ],
            grammar: [
                "Explain its function and apply it in meaningful examples",
                "Check both the structure and the intended meaning",
                "Use the structure accurately in an appropriate context"
            ],
            vocabulary: [
                "Use the words accurately in meaningful context",
                "Meaning, context, and appropriateness for the situation",
                "Use the words in original sentences or realistic situations"
            ],
            reading: [
                "Relevant details or statements from the text",
                "Use the central message and supporting details together",
                "Check the interpretation against textual evidence"
            ],
            listening: [
                "Identify the main message and verify important details",
                "Use the situation and surrounding spoken message",
                "Compare the interpretation with the complete message"
            ],
            speaking: [
                "Plan a clear point and support it with relevant reasons",
                "Clear organization, suitable language, and understandable delivery",
                "Listen carefully and respond directly and respectfully"
            ]
        };

        const wrong = {
            writing: [
                "Include ideas without organizing them",
                "Change words without checking whether meaning is clear",
                "Submit immediately without reviewing the text"
            ],
            grammar: [
                "Identify a label but ignore meaning and use",
                "Repeat the structure without checking the context",
                "Avoid using the structure in complete sentences"
            ],
            vocabulary: [
                "Repeat a list without understanding the words",
                "Choose words without considering their meaning",
                "Avoid using new vocabulary in context"
            ],
            reading: [
                "Rely on personal opinion instead of the text",
                "Treat one minor detail as the whole message",
                "Accept an interpretation without checking the text"
            ],
            listening: [
                "Focus only on isolated words and ignore the message",
                "Guess without considering the situation",
                "Ignore details that could confirm or correct understanding"
            ],
            speaking: [
                "Repeat memorized phrases without addressing the topic",
                "Speak without organizing ideas or considering the audience",
                "Ignore other speakers and continue with an unrelated point"
            ]
        };

        const skillQuestions = questions[skill] || questions.vocabulary;
        const correctAnswers = correct[skill] || correct.vocabulary;
        const distractors = wrong[skill] || wrong.vocabulary;

        return skillQuestions.map(function (question, index) {
            return buildAssessmentQuestion(
                question,
                correctAnswers[index],
                distractors,
                "A strong answer applies " + skillName(skill).toLowerCase() +
                    " strategies to " + topic + " and demonstrates understanding, " +
                    "rather than relying on memorization alone.",
                assessmentSeed(topic, index, true)
            );
        });
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
