# Mealy Frontend

This is the frontend of the **Mealy** web application, a modern meal ordering platform. It is built using React and styled with plain CSS, designed to interact with a Flask backend API.

## Features

- User Authentication (Signup/Login) with JWT
- View meals and place orders
- Cart functionality with item quantity tracking
- Responsive navigation and clean UI design
- Admin Panel with:
  - Dashboard metrics (sales, orders, users)
  - Meal management (add, edit, delete)
  - Order tracking and approval/cancellation
  - User order insights

## Technologies Used

- React (with React Router)
- Plain CSS
- Axios for API requests
- AuthContext for managing authentication state

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   └── ... (other shared UI components)
├── pages/
│   ├── Home.jsx
│   ├── Menu.jsx
│   ├── Order.jsx
│   ├── Profile.jsx
│   ├── Admin.jsx
│   └── ...
├── context/
│   └── AuthContext.js
├── api/
│   └── index.js (Axios instance with token)
└── App.jsx
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Brian-op/Mealy-Front_end.git
   ```

2. Navigate to the project folder:
   ```bash
   cd Mealy-Front_end
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Backend

Ensure the Flask backend is running locally (default: http://localhost:5000) and supports endpoints for:
- `/signup`
- `/login`
- `/meals`
- `/orders`
- `/users`

Backend repository: [Mealy-Back_end](https://github.com/Brian-op/Mealy-Back_end)

## Authors

- Frontend:
1.Rooney Kassim
2.Rodney Amani
3.Lenny Kimanthi 

---

This project was built for educational and collaborative purposes.