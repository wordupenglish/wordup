/*
=========================================================
 WORDUP V12 SESSION BUILDER
=========================================================
*/

function wordUpV12BuildAllSessions(){

    const output = {};

    for(
        const level of WORDUP_V12_LEVELS
    ){

        output[level] = {};

        const levelData =
            WORDUP_V12_CURRICULUM[level];

        if(!levelData){
            continue;
        }

        for(
            const skill of WORDUP_V12_SKILLS
        ){

            const topics =
                levelData[skill] || [];

            output[level][skill] =
                topics.map(
                    (topic,index)=>
                        wordUpV12BuildSession(
                            level,
                            skill,
                            topic,
                            index
                        )
                );

        }

    }

    return output;

}


const WORDUP_V12_SESSIONS =
    wordUpV12BuildAllSessions();

window.WORDUP_V12_SESSIONS =
    WORDUP_V12_SESSIONS;

console.log(
    "WordUp V12 sessions generated:",
    WORDUP_V12_SESSIONS
);
