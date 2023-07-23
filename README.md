# Conquerer

This is a REST API for a blog application that allows users to create and manage blog posts, leave comments, and update their personal information and password.

## Table of Contents

- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Demo

Try [backend](https://conquerer-backend.vercel.app/)
<br />
Try [frontend](https://conquerer-frontend.vercel.app)

## Installation

### Clone the repository:

```
git clone https://github.com/burak48/conquerer
```

### Install the dependencies for backend:

```
cd backend
npm install
```

### Set up your environment variables for backend:

Create a `.env` file at the root of the project and add the following environment variables:

- POSTGRES_HOST=your-database-host
- POSGRES_PORT=your-database-port
- POSTGRES_USER=your-database-username
- POSTGRES_PASSWORD=your-database-password
- POSTGRES_DATABASE=your-database-name

- JWT_SECRET_KEY=your-jwt-secret
- PORT=your-backend-server-port

### Start the server:

```
node index.js
```

### Install the dependencies for frontend:

```
cd frontend
npm install
```

### Set up your environment variables for frontend:

Create a `.env.development` and `.env` files at the root of the project and add the following environment variables:

- REACT_APP_API_URL=your-frontend-url

### Start the server:

```
npm start
```

## Usage

- (Backend) Make API requests to `http://localhost:3001` using a tool like Postman or any HTTP client.
- (Frontend) Application can be accessed in a web browser at the specified URL (default is `http://localhost:3000`).

## Endpoints

You can view the Postman Endpoint [document](https://documenter.getpostman.com/view/7320900/2s946mZUyP)

## Authentication

This API uses JWT (JSON Web Token) for authentication. When you login, you will receive a JWT token in the response. You should include this token in the "Authorization" header of your API requests for authentication.

Example:

Authorization: Bearer your-jwt-token

## Error Handling

The API returns appropriate HTTP status codes along with detailed error messages in JSON format for different error scenarios.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
