# CSV Upload and Address Standardization API

This is a Node.js application built with Express.js that provides an API endpoint for uploading CSV files containing house data and standardizing addresses. The endpoint returns the number of unique houses based on the provided data.

## Features

- Upload CSV files containing house data.
- Standardize addresses to facilitate comparison and analysis.
- Return the number of unique houses based on the provided data.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:

```bash
cd csv-upload
```
3. Install dependencies:

```bash
npm install
```

## Usage
1. Start the server:

```bash
npm start
```
2. Send a POST request to the /upload endpoint with a CSV file containing house data.
3. The server will respond with the number of unique houses based on the provided data.

## API Endpoint
- POST /upload
Uploads a CSV file containing house data and returns the number of unique houses.

## Example
```bash
curl -X POST -F "csvFile=@/path/to/file.csv" http://localhost:3000/upload
```
## Testing
Run tests using Jest:

```bash
npm test
```
## Dependencies
- express: Web framework for Node.js
- multer: Middleware for handling file uploads
- csv-parser: CSV parsing library
- jest: Testing framework
- supertest: HTTP assertion library for testing APIs

## License
This project is licensed under the MIT License.
