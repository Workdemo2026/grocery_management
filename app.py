from flask import Flask, render_template, request, jsonify
from utils.database import get_connection, initialize_database

app = Flask(__name__)

initialize_database()


# ===========================
# PAGES
# ===========================

@app.route("/")
def user_home():
    return render_template("user.html")


@app.route("/admin")
def admin_home():
    return render_template("admin.html")


# ===========================
# GET ALL PRODUCTS
# ===========================

@app.route("/api/products", methods=["GET"])
def get_products():

    conn = get_connection()

    rows = conn.execute(
        "SELECT * FROM products ORDER BY id DESC"
    ).fetchall()

    conn.close()

    products = [dict(row) for row in rows]

    return jsonify(products)


# ===========================
# GET SINGLE PRODUCT
# ===========================

@app.route("/api/products/<int:id>", methods=["GET"])
def get_product(id):

    conn = get_connection()

    product = conn.execute(
        "SELECT * FROM products WHERE id=?",
        (id,)
    ).fetchone()

    conn.close()

    if product is None:
        return jsonify({"error": "Product not found"}), 404

    return jsonify(dict(product))


# ===========================
# ADD PRODUCT
# ===========================

@app.route("/api/products", methods=["POST"])
def add_product():

    data = request.get_json()

    name = data.get("name", "").strip()
    category = data.get("category", "").strip()
    price = data.get("price")
    quantity = data.get("quantity")

    if not name or not category:
        return jsonify({
            "error": "Name and Category are required"
        }), 400

    try:
        price = float(price)
        quantity = int(quantity)
    except ValueError:
        return jsonify({
            "error": "Invalid price or quantity"
        }), 400

    conn = get_connection()

    conn.execute(
        """
        INSERT INTO products
        (name,category,price,quantity)

        VALUES(?,?,?,?,?)
        """,
        (name, category, price, quantity)
    )

    conn.commit()

    conn.close()

    return jsonify({
        "message": "Product added successfully"
    }), 201


# ===========================
# UPDATE PRODUCT
# ===========================

@app.route("/api/products/<int:id>", methods=["PUT"])
def update_product(id):

    data = request.get_json()

    conn = get_connection()

    product = conn.execute(
        "SELECT * FROM products WHERE id=?",
        (id,)
    ).fetchone()

    if product is None:

        conn.close()

        return jsonify({
            "error": "Product not found"
        }), 404

    conn.execute(
        """
        UPDATE products

        SET

        name=?,

        category=?,

        price=?,

        quantity=?,

        WHERE id=?
        """,

        (

            data["name"],

            data["category"],

            data["price"],

            data["quantity"],

            id

        )

    )

    conn.commit()

    conn.close()

    return jsonify({
        "message": "Product updated successfully"
    })


# ===========================
# DELETE PRODUCT
# ===========================

@app.route("/api/products/<int:id>", methods=["DELETE"])
def delete_product(id):

    conn = get_connection()

    product = conn.execute(
        "SELECT * FROM products WHERE id=?",
        (id,)
    ).fetchone()

    if product is None:

        conn.close()

        return jsonify({
            "error": "Product not found"
        }), 404

    conn.execute(

        "DELETE FROM products WHERE id=?",

        (id,)

    )

    conn.commit()

    conn.close()

    return jsonify({
        "message": "Product deleted successfully"
    })


# ===========================
# SEARCH
# ===========================

@app.route("/api/search")
def search_product():

    keyword = request.args.get("q", "")

    conn = get_connection()

    rows = conn.execute(

        """
        SELECT *

        FROM products

        WHERE

        name LIKE ?

        OR

        category LIKE ?

        ORDER BY id DESC
        """,

        (

            f"%{keyword}%",

            f"%{keyword}%"

        )

    ).fetchall()

    conn.close()

    return jsonify([dict(row) for row in rows])


# ===========================
# DASHBOARD SUMMARY
# ===========================

@app.route("/api/dashboard")
def dashboard():

    conn = get_connection()

    total_products = conn.execute(

        "SELECT COUNT(*) FROM products"

    ).fetchone()[0]

    inventory_value = conn.execute(

        """
        SELECT
        IFNULL(SUM(price*quantity),0)

        FROM products
        """

    ).fetchone()[0]

    low_stock = conn.execute(

        """
        SELECT COUNT(*)

        FROM products

        WHERE quantity<5
        """

    ).fetchone()[0]

    conn.close()

    return jsonify({

        "total_products": total_products,

        "inventory_value": inventory_value,

        "low_stock": low_stock

    })


if __name__ == "__main__":

    app.run(debug=True)