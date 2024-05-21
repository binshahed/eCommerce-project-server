# Project Documentation

## Overview

This project is an API for managing products and orders. It includes endpoints for creating, reading, updating, and deleting products, as well as creating and retrieving orders. The API is built with Express and MongoDB, and uses Zod for data validation.

## Technologies

- Node.js
- MongoDB
- TypeScript

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/binshahed/eCommerce-project-server.git
   cd eCommerce-project-server
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the server:

   ```sh
   npm run start:dev
   ```

4. Open browser and go
   ```
   http://localhost:5000/
   ```

## Endpoints

### Product Endpoints

#### Create a New Product

- **URL:** `/api/products`
- **Method:** `POST`
- **Description:** Creates a new product.
- **Body:**
  ```json
  {
    "name": "iPhone 13",
    "description": "A sleek and powerful smartphone with cutting-edge features.",
    "price": 999,
    "category": "Electronics",
    "tags": ["smartphone", "Apple", "iOS"],
    "variants": [
      {
        "type": "Color",
        "value": "Midnight Blue"
      },
      {
        "type": "Storage Capacity",
        "value": "256GB"
      }
    ],
    "inventory": {
      "quantity": 50,
      "inStock": true
    }
  }
  ```

#### Get All Products

- **URL:** `/api/products`
- **Method:** `GET`
- **Description:** Retrieves all products.

#### Get Product by ID

- **URL:** `/api/products/:productId`
- **Method:** `GET`
- **Description:** Retrieves a product by its ID.

#### Update Product by ID

- **URL:** `/api/products/:productId`
- **Method:** `PUT`
- **Description:** Updates a product by its ID.
- **Body:** (Fields to be updated)
  ```json
  {
    "name": "iPhone 15 pro max"
  }
  ```

#### Delete Product by ID

- **URL:** `/api/products/:productId`
- **Method:** `DELETE`
- **Description:** Deletes a product by its ID.

#### Search Products

- **URL:** `/api/products?searchTerm=iphone`
- **Method:** `GET`
- **Description:** Searches for products by a search term (e.g., name, description, category and tags).

### Order Endpoints

#### Create a New Order

- **URL:** `/api/orders`
- **Method:** `POST`
- **Description:** Creates a new order.
- **Body:**
  ```json
  {
    "email": "string",
    "productId": "string",
    "price": "number",
    "quantity": "number"
  }
  ```

#### Get All Orders

- **URL:** `/api/orders`
- **Method:** `GET`
- **Description:** Retrieves all orders.

#### Get Orders by Email

- **URL:** `/api/orders?email=level2@programming-hero.com`
- **Method:** `GET`
- **Description:** Retrieves orders by email.

## Usage

After starting the server, you can interact with the API using tools like Postman or curl, or by integrating it into your frontend application.

### Example curl Request

Create a new product:

```sh
curl -X POST http://localhost:5000/api/products \
-H 'Content-Type: application/json' \
-d '{
    "name": "iPhone 13",
    "description": "A sleek and powerful smartphone with cutting-edge features.",
    "price": 999,
    "category": "Electronics",
    "tags": ["smartphone", "Apple", "iOS"],
    "variants": [
        {
            "type": "Color",
            "value": "Midnight Blue"
        },
        {
            "type": "Storage Capacity",
            "value": "256GB"
        }
    ],
    "inventory": {
        "quantity": 50,
        "inStock": true
    }
}'
```
