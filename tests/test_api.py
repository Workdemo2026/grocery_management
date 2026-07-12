import unittest
import json

from app import app


class GroceryAPITest(unittest.TestCase):

    def setUp(self):

        self.client = app.test_client()

        self.client.testing = True


    # --------------------------
    # Test Home Page
    # --------------------------

    def test_home_page(self):

        response = self.client.get("/")

        self.assertEqual(response.status_code, 200)


    # --------------------------
    # Test Admin Page
    # --------------------------

    def test_admin_page(self):

        response = self.client.get("/admin")

        self.assertEqual(response.status_code, 200)


    # --------------------------
    # Test Add Product
    # --------------------------

    def test_add_product(self):

        response = self.client.post(

            "/api/products",

            data=json.dumps({

                "name": "Milk",

                "category": "Dairy",

                "price": 60,

                "quantity": 20

            }),

            content_type="application/json"

        )

        self.assertEqual(response.status_code, 201)


    # --------------------------
    # Test Get Products
    # --------------------------

    def test_get_products(self):

        response = self.client.get(

            "/api/products"

        )

        self.assertEqual(response.status_code, 200)


    # --------------------------
    # Test Search Product
    # --------------------------

    def test_search_product(self):

        response = self.client.get(

            "/api/search?q=Milk"

        )

        self.assertEqual(response.status_code, 200)


    # --------------------------
    # Test Dashboard API
    # --------------------------

    def test_dashboard(self):

        response = self.client.get(

            "/api/dashboard"

        )

        self.assertEqual(response.status_code, 200)


if __name__ == "__main__":

    unittest.main()