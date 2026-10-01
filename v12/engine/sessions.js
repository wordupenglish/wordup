/*
=========================================================
 WORDUP V12 SESSION ENGINE
=========================================================
*/

class WordUpV12Session {

    constructor(data){

        this.id = data.id;
        this.level = data.level;
        this.skill = data.skill;

        this.title =
            data.title || "";

        this.description =
            data.description || "";

        this.lessons =
            data.lessons || [];

        this.practice =
            data.practice || [];

        this.test =
            data.test || [];

        this.passingScore =
            data.passingScore || 70;
    }


    isValid(){

        return (
            this.lessons.length > 0 &&
            this.practice.length > 0 &&
            this.test.length > 0
        );

    }


    get lessonCount(){

        return this.lessons.length;

    }


    get practiceCount(){

        return this.practice.length;

    }


    get testCount(){

        return this.test.length;

    }

}


function wordUpV12CreateSession(data){

    const session =
        new WordUpV12Session(data);

    if(!session.isValid()){

        console.warn(
            "Invalid WordUp V12 session:",
            session.id
        );

    }

    return session;

}


window.WordUpV12Session =
    WordUpV12Session;

window.wordUpV12CreateSession =
    wordUpV12CreateSession;

console.log(
    "WordUp V12 Session Engine loaded."
);
