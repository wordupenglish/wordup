/*
=========================================================
WORDUP V11 SESSION ENGINE
=========================================================

Every session follows:

LESSONS
   ↓
PRACTICE
   ↓
TEST
   ↓
RESULT
   ↓
UNLOCK NEXT SESSION
=========================================================
*/

class WordUpV11Session {

    constructor(data) {

        this.id = data.id;

        this.level = data.level;

        this.skill = data.skill;

        this.title = data.title;

        this.description =
            data.description || "";

        this.lessons =
            data.lessons || [];

        this.practice =
            data.practice || [];

        this.test =
            data.test || [];

    }


    get lessonCount() {

        return this.lessons.length;

    }


    get practiceCount() {

        return this.practice.length;

    }


    get testCount() {

        return this.test.length;

    }


    isValid() {

        return (
            this.lessons.length > 0 &&
            this.practice.length > 0 &&
            this.test.length > 0
        );

    }

}


function wordUpV11CreateSession(data) {

    const session =
        new WordUpV11Session(data);

    if (!session.isValid()) {

        console.warn(
            "Invalid V11 session:",
            session.id
        );

    }

    return session;

}


window.wordUpV11CreateSession =
    wordUpV11CreateSession;


console.log(
    "WordUp V11 Session Engine loaded."
);
