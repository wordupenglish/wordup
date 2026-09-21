from flask import Flask, jsonify, request, send_from_directory
import sqlite3
import json
import os
from datetime import date, timedelta

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_FILE = os.path.join(BASE_DIR, "wordup.db")
DATA_FILE = os.path.join(BASE_DIR, "vocabulary.json")

app = Flask(__name__, static_folder=BASE_DIR)


def get_db():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db()

    conn.execute("""
        CREATE TABLE IF NOT EXISTS profile (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            whatsapp TEXT NOT NULL,
            xp INTEGER DEFAULT 0,
            streak INTEGER DEFAULT 0,
            last_active TEXT,
            level INTEGER DEFAULT 1
        )
    """)

    conn.execute("""
        CREATE TABLE IF NOT EXISTS activity (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT NOT NULL,
            score INTEGER NOT NULL,
            total INTEGER NOT NULL,
            xp INTEGER NOT NULL,
            completed_at TEXT NOT NULL
        )
    """)

    existing = conn.execute(
        "SELECT id FROM profile WHERE id = 1"
    ).fetchone()

    if not existing:
        conn.execute("""
            INSERT INTO profile
            (id, name, email, whatsapp, xp, streak, last_active, level)
            VALUES (1, ?, ?, ?, 0, 0, NULL, 1)
        """, (
            "Mr. Suliman",
            "Sulimansurkhrody@yahoo.com",
            "+93785054012"
        ))

    conn.commit()
    conn.close()


