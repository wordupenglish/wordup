/*
=========================================================
 WORDUP V12.1 LOADER
=========================================================
*/

(function(){

    const scripts = [

        "v12/engine/content-model.js",

        "v12/engine/question-engine.js",

        "v12/content/levels/foundation.js",

        "v12/content/levels/a1.js",

        "v12/content/levels/a2.js",

        "v12/content/levels/b1.js",

        "v12/content/levels/b2.js",

        "v12/content/levels/c1.js",

        "v12/content/levels/c2.js",

        "v12/content/levels/academic.js",

        "v12/content/content-registry.js",

        "v12/engine/progress-engine.js",

        "v12/engine/content-validator.js"

    ];

    window.WORDUP_V12_LOAD_ORDER =
        scripts;

    console.log(
        "WordUp V12.1 loader configuration ready."
    );

})();

