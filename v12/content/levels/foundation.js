/*
=========================================================
 WORDUP V12.1 FOUNDATION CONTENT
=========================================================
*/

const WORDUP_FOUNDATION_CONTENT = [

{
    id: "foundation-grammar-sentence-1",

    level: "foundation",

    skill: "grammar",

    topic: "What Is a Sentence?",

    objective:
        "Understand how words are organized to make a complete English sentence.",

    explanation:
        "A sentence is a group of words that expresses a complete idea. Most simple English sentences contain a subject and a verb. The subject tells us who or what the sentence is about, while the verb tells us what the subject does or what the subject is.",

    rules: [

        "A sentence begins with a capital letter.",

        "A complete sentence normally contains a subject and a verb.",

        "A sentence ends with appropriate punctuation.",

        "English sentences usually follow a clear word order."

    ],

    examples: [

        "I study English.",

        "She works at a school.",

        "The students are ready."

    ],

    mistakes: [

        "Using a group of words without a complete idea.",

        "Forgetting the subject.",

        "Forgetting the verb.",

        "Forgetting final punctuation."

    ],

    vocabulary: [

        {
            word: "sentence",
            meaning: "a group of words expressing a complete idea"
        },

        {
            word: "subject",
            meaning: "the person, animal, place, or thing the sentence is about"
        },

        {
            word: "verb",
            meaning: "a word that shows an action or state"
        }

    ],

    practice: [

        {
            type: "multiple-choice",

            question:
                "Which is a complete sentence?",

            options: [

                "She happy.",

                "She is happy.",

                "Happy she.",

                "Is happy."

            ],

            answer: 1,

            explanation:
                "She is happy contains a subject, verb, and complete idea."
        },

        {
            type: "multiple-choice",

            question:
                "Which word is the subject in 'Ali studies English'?",

            options: [

                "Ali",

                "studies",

                "English",

                "studies English"

            ],

            answer: 0,

            explanation:
                "Ali is the person the sentence is about."
        },

        {
            type: "multiple-choice",

            question:
                "Which sentence uses correct punctuation?",

            options: [

                "I am a student",

                "I am a student.",

                "I am a student,",

                "I am a student?"

            ],

            answer: 1,

            explanation:
                "A normal statement ends with a period."
        }

    ],

    test: [

        {
            type: "multiple-choice",

            question:
                "Choose the complete sentence.",

            options: [

                "The teacher in the classroom.",

                "The teacher teaches English.",

                "Teaching English teacher.",

                "In the classroom teacher."

            ],

            answer: 1,

            explanation:
                "The teacher teaches English contains a subject, verb, and complete idea."
        },

        {
            type: "multiple-choice",

            question:
                "What does the verb usually tell us?",

            options: [

                "Who the sentence is about",

                "What the subject does or is",

                "Where every sentence happens",

                "Only the punctuation"

            ],

            answer: 1,

            explanation:
                "A verb can express an action or state."
        }

    ],

    review: [

        "A complete sentence expresses a complete idea.",

        "Look for the subject and verb.",

        "Check capitalization and punctuation."

    ],

    duration: 12
},


{
    id: "foundation-vocabulary-family-1",

    level: "foundation",

    skill: "vocabulary",

    topic: "Family",

    objective:
        "Learn common English words used to talk about family members.",

    explanation:
        "Family vocabulary is useful for introducing people and describing relationships. Common words include mother, father, brother, sister, son, daughter, husband, wife, and parents.",

    rules: [

        "Use 'my' to talk about something connected to you.",

        "Use singular family words for one person.",

        "Use plural forms when talking about more than one person.",

        "Pay attention to the difference between male and female family terms."

    ],

    examples: [

        "My mother is a teacher.",

        "I have two brothers.",

        "Her sister lives in Kabul."

    ],

    mistakes: [

        "Confusing brother and sister.",

        "Forgetting plural -s.",

        "Using 'parents' for only one parent."

    ],

    vocabulary: [

        {
            word: "mother",
            meaning: "a female parent"
        },

        {
            word: "father",
            meaning: "a male parent"
        },

        {
            word: "brother",
            meaning: "a male sibling"
        },

        {
            word: "sister",
            meaning: "a female sibling"
        },

        {
            word: "parents",
            meaning: "a person's mother and father"
        }

    ],

    practice: [

        {
            type: "meaning",

            question:
                "Which word means a female sibling?",

            options: [

                "brother",

                "father",

                "sister",

                "son"

            ],

            answer: 2,

            explanation:
                "A sister is a female sibling."
        },

        {
            type: "context",

            question:
                "My father and mother are my ____.",

            options: [

                "children",

                "parents",

                "brothers",

                "friends"

            ],

            answer: 1,

            explanation:
                "Parents means mother and father."
        }

    ],

    test: [

        {
            type: "context",

            question:
                "Ahmad has one male sibling. He has one ____.",

            options: [

                "sister",

                "brother",

                "daughter",

                "mother"

            ],

            answer: 1,

            explanation:
                "A male sibling is a brother."
        },

        {
            type: "meaning",

            question:
                "Which word refers to a person's mother and father?",

            options: [

                "parents",

                "children",

                "siblings",

                "cousins"

            ],

            answer: 0,

            explanation:
                "Parents refers to a person's mother and father."
        }

    ],

    review: [

        "mother = female parent",

        "father = male parent",

        "brother = male sibling",

        "sister = female sibling",

        "parents = mother and father"

    ],

    duration: 10
}

];


window.WORDUP_FOUNDATION_CONTENT =
    WORDUP_FOUNDATION_CONTENT;


console.log(
    "Foundation content loaded:",
    WORDUP_FOUNDATION_CONTENT.length
);

