# Backend for Cart and 10% Discount for nth order 
## Installation

Install my-project with npm


Clone the repo
```bash
git clone https://github.com/earth9890/e-comm.git 
```


Install packages
```bash
cd e-comm
npm install
```

To run 

```bash
npm start
```



    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


`PORT=8000`

`MONGODB_URL=mongodb+srv://Username:Password@cluster0.m8h15kt.mongodb.net/?retryWrites=true&w=majority`





## Demo

Check Using CURL is requests runnig successfully


It will Create an Username if not present in database and also add items to cart of user based on their productID. This productID is already present database. 

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "username": "john_doe",
  "cartItems": [
    {
      "productId": "65a64f7b2a8c25a546c6d4be",
      "quantity": 2
    }
  ]
}' https://backend-uniblox.onrender.com/checkout
```

### To add Products
```bash
curl -X POST -H "Content-Type: application/json" -d '{"name": "Product Name", "price": 19.99}'
```





## API Reference



Backend 
```http
   https://backend-uniblox.onrender.com"
```
#### Get all items
```http
  GET https://backend-uniblox.onrender.com/products/get-products
```
```http
  POST https://backend-uniblox.onrender.com/products/add-product"
```

Send data using above to add product

{"name": "Product Name", "price": 1000}

### To Checkout 

```http
  POST https://backend-uniblox.onrender.com/checkout
```
Send data using above to add checkout 

  "username": "john_doe",
  "cartItems": [
    {
      "productId": "65a64f7b2a8c25a546c6d4be",
      "quantity": 2
    }
  ]
}'



