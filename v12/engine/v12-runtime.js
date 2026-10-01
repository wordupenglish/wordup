/*
============================================================
WORDUP V12.2 RUNTIME
Real V12.1 content integration layer
============================================================
*/

(function () {
    "use strict";

    const VERSION = "12.2.0";

    function ready(fn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn);
        } else {
            fn();
        }
    }

    function getContent() {
        if (typeof window.wordUpGetAllContent === "function") {
            return window.wordUpGetAllContent();
        }

        return [];
    }

    function getProgress() {
        if (typeof window.wordUpGetProgress === "function") {
            return window.wordUpGetProgress();
        }

        return {
            xp: 0,
            streak: 0,
            lessons: {},
            mistakes: []
        };
    }

    function escapeHtml(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function createStyles() {
        if (document.getElementById("wordup-v12-styles")) return;

        const style = document.createElement("style");
        style.id = "wordup-v12-styles";

        style.textContent = `
            #wordup-v12-launcher {
                position: fixed;
                right: 20px;
                bottom: 20px;
                z-index: 99990;
                border: 0;
                border-radius: 999px;
                padding: 13px 18px;
                cursor: pointer;
                font-weight: 700;
                font-size: 14px;
                box-shadow: 0 8px 30px rgba(0,0,0,.28);
            }

            #wordup-v12-overlay {
                position: fixed;
                inset: 0;
                z-index: 99999;
                background: rgba(0,0,0,.68);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                box-sizing: border-box;
            }

            #wordup-v12-modal {
                width: min(1100px, 100%);
                max-height: 90vh;
                overflow: auto;
                border-radius: 22px;
                padding: 24px;
                box-sizing: border-box;
                background: #10131a;
                color: #fff;
                box-shadow: 0 20px 70px rgba(0,0,0,.45);
                font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            }

            #wordup-v12-modal * {
                box-sizing: border-box;
            }

            .wu12-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 20px;
                margin-bottom: 20px;
            }

            .wu12-header h2 {
                margin: 0;
                font-size: 26px;
            }

            .wu12-close {
                border: 0;
                background: rgba(255,255,255,.1);
                color: #fff;
                border-radius: 10px;
                padding: 8px 12px;
                cursor: pointer;
                font-size: 18px;
            }

            .wu12-stats {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 12px;
                margin-bottom: 20px;
            }

            .wu12-stat {
                padding: 15px;
                border-radius: 15px;
                background: rgba(255,255,255,.07);
            }

            .wu12-stat strong {
                display: block;
                font-size: 22px;
                margin-top: 4px;
            }

            .wu12-levels {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                gap: 10px;
                margin-bottom: 22px;
            }

            .wu12-level {
                border: 1px solid rgba(255,255,255,.1);
                background: rgba(255,255,255,.06);
                color: #fff;
                padding: 14px;
                border-radius: 14px;
                cursor: pointer;
                text-align: left;
            }

            .wu12-level:hover {
                background: rgba(255,255,255,.12);
            }

            .wu12-lessons {
                display: grid;
                gap: 10px;
            }

            .wu12-lesson {
                padding: 16px;
                border-radius: 15px;
                background: rgba(255,255,255,.06);
                border: 1px solid rgba(255,255,255,.08);
                cursor: pointer;
            }

            .wu12-lesson:hover {
                background: rgba(255,255,255,.1);
            }

            .wu12-lesson-title {
                font-weight: 750;
                font-size: 17px;
            }

            .wu12-meta {
                opacity: .7;
                font-size: 13px;
                margin-top: 5px;
            }

            .wu12-card {
                padding: 20px;
                border-radius: 17px;
                background: rgba(255,255,255,.06);
                margin-top: 15px;
            }

            .wu12-option {
                width: 100%;
                text-align: left;
                margin-top: 9px;
                padding: 13px;
                border-radius: 12px;
                border: 1px solid rgba(255,255,255,.12);
                background: rgba(255,255,255,.06);
                color: #fff;
                cursor: pointer;
            }

            .wu12-option:hover {
                background: rgba(255,255,255,.13);
            }

            .wu12-success {
                padding: 15px;
                border-radius: 14px;
                background: rgba(70, 200, 120, .16);
                margin-top: 14px;
            }

            @media (max-width: 650px) {
                #wordup-v12-modal {
                    padding: 17px;
                    max-height: 94vh;
                }

                .wu12-stats {
                    grid-template-columns: 1fr;
                }

                #wordup-v12-launcher {
                    right: 12px;
                    bottom: 12px;
                }
            }
        `;

        document.head.appendChild(style);
    }

    function openHub() {
        const existing = document.getElementById("wordup-v12-overlay");
        if (existing) existing.remove();

        const content = getContent();
        const progress = getProgress();

        const levels = [...new Set(content.map(x => x.level).filter(Boolean))];

        const overlay = document.createElement("div");
        overlay.id = "wordup-v12-overlay";

        overlay.innerHTML = `
            <div id="wordup-v12-modal">
                <div class="wu12-header">
                    <div>
                        <h2>📚 WordUp V12 Learning</h2>
                        <div class="wu12-meta">Real V12.1 curriculum and practice engine</div>
                    </div>
                    <button class="wu12-close" id="wu12-close">✕</button>
                </div>

                <div class="wu12-stats">
                    <div class="wu12-stat">
                        XP
                        <strong>${escapeHtml(progress.xp || 0)}</strong>
                    </div>
                    <div class="wu12-stat">
                        Streak
                        <strong>${escapeHtml(progress.streak || 0)} 🔥</strong>
                    </div>
                    <div class="wu12-stat">
                        Lessons
                        <strong>${content.length}</strong>
                    </div>
                </div>

                <div class="wu12-levels">
                    ${levels.map(level => `
                        <button class="wu12-level" data-level="${escapeHtml(level)}">
                            <strong>${escapeHtml(level.toUpperCase())}</strong>
                            <div class="wu12-meta">
                                ${content.filter(x => x.level === level).length} lesson(s)
                            </div>
                        </button>
                    `).join("")}
                </div>

                <div id="wu12-main">
                    <div class="wu12-card">
                        <strong>Select a level above</strong>
                        <div class="wu12-meta">
                            Choose a CEFR level to see its available lessons.
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        document.getElementById("wu12-close").onclick = () => overlay.remove();

        overlay.addEventListener("click", e => {
            if (e.target === overlay) overlay.remove();
        });

        overlay.querySelectorAll("[data-level]").forEach(button => {
            button.onclick = () => showLessons(button.dataset.level, content);
        });
    }

    function showLessons(level, content) {
        const main = document.getElementById("wu12-main");

        const lessons = content.filter(x => x.level === level);

        main.innerHTML = `
            <div class="wu12-card">
                <h3>${escapeHtml(level.toUpperCase())} Lessons</h3>
                <div class="wu12-meta">
                    ${lessons.length} real lesson(s) currently loaded.
                </div>
            </div>

            <div class="wu12-lessons">
                ${lessons.map(lesson => `
                    <div class="wu12-lesson" data-lesson="${escapeHtml(lesson.id)}">
                        <div class="wu12-lesson-title">
                            ${escapeHtml(lesson.title || lesson.topic)}
                        </div>
                        <div class="wu12-meta">
                            ${escapeHtml(lesson.skill || "")} · ${escapeHtml(lesson.topic || "")}
                        </div>
                    </div>
                `).join("")}
            </div>
        `;

        main.querySelectorAll("[data-lesson]").forEach(item => {
            item.onclick = () => showLesson(item.dataset.lesson, content);
        });
    }

    function showLesson(id, content) {
        const lesson = content.find(x => x.id === id);
        if (!lesson) return;

        const main = document.getElementById("wu12-main");

        const practice = Array.isArray(lesson.practice) ? lesson.practice : [];
        const test = Array.isArray(lesson.test) ? lesson.test : [];

        let html = `
            <div class="wu12-card">
                <button class="wu12-close" id="wu12-back">←</button>
                <h2>${escapeHtml(lesson.title || lesson.topic)}</h2>

                <div class="wu12-meta">
                    ${escapeHtml(lesson.level)} · ${escapeHtml(lesson.skill)}
                </div>

                <p><strong>Objective:</strong><br>
                    ${escapeHtml(lesson.objective || "")}
                </p>

                <p><strong>Explanation:</strong><br>
                    ${escapeHtml(lesson.explanation || "")}
                </p>
        `;

        if (Array.isArray(lesson.rules) && lesson.rules.length) {
            html += `
                <h3>Rules</h3>
                <ul>
                    ${lesson.rules.map(x => `<li>${escapeHtml(x)}</li>`).join("")}
                </ul>
            `;
        }

        if (Array.isArray(lesson.examples) && lesson.examples.length) {
            html += `
                <h3>Examples</h3>
                <ul>
                    ${lesson.examples.map(x => `<li>${escapeHtml(x)}</li>`).join("")}
                </ul>
            `;
        }

        html += `</div>`;

        if (practice.length) {
            html += `
                <div class="wu12-card">
                    <h3>Practice</h3>
                    ${practice.map((q, i) => renderQuestion(q, "practice", i)).join("")}
                </div>
            `;
        }

        if (test.length) {
            html += `
                <div class="wu12-card">
                    <h3>Test</h3>
                    ${test.map((q, i) => renderQuestion(q, "test", i)).join("")}
                </div>
            `;
        }

        html += `
            <div class="wu12-card">
                <button id="wu12-complete" class="wu12-option">
                    ✅ Complete Lesson
                </button>
            </div>
        `;

        main.innerHTML = html;

        document.getElementById("wu12-back").onclick = () => {
            showLessons(lesson.level, content);
        };

        document.getElementById("wu12-complete").onclick = () => {
            if (typeof window.wordUpCompleteLesson === "function") {
                window.wordUpCompleteLesson(lesson.id);
            }

            document.getElementById("wu12-complete").outerHTML =
                `<div class="wu12-success">🎉 Excellent! Lesson completed. XP added.</div>`;
        };

        main.querySelectorAll(".wu12-option[data-answer]").forEach(button => {
            button.onclick = () => {
                const correct = button.dataset.answer === "true";

                const parent = button.parentElement;
                parent.querySelectorAll("button").forEach(b => {
                    b.disabled = true;
                });

                const result = document.createElement("div");
                result.className = correct ? "wu12-success" : "wu12-card";
                result.textContent = correct
                    ? "✅ Correct! Excellent."
                    : "❌ Not quite. Review the explanation and try again.";

                parent.appendChild(result);
            };
        });
    }

    function renderQuestion(q, type, index) {
        const prompt = q.question || q.prompt || q.text || "Question";

        let options = Array.isArray(q.options)
            ? q.options
            : [];

        const answer = q.answer ?? q.correctAnswer ?? q.correct;

        if (!options.length && answer !== undefined) {
            options = [answer];
        }

        return `
            <div class="wu12-card">
                <strong>${index + 1}. ${escapeHtml(prompt)}</strong>

                ${options.map(option => {
                    const correct = String(option) === String(answer);

                    return `
                        <button
                            class="wu12-option"
                            data-answer="${correct}">
                            ${escapeHtml(option)}
                        </button>
                    `;
                }).join("")}
            </div>
        `;
    }

    function installLauncher() {
        if (document.getElementById("wordup-v12-launcher")) return;

        const button = document.createElement("button");
        button.id = "wordup-v12-launcher";
        button.textContent = "📚 V12 Learning";
        button.title = "Open WordUp V12 curriculum";

        button.onclick = openHub;

        document.body.appendChild(button);
    }

    ready(function () {
        createStyles();
        installLauncher();

        console.log(
            "%cWordUp V12.2 Runtime Loaded",
            "font-weight:bold;font-size:16px"
        );

        console.log("WordUp V12 content:", getContent().length);
        console.log("WordUp V12 version:", VERSION);
    });

})();
