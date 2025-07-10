# Full-Stack ChatGPT Clone

![Homepage Demo](./demo/homePage.gif)
## Overview

This project is a full-stack clone of the popular AI chatbot, ChatGPT. It is built with a modern tech stack, featuring a React frontend and a Node.js/Express backend. The application allows users to sign up, log in, and engage in conversations with an AI powered by the OpenAI API.

## Key Features

### Frontend
- **User Authentication:** Secure user signup and login functionality.
- **Real-time Chat Interface:** A dynamic and responsive chat interface for seamless conversations.
- **Typing Animation:** Visual feedback while the AI is generating a response.
- **Toast Notifications:** User-friendly notifications for important events.
- **Syntax Highlighting:** Code blocks in chat messages are properly highlighted for readability.
- **Responsive Design:** The application is designed to work on various screen sizes.

### Backend
- **RESTful API:** A well-structured API to handle all application logic.
- **JWT Authentication:** Secure user sessions using JSON Web Tokens.
- **Password Hashing:** User passwords are securely hashed before being stored.
- **Mongoose Models:** Data is structured and managed using Mongoose schemas.
- **OpenAI Integration:** Connects to the OpenAI API to generate intelligent chat responses.

## Tech Stack

### Frontend
- **Framework:** React with TypeScript and Vite
- **UI Library:** Material-UI
- **Styling:** Emotion
- **Routing:** React Router DOM
- **API Communication:** Axios
- **Notifications:** React Hot Toast
- **Icons:** React Icons

### Backend
- **Framework:** Node.js with Express.js and TypeScript
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (jsonwebtoken) & bcrypt
- **AI:** OpenAI API
- **Middleware:** CORS, Cookie Parser, Morgan

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js and npm
- MongoDB instance (local or cloud-based)
- An OpenAI API key

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/chatgpt-clone.git
    cd chatgpt-clone/backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Copy the `.env.example` file to a new file named `.env`:
    ```bash
    cp .env.example .env
    ```
    Then, open the `.env` file and fill in the required values for the following variables:
    ```
    PORT=<your_port_number>
    COOKIE_SECRET=<your_cookie_secret>
    MONGODB_URL=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    OPENAI_API_KEY=<your_openai_api_key>
    OPENAI_ORGANIZATION_ID=<your_openai_organization_id>
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The backend will be running on `http://localhost:5000`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The frontend will be running on `http://localhost:5173`.

You can now open your browser and navigate to `http://localhost:5173` to use the application.