def load_data():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def calculate_level(xp):
    return max(1, (xp // 100) + 1)


def update_streak(conn):
    profile = conn.execute(
        "SELECT * FROM profile WHERE id = 1"
    ).fetchone()

    today = date.today()
    last_active = profile["last_active"]

    if not last_active:
        streak = 1

    else:
        last = date.fromisoformat(last_active)

        if last == today:
            streak = profile["streak"]

        elif last == today - timedelta(days=1):
            streak = profile["streak"] + 1

        else:
            streak = 1

    conn.execute("""
        UPDATE profile
        SET streak = ?, last_active = ?
        WHERE id = 1
    """, (streak, today.isoformat()))

    return streak


@app.route("/")
def home():
    return send_from_directory(BASE_DIR, "index.html")


@app.route("/<path:path>")
def files(path):
    return send_from_directory(BASE_DIR, path)


@app.route("/api/profile")
def profile():
    conn = get_db()

    update_streak(conn)

    row = conn.execute(
        "SELECT * FROM profile WHERE id = 1"
    ).fetchone()

    conn.commit()
    conn.close()

    return jsonify(dict(row))


@app.route("/api/dashboard")
def dashboard():

    conn = get_db()

    update_streak(conn)

    profile = conn.execute(
        "SELECT * FROM profile WHERE id = 1"
    ).fetchone()

    activities = conn.execute("""
        SELECT category,
               COUNT(*) AS attempts,
               MAX(score) AS best,
               SUM(xp) AS xp
        FROM activity
        GROUP BY category
    """).fetchall()

    total_quizzes = conn.execute(
        "SELECT COUNT(*) FROM activity"
    ).fetchone()[0]

    total_questions = conn.execute(
        "SELECT COALESCE(SUM(total), 0) FROM activity"
    ).fetchone()[0]

    correct_answers = conn.execute(
        "SELECT COALESCE(SUM(score), 0) FROM activity"
    ).fetchone()[0]

    conn.commit()
    conn.close()

    category_stats = {}

    for item in activities:
        category_stats[item["category"]] = dict(item)

    return jsonify({
        "profile": dict(profile),
        "categories": category_stats,
        "total_quizzes": total_quizzes,
        "total_questions": total_questions,
        "correct_answers": correct_answers
    })


@app.route("/api/complete", methods=["POST"])
def complete():

    data = request.get_json()

    category = data.get("category", "Vocabulary")
    score = int(data.get("score", 0))
    total = int(data.get("total", 10))

    percentage = score / total if total else 0

    # XP rewards
    xp = (score * 10) + 20

    conn = get_db()

    streak = update_streak(conn)

    profile = conn.execute(
        "SELECT xp FROM profile WHERE id = 1"
    ).fetchone()

    new_xp = profile["xp"] + xp
    new_level = calculate_level(new_xp)

    conn.execute("""
        UPDATE profile
        SET xp = ?, level = ?
        WHERE id = 1
    """, (new_xp, new_level))

    conn.execute("""
        INSERT INTO activity
        (category, score, total, xp, completed_at)
        VALUES (?, ?, ?, ?, ?)
    """, (
        category,
        score,
        total,
        xp,
        date.today().isoformat()
    ))

    conn.commit()
    conn.close()

    return jsonify({
        "success": True,
        "xp_earned": xp,
        "total_xp": new_xp,
        "level": new_level,
        "streak": streak,
        "percentage": round(percentage * 100)
    })


@app.route("/api/reset", methods=["POST"])
def reset():

    conn = get_db()

    conn.execute("DELETE FROM activity")

    conn.execute("""
        UPDATE profile
        SET xp = 0,
            streak = 0,
            last_active = NULL,
            level = 1
        WHERE id = 1
    """)

    conn.commit()
    conn.close()

    return jsonify({"success": True})


@app.route("/api/lessons")
def lessons():

    data = load_data()

    lessons = {
        "Vocabulary": [
            {
                "title": "Building Your Vocabulary",
                "description": "Learn useful English words and understand their meanings in Dari.",
                "tips": [
                    "Learn words in context.",
                    "Review new words regularly.",
                    "Use new vocabulary in your own sentences.",
                    "Do not memorize without understanding."
                ]
            },
            {
                "title": "Vocabulary in Daily Life",
                "description": "Connect English vocabulary with situations you experience every day.",
                "tips": [
                    "Look for English words around you.",
                    "Keep a personal vocabulary list.",
                    "Practice pronunciation.",
                    "Use each new word at least once."
                ]
            }
        ],

        "Grammar": [
            {
                "title": "Present Simple",
                "description": "Use the present simple for habits, routines and general facts.",
                "tips": [
                    "I work every day.",
                    "She works every day.",
                    "Use do/does for many questions.",
                    "Use don't/doesn't for negatives."
                ]
            },
            {
                "title": "Past Simple",
                "description": "Use the past simple for completed actions in the past.",
                "tips": [
                    "I visited Kabul yesterday.",
                    "She studied last night.",
                    "Regular verbs often use -ed.",
                    "Some verbs have irregular forms."
                ]
            }
        ],

        "Writing": [
            {
                "title": "Clear Academic Writing",
                "description": "Strong writing communicates ideas clearly and logically.",
                "tips": [
                    "Start with a clear topic.",
                    "Support your ideas with details.",
                    "Use appropriate connectors.",
                    "Check grammar and punctuation."
                ]
            },
            {
                "title": "Professional Writing",
                "description": "Professional English should be clear, respectful and appropriately formal.",
                "tips": [
                    "Avoid unnecessary informal language.",
                    "Use precise vocabulary.",
                    "Organize information logically.",
                    "End professional messages politely."
                ]
            }
        ],

        "Reading": [
            {
                "title": "Reading for Main Ideas",
                "description": "Learn to identify the central idea of an English passage.",
                "tips": [
                    "Read the whole passage first.",
                    "Look for repeated ideas.",
                    "Separate the main idea from details.",
                    "Use context to understand unfamiliar words."
                ]
            },
            {
                "title": "Reading for Details",
                "description": "Practice finding specific information in a text.",
                "tips": [
                    "Read the question carefully.",
                    "Look for keywords.",
                    "Return to the passage when necessary.",
                    "Do not rely only on memory."
                ]
            }
        ]
    }

    return jsonify(lessons)


@app.route("/api/questions/<category>")
def questions(category):

    data = load_data()

    if category not in data:
        return jsonify([])

    return jsonify(data[category])


if __name__ == "__main__":
    init_db()

    print("")
    print("==========================================")
    print("        WORDUP 4.0 STARTED")
    print("==========================================")
    print("")
    print("Built by Mr. Suliman")
    print("Email: Sulimansurkhrody@yahoo.com")
    print("WhatsApp: +93785054012")
    print("")
    print("Open: http://localhost:5000")
    print("")

    app.run(host="127.0.0.1", port=5000, debug=False)
