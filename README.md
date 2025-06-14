# ExpenseTracker

# ExpenseTracker

![image](./useful/Screenshot%202025-04-30%20105050.png)
![image](./useful/Screenshot%202025-04-30%20110512.png)

# Overview

Welcome to the **ExpenseTracker** is a full-stack web application designed to help users track and manage their expenses in a simple and intuitive way.

#### It features:

- **Backend**: Built with **Node.js** and **Express**.
- **Frontend**: Developed using **React** with **Vite** for the build tool.
- **Styling**: Styled with **Tailwind CSS**.
- **Database**: Uses **MongoDB** for data storage.
- **Authentication**: Managed with **JWT** (JSON Web Tokens).
- **Password Security**: Handled with **bcrypt** for hashing passwords

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local or Atlas)
- npm or yarn

1. **Clone the repository**

   ```bash
   git clone https://github.com/Pratyushheavy/my-project.git
   cd ExpenseTracker
   ```

#### Backend

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory with the following content:
     ```plaintext
     PORT=your_port_number example-8000
     MONGO_URI=your_mongo_uri
     JWT_SECRET=your_jwt_secret
     ```

#### Frontend

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Running the Project

### Backend

1. Start the backend server:

   ```bash
   cd backend
   ```

   ```bash
   npm run dev
   ```

### Frontend

1. Start the frontend development server:

   ```bash
   cd frontend
   ```

   ```bash
   npm run dev
   ```
