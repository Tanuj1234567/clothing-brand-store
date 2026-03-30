# Customer Management REST API

A beginner-friendly and modular REST API built with Node.js, Express.js, and MongoDB (Mongoose).

## Folder Structure

```
customer-api/
  config/
    db.js
  controllers/
    customerController.js
  middleware/
    errorHandler.js
    logger.js
    validateCustomer.js
  models/
    Customer.js
  routes/
    customerRoutes.js
  postman/
    Customer-Management-API.postman_collection.json
  .env.example
  package.json
  server.js
```

## Setup Instructions

1. Open terminal in `customer-api` folder:
   ```bash
   cd customer-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your env file:
   ```bash
   cp .env.example .env
   ```
4. Make sure MongoDB is running locally.
5. Start server in development mode:
   ```bash
   npm run dev
   ```
6. API base URL:
   - `http://localhost:5000`

## API Endpoints

- `POST /api/customers` - create customer
- `GET /api/customers` - list customers (supports pagination + search)
- `GET /api/customers/:id` - get one customer
- `PUT /api/customers/:id` - update customer
- `DELETE /api/customers/:id` - delete customer

## Bonus Features Added

- Pagination (`page`, `limit`)
- Search by `name` or `email` (`search`)
- Request logging middleware

## NPM Scripts

- `npm run dev` -> start with nodemon
- `npm start` -> start with node
