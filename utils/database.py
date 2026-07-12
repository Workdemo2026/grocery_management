import sqlite3

DATABASE = "database.db"


def get_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


def initialize_database():

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute("""

    CREATE TABLE IF NOT EXISTS products(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT NOT NULL,

        category TEXT NOT NULL,

        price REAL NOT NULL CHECK(price>=0),

        quantity INTEGER NOT NULL CHECK(quantity>=0)
    )

    """)

    conn.commit()

    conn.close()


def row_to_dict(row):

    return {

        "id": row["id"],
        "name": row["name"],
        "category": row["category"],
        "price": row["price"],
        "quantity": row["quantity"],

    }