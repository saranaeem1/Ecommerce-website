# Pasta on the Plate - MERN Stack E-Commerce Website
**Pasta on the Plate** is an E-Commerce platform developed using the MERN stack. The platform is designed for efficient and seamless online shopping, allowing users to add products to the cart from different categories and make online payments via debit or credit cards. It also allow admins for complete management of products, orders, and categories.

## Features
- **User Authentication**: Secure login and registration with support for Google OAuth.
- **User & Admin Roles**: Separate interfaces and functionalities for regular users and administrators.
- **Product Management**: Add, edit, delete, and view products with category management.
- **Order Management**: Manage orders, track statuses, and handle payments.
- **Category Management**: Admins can create and manage product categories.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Payment Integration**: Secure payment gateway for smooth transactions.

## Technologies Used
- **Frontend**: React, React Router, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token) & Google OAuth
- **Payment Integration**: Debit Card and Credit Card
- **API Integration**: RESTful APIs

## Installation

1. **Download Visual Studio Code**: [Download here](https://code.visualstudio.com/docs/setup/windows)

2. **Install Node.js**: [Download here](https://nodejs.org/)

3. **Install MongoDB**: [Installation guide](https://www.mongodb.com/try/download/community)

4. **Clone the repository**:
    ```bash
    git clone https://github.com/saranaeem1/Ecommerce-website
    ```

5. **Navigate to the Ecommerce directory and install dependencies**:
    ```bash
    cd Ecommerce
    npm install
    ```

6. **Set up environment variables**:
   Create a `.env` file in both the root and client/src directories
   
   ![image](https://github.com/user-attachments/assets/90f55da5-32f8-40f9-ba53-551db48017ad)
   

   - `.env` file in client/src directory:
     ```env
     REACT_APP_API=http://localhost:8000
     ```

   - `.env` file in root directory:
     ```env
     DEV_MODE=development
     MONGO_URL=mongodb+srv://sara:sara@cluster0.nbskjj2.mongodb.net/ecommerce
     JWT_SECRET=$$$$$$$$
     REACT_APP_API= http://localhost:8000
     BRAINTREE_MERCHANT_ID=gpxp3n7dyz5757b6
     BRAINTREE_PUBLIC_KEY=z89cvd5qcckmkxpp
     BRAINTREE_PRIVATE_KEY=f7bcdf4d5307b6db9aceb8a8a5695a9f
     GOOGLE_CLIENT_ID= 464158441246-f6mmeqdpgavjvv47b5sl6aljfo0f18tv.apps.googleusercontent.com
     GOOGLE_CLIENT_SECRET= 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
     SESSION_SECRET= abcdx67jf4uvhgcUo09cf75$vhhfghtverqrasd738472308rgkjhbfhb789ghu23rsa
     ```
     
7. **Start the both fronend and backend server**:
    ```bash
    npm run dev
    ```


