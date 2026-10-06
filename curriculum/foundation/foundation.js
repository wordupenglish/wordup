/*
=========================================================
WORDUP V11 FOUNDATION
=========================================================

STARTING POINT:

Alphabet
↓
Letters
↓
Letter Names
↓
Uppercase / Lowercase
↓
Writing Letters
↓
Sounds
↓
Phonics
↓
Words
↓
Sentences
↓
Basic Grammar
↓
Basic Reading
↓
Basic Writing

=========================================================
*/

const WORDUP_V11_FOUNDATION = {

    level: "foundation",

    title: "English Foundation",

    description:
        "Build English from the very beginning.",

    sessions: [

        {

            id: "foundation-writing-01",

            skill: "writing",

            title:
                "Writing the English Alphabet",

            description:
                "Learn and practise the 26 letters of the English alphabet.",

            lessons: [

                {

                    id: "foundation-writing-01-01",

                    title:
                        "The English Alphabet",

                    explanation:
                        "English uses 26 letters. Each letter has an uppercase and lowercase form.",

                    rules: [

                        "The English alphabet contains 26 letters.",

                        "Letters can be written in uppercase or lowercase.",

                        "Uppercase letters are also called capital letters.",

                        "Lowercase letters are normally used inside words."
                    ],

                    examples: [

                        "A a",

                        "B b",

                        "C c",

                        "D d",

                        "E e",

                        "F f",

                        "G g",

                        "H h",

                        "I i",

                        "J j",

                        "K k",

                        "L l",

                        "M m",

                        "N n",

                        "O o",

                        "P p",

                        "Q q",

                        "R r",

                        "S s",

                        "T t",

                        "U u",

                        "V v",

                        "W w",

                        "X x",

                        "Y y",

                        "Z z"
                    ]

                },

                {

                    id:
                        "foundation-writing-01-02",

                    title:
                        "Uppercase and Lowercase Letters",

                    explanation:
                        "Learn when and how uppercase and lowercase letters are used.",

                    rules: [

                        "Use an uppercase letter at the beginning of a sentence.",

                        "Use uppercase letters for names of people and places.",

                        "Most ordinary words use lowercase letters."
                    ],

                    examples: [

                        "My name is Ali.",

                        "Kabul is the capital of Afghanistan.",

                        "English is an international language."
                    ]

                },

                {

                    id:
                        "foundation-writing-01-03",

                    title:
                        "Writing Letters Correctly",

                    explanation:
                        "Practise forming letters clearly and consistently.",

                    rules: [

                        "Letters should be recognizable.",

                        "Keep letter size reasonably consistent.",

                        "Leave appropriate spaces between words.",

                        "Write from left to right in English."
                    ],

                    examples: [

                        "I am a student.",

                        "This is my book.",

                        "I learn English."
                    ]

                }

            ],

            practice: [

                {
                    question:
                        "How many letters are in the English alphabet?",

                    options: [
                        "24",
                        "25",
                        "26",
                        "28"
                    ],

                    answer: 2
                },

                {
                    question:
                        "Which is the lowercase form of A?",

                    options: [
                        "A",
                        "a",
                        "α",
                        "4"
                    ],

                    answer: 1
                },

                {
                    question:
                        "Which sentence begins correctly?",

                    options: [
                        "my name is Ali.",
                        "My name is Ali.",
                        "my Name is Ali.",
                        "MY name is Ali."
                    ],

                    answer: 1
                }

            ],

            test: [

                {
                    question:
                        "Which statement about English letters is correct?",

                    options: [

                        "English has 20 letters.",

                        "English has 24 letters.",

                        "English has 26 letters.",

                        "English has 30 letters."

                    ],

                    answer: 2
                },

                {
                    question:
                        "Which sentence uses capitalization correctly?",

                    options: [

                        "kabul is a city.",

                        "Kabul is a city.",

                        "kabul Is a city.",

                        "KABUL is A city."

                    ],

                    answer: 1
                },

                {
                    question:
                        "Which form is lowercase?",

                    options: [
                        "M",
                        "N",
                        "P",
                        "m"
                    ],

                    answer: 3
                }

            ]

        }

    ]

};


window.WORDUP_V11_FOUNDATION =
    WORDUP_V11_FOUNDATION;


console.log(
    "WordUp V11 Foundation curriculum loaded."
);
