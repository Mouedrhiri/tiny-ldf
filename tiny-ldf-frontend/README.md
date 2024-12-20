# Tiny LDF Frontend

This is the frontend application for the Tiny Linked Data Fragment (LDF) server, implemented using React. The application allows users to:

- Log in to the backend using credentials to retrieve a JWT token.
- Insert quads (subject, predicate, object, graph) into the LDF server.
- Query quads with various filters (e.g., subject, predicate) and view paginated results.
- Manage authentication and session via token-based access.

The frontend is deployed on Google Cloud Storage and communicates with the backend hosted on Google Cloud App Engine.

## Features

- **Login Page**: Allows users to authenticate and retrieve a JWT token.
- **Insert Quad**: A form to insert new quads into the LDF server.
- **Query Quad**: A form to query quads with filters, display results, and support pagination.
- **Responsive Design**: Built with Bootstrap for a responsive and user-friendly interface.

## Live Demo

The frontend is deployed at: [Frontend Live URL](https://storage.googleapis.com/tiny-ldf-frontend/index.html)

## Prerequisites

- Node.js (version 18 or above)
- npm (version 8 or above)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/tiny-ldf-frontend.git
   cd tiny-ldf-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file for environment variables (optional).

4. Start the development server:

   ```bash
   npm start
   ```

   The app will run on `http://localhost:3000/`.

## Deployment

1. Build the app for production:

   ```bash
   npm run build
   ```

2. Deploy the `build` directory to Google Cloud Storage:

   ```bash
   gsutil -m rsync -R build gs://tiny-ldf-frontend/
   ```

3. Update the `homepage` field in `package.json` to reflect your deployment URL:
   ```json
   "homepage": "https://storage.googleapis.com/tiny-ldf-frontend/"
   ```

## Authentication

The app requires a valid JWT token for API calls to the backend. Tokens are stored in `localStorage` and cleared upon logout.

### Login Workflow

1. Users log in using the `/login` endpoint.
2. A valid JWT token is retrieved and stored in `localStorage`.
3. Subsequent API requests include the token in the `Authorization` header.

## Available Scripts

### `npm start`

Runs the app in development mode.

### `npm run build`

Builds the app for production.

### `npm test`

Launches the test runner.

### `npm run eject`

Ejects the app configuration (not recommended).

## API Integration

The app communicates with the backend using the following API endpoints:

- **Login**: `POST /api/auth/login`
- **Insert Quad**: `POST /api/ldf/insert`
- **Query Quads**: `GET /api/ldf/query`

All API requests include a JWT token in the `Authorization` header.

## File Structure

```plaintext
src/
├── components/       # UI components (e.g., forms, navbar)
├── services/         # API service functions
├── App.js            # Main application component
├── index.js          # Entry point
└── styles/           # Custom CSS (if applicable)
```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## Known Issues

- Error handling for expired tokens is partially implemented.
- Performance improvements needed for large quad queries.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Authors

- [Your Name](https://github.com/your-username)

---

### Additional Notes

Ensure the backend is running and accessible at the correct URL. Update the `API_BASE_URL` in `src/services/api.js` if necessary.
