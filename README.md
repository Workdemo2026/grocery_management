# FreshMart Grocery Management System

FreshMart Grocery Management System is a web-based application developed to simplify grocery inventory management and provide a basic online shopping experience. The application follows a client-server architecture using Python Flask as the backend framework and SQLite as the database.

---

# Architecture

As required by the assignment, the application is divided into separate frontend and backend components.

**Backend (Flask Server)**

- Python Flask
- SQLite Database
- REST API
- JSON Responses

**Frontend**

- HTML5
- CSS3
- JavaScript (Vanilla)
- Fetch API

---

# Project Structure

```
grocery-management/
│
├── static/
│   ├── style.css
│   ├── admin.js
│   └── user.js
│
├── templates/
│   ├── home.html
│   ├── login.html
│   ├── admin.html
│   └── user.html
│
├── tests/
│   └── test_api.py
│
├── utils/
│   └── database.py
│
├── app.py
├── database.db
├── requirements.txt
└── README.md
```

---

# Project Flow

### Home Page

Users are welcomed with the FreshMart landing page, where they can either browse the grocery store or access the administrator login page.

---

### User Shopping

Customers can:

- Browse available products
- Search grocery items
- Filter products by category
- Add products to the shopping cart
- Update quantities
- Remove products
- Complete a simulated checkout process

The frontend dynamically communicates with the Flask backend through REST API requests using JavaScript Fetch API.

---

### Administrator Login

The administrator accesses the dashboard using predefined credentials.

Username

```
admin
```

Password

```
Admin@2026
```

After successful authentication, the administrator is redirected to the dashboard.

---

### Admin Dashboard

The administrator can:

- Add products
- Update products
- Delete products
- Search products
- View dashboard statistics
- Monitor inventory value
- Monitor low-stock products

---

### Backend Processing

The Flask backend receives API requests from the frontend.

The application validates user input before performing CRUD operations.

Validated requests are processed through helper functions in `database.py`, which interact with the SQLite database.

JSON responses are returned to the frontend, allowing the interface to update dynamically without refreshing the page.

---

# How to Run the Project

## Step 1

Clone the repository.

```
git clone https://github.com/Workdemo2026/grocery_management.git
```

---

## Step 2

Navigate to the project folder.

```
cd grocery-management
```

---

## Step 3

Install dependencies.

```
pip install -r requirements.txt
```

---

## Step 4

Run the Flask application.

```
python app.py
```

---

## Step 5

Open the application in your browser.

```
http://127.0.0.1:5000
```

---

# REST API

The project exposes several REST endpoints.

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/products | Retrieve all products |
| GET | /api/products/<id> | Retrieve a specific product |
| POST | /api/products | Add a new product |
| PUT | /api/products/<id> | Update an existing product |
| DELETE | /api/products/<id> | Delete a product |
| GET | /api/search | Search products |
| GET | /api/dashboard | Retrieve dashboard statistics |

---

# Testing

The project includes API testing to verify CRUD functionality and backend responses.

Run the tests using:

```
python -m pytest tests/test_api.py
```

---

# Development References

The project was developed using a combination of official documentation and educational programming resources.

### Initial Project Setup

Reference

- Flask Documentation
  https://flask.palletsprojects.com/

---

### Database Implementation

Reference

- SQLite Documentation
  https://www.sqlite.org/docs.html

---

### Frontend Development

References

- W3Schools HTML
  https://www.w3schools.com/html/

- W3Schools CSS
  https://www.w3schools.com/css/

- MDN Fetch API
  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

---

### Repository Management

Reference

- Git Documentation
  https://git-scm.com/docs

---

### Code Refinement

Some sections of the application, including frontend refinement, login implementation, debugging, and application structure, were developed with guidance from ChatGPT.

Reference

- ChatGPT (OpenAI)
  https://chatgpt.com/

---

# Technologies Used

- Python
- Flask
- SQLite
- HTML5
- CSS3
- JavaScript
- REST API
- Git
- GitHub

---

# Future Improvements

The current system provides the core functionality required for grocery management.

Future enhancements may include:

- User registration and authentication
- Secure password hashing
- Session-based authentication
- Online payment gateway
- Product image upload
- Order history
- Cloud database integration
- Sales analytics dashboard
- Barcode scanning
- Email notifications

---

# Author

Developed for academic purposes as part of a university coursework project.


Commit References
Initial Commit

Description:

Created the initial Flask project structure.
Configured the project environment and basic application files.

Reference:

Flask Documentation: https://flask.palletsprojects.com/

Changes are made

Description:

Developed the complete Grocery Management System.
Implemented Flask REST APIs.
Integrated SQLite database.
Developed User Panel and Shopping Cart.
Added Search functionality and responsive interface.

References:

Flask Documentation: https://flask.palletsprojects.com/
SQLite Documentation: https://www.sqlite.org/docs.html
W3Schools HTML & CSS: https://www.w3schools.com/
ChatGPT (OpenAI): https://chatgpt.com/

Merge branch 'main'

Description:

Merged the local repository with the GitHub remote repository.
Resolved merge conflicts and synchronized the final project.

Reference:

Git Documentation: https://git-scm.com/docs


https://grocery-management-408306425044.europe-west1.run.app/
