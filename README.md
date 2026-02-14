# PizzaHub - Online Pizza Ordering System (MERN)

> PizzaHub is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application designed to deliver a seamless online pizza ordering experience. The platform enables users to customize pizzas with dynamic ingredient selection, securely place orders, and track order status in real time.
It features a responsive user interface, a powerful admin dashboard for managing orders and inventory, automated inventory updates, secure JWT-based authentication, Razorpay payment integration, and email notifications.
This project demonstrates end-to-end full-stack development, RESTful API design, secure authentication, state management with Redux Toolkit, and deployment-ready architecture.

## Live Preview Project

[Live Preview](https://pizzahub-online.vercel.app/)

## Features

- **User & Admin Authentication:** Secure login and registration system with role-based access control for users and administrators.
- **Pizza Management System:** Full CRUD operations for pizzas, allowing both admins and users to create custom pizzas with various ingredients (bases, sauces, cheeses, veggies).
- **Inventory Management:** Complete tracking system for pizza ingredients with quantity monitoring, threshold alerts, and price management for bases, sauces, cheeses, and vegetables.
- **Order Processing System:** End-to-end order management with order creation, status tracking, and delivery monitoring functionality.
- **Payment Integration:** Secure payment processing through Razorpay API with order checkout capabilities and payment verification.
- **Multi-level Access Control:** Differentiated capabilities for users and admins, with specific permissions for pizza creation, order management, and inventory control.
- **Order History & Tracking:** Users can view their order history and track current order status through the delivery process.
- **Admin Dashboard:** Comprehensive order management system allowing admins to view all orders, update order status, and manage inventory levels.
- **Automatic Inventory Deduction:** System automatically updates ingredient quantities when orders are placed to maintain accurate inventory levels.

## Built With

- **Frontend:** React.js (Vite.js) (Tailwind CSS) (React Router) (@reduxjs/toolkit) (React Redux) ()
- **Backend:** Node.js (Express) (bcryptjs) (cors) (dotenv) (express-async-handler) (jsonwebtoken)
- **Database:** MongoDB (Atlas) (Mongoose) (MongoDB Compass)
- **Payment:** Razorpay API (Test Mode)
- **Authentication:** JSON Web Tokens (JWT)
- **Email Notifications:** Nodemailer
- **Version Control:** Git and GitHub

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine
- [NPM](https://www.npmjs.com/) - Node Package Manager

### Installation

1. **Clone the repository**

   ```sh
      git clone https://github.com/itxSaaad/pizza-palette-app-mern-OIBSIP-task-1.git
      cd pizza-palette-app-mern-OIBSIP-task-1
   ```

2. **Install dependencies**

   ```sh
      # Install server dependencies
      npm install

      # Install client dependencies
      cd client
      npm install
      cd ..
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```sh
       # Server Configuration
       NODE_ENV=development
       PORT=5000

       # MongoDB Connection
       MONGO_URI=your_mongodb_uri

       # Authentication
       JWT_SECRET=your_jwt_secret
       SALT=10

       # Email Configuration
       SENDER_EMAIL=your_email@example.com
       SENDER_PASSWORD=your_email_password
       SUPERADMIN_EMAIL=admin@example.com

       # Payment Gateway
       RAZORPAY_KEY_ID=your_razorpay_key_id
       RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

   Create a `.env` file in the client directory:

   ```sh
       VITE_SERVER_URL=http://localhost:5000
       VITE_CLIENT_URL=http://localhost:3000
       VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

4. **Seed the database (Optional)**

   Populate the database with initial data:

   ```sh
       npm run data:import
   ```

   To reset the database:

   ```sh
       npm run data:destroy
   ```

5. **Start the application**

   ```sh
      # Run both server and client
      npm run dev

      # Run server only
      npm run server

      # Run client only
      npm run client
   ```

6. **Access the application**

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)

> **Note:** Make sure MongoDB is running locally or you're using MongoDB Atlas with the correct connection string.

## Contributing

Contributions are what make the open-source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the repo
2. Clone the project
3. Create your feature branch (`git checkout -b feature/AmazingFeature`)
4. Commit your changes (`git commit -m "Add some AmazingFeature"`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a pull request

## 👤 Developed By
**Harshada Gulabrao Patil**  
Full-Stack Web Developer  

🔗 LinkedIn: [Harshada_Patil](https://www.linkedin.com/in/harshada-g-patil/)  
📧 Email: harshupatil0405@gmail.com
