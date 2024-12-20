# How we made it :
# Tiny Linked Data Fragment Server (Backend)

This is the backend implementation of the Tiny Linked Data Fragment (LDF) server, designed to handle quad patterns and provide a RESTful API for inserting and querying RDF quads. The backend is built with **Java**, **Spring Boot**, and deployed on **Google Cloud App Engine**.

## Features

- **Insert Quads**: Allows authenticated users to insert RDF quads (subject, predicate, object, graph) with JWT token security.
- **Query Quads**: Supports querying quads based on any combination of subject, predicate, object, and graph.
- **Pagination**: Handles paginated results efficiently.
- **Authentication**: Secured with JWT-based authentication.
- **Global Exception Handling**: Provides consistent and user-friendly error responses.
- **Deployed on Google Cloud App Engine**: Scalable and cloud-based deployment.

---

## Requirements

### Prerequisites
- **Java 17** or higher
- **Maven** for dependency management
- **Google Cloud SDK** for deployment
- **PostgreSQL** database configured as per `application.properties`

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-repository/tiny-ldf-backend.git
cd tiny-ldf-backend
```

### 2. Configure Environment Variables
Ensure the following files are properly configured:

#### `application.properties`
```properties
spring.datasource.url=jdbc:postgresql://34.100.240.123:5432/tinyldf
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.datasource.driver-class-name=org.postgresql.Driver

# Hibernate settings
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true


```
Replace `<YOUR_SECRET_KEY>` with your actual secret key for JWT.

#### `app.yaml`
```yaml
runtime: java17
env: standard
instance_class: F2

env_variables:
  GOOGLE_APPLICATION_CREDENTIALS: "tiny-ldf-backend-e98996abdca5.json"

handlers:
  - url: /.*
    script: auto
```

#### `tiny-ldf-backend-e98996abdca5.json`
This is your Google Cloud service account key file. Ensure it is securely stored and referenced in `app.yaml`.

### 3. Build the Project
Run the following command to package the project:
```bash
mvn clean package
```

### 4. Run the Application Locally
To run the application locally, use:
```bash
java -jar target/tiny-ldf-backend-0.0.1-SNAPSHOT.jar
```
The backend will be accessible at `http://localhost:8080`.

---

## API Endpoints

### Authentication
- **Login**
  ```
  POST /api/auth/login
  ```
  **Request Body:**
  ```json
  {
    "username": "admin",
    "password": "password"
  }
  ```
  **Response:**
  ```json
  {
    "token": "<JWT_TOKEN>"
  }
  ```

### Quad Operations

- **Insert Quad**
  ```
  POST /api/ldf/insert
  ```
  **Headers:**
  ```
  Authorization: Bearer <JWT_TOKEN>
  ```
  **Request Body:**
  ```json
  {
    "subject": "<SUBJECT>",
    "predicate": "<PREDICATE>",
    "object": "<OBJECT>",
    "graph": "<GRAPH>"
  }
  ```
  **Response:**
  ```json
  {
    "id": 1,
    "subject": "<SUBJECT>",
    "predicate": "<PREDICATE>",
    "object": "<OBJECT>",
    "graph": "<GRAPH>"
  }
  ```

- **Query Quads**
  ```
  GET /api/ldf/query
  ```
  **Query Parameters:**
  - `subject` (optional)
  - `predicate` (optional)
  - `object` (optional)
  - `graph` (optional)
  - `page` (default: 0)
  - `size` (default: 10)

  **Response:**
  ```json
  {
    "content": [
      {
        "id": 1,
        "subject": "<SUBJECT>",
        "predicate": "<PREDICATE>",
        "object": "<OBJECT>",
        "graph": "<GRAPH>"
      }
    ],
    "pageable": {
      "page": 0,
      "size": 10
    }
  }
  ```

---

## Deployment

### 1. Configure Google Cloud App Engine
Ensure that the **Google Cloud SDK** is installed and authenticated:
```bash
gcloud auth login
gcloud config set project tiny-ldf-backend
```

### 2. Deploy to App Engine
Deploy the application using:
```bash
gcloud app deploy
```

The backend will be available at `https://tiny-ldf-backend.uc.r.appspot.com`.

---

## Testing

### Run Unit Tests
Run the following command to execute the test suite:
```bash
mvn test
```

---

## Troubleshooting

1. **Database Connection Issues**:
   - Verify the database credentials in `application.properties`.
   - Ensure the database is running and accessible.

2. **JWT Authentication Errors**:
   - Ensure the `jwt.secret` matches the key used to generate tokens.

3. **App Engine Deployment Errors**:
   - Verify the `app.yaml` configuration file.
   - Check the Google Cloud Console logs for details.

---

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments
- Built with Spring Boot and PostgreSQL
- Deployed on Google Cloud App Engine
