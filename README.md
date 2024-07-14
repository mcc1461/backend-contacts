# Backend Contacts API

This is a simple backend API for managing contacts using Node.js, Express, MongoDB, JWT for authentication, and bcrypt for password hashing. The API provides routes for user authentication and managing contact data with appropriate permissions.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Auth Routes](#auth-routes)
  - [Contact Routes](#contact-routes)
- [Error Handling](#error-handling)
- [Technologies Used](#technologies-used)
- [License](#license)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/backend-contacts.git
    cd backend-contacts
    ```

2. Install the dependencies:

    ```bash
    npm install -y
    npm i express dotenv express-async-handler mongoose bcrypt jsonwebtoken
    npm i -D nodemon
    ```

## Configuration

1. Create a `.env` file in the root directory of the project and add the following environment variables:

    ```plaintext
    PORT=
    MONGO_URI=mongodb+srv://...
    ACCESS_TOKEN_SECRET=secret1...
    RUN_CREATE_ADMIN_USER=false
    ```

2. Ensure MongoDB is running and accessible through the URI provided in `.env`.

## Running the Application

To start the application, use either of the following commands:

```bash
npm start
# or
nodemon




The server start on the port specified in the ".env" file.

## API Endpoints

xxx

### Auth Routes

xxxx
xdsfs

### Contact Routes

sfdsd

## Error Handling

All errors are handled centrally using a middleware. Errors are returned with appropriate HTTP status codes and error messages in JSON format.

## Technologies Used

Node.js: JavaScript runtime
Express: Web framework for Node.js
MongoDB: NoSQL database
Mongoose: MongoDB object modeling tool
JWT: JSON Web Tokens for authentication
bcrypt: Library to hash passwords


Register and Login


License

This project is licensed under the MIT License. See the LICENSE file for details.
