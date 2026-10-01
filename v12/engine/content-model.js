/*
=========================================================
 WORDUP V12.1 CONTENT MODEL
=========================================================

Every real lesson contains:

- objective
- explanation
- rules
- examples
- mistakes
- practice
- test
- vocabulary
- review

=========================================================
*/

class WordUpLesson {

    constructor(data){

        this.id = data.id;
        this.level = data.level;
        this.skill = data.skill;
        this.topic = data.topic;

        this.objective =
            data.objective || "";

        this.explanation =
            data.explanation || "";

        this.rules =
            data.rules || [];

        this.examples =
            data.examples || [];

        this.mistakes =
            data.mistakes || [];

        this.vocabulary =
            data.vocabulary || [];

        this.practice =
            data.practice || [];

        this.test =
            data.test || [];

        this.review =
            data.review || [];

        this.duration =
            data.duration || 10;
    }

    isComplete(){

        return (
            this.objective &&
            this.explanation &&
            this.rules.length > 0 &&
            this.examples.length > 0 &&
            this.practice.length > 0 &&
            this.test.length > 0
        );

    }

}


function wordUpCreateLesson(data){

    return new WordUpLesson(data);

}


window.WordUpLesson =
    WordUpLesson;

window.wordUpCreateLesson =
    wordUpCreateLesson;


console.log(
    "WordUp V12.1 Content Model loaded."
);

