const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { insertOrder } = require("./Controllers/OrderController");

const { createProduct } = require("./Controllers/ProductController");
const {
  getProducts,
  updateProduct,
  getProductByFilter,
} = require("./Controllers/ProductController");
const { signup ,login,profile} = require("./Controllers/UserController"); 
const {verifyToken} = require("./middleware/ValidToken")
//----
dotenv.config();//----

const app = express();
app.use(express.json());

const mongoURI = process.env.MONGO_URI || "mongodb://mongo:27017/testdb";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/api/products", createProduct);
app.get("/api/products", getProducts);
app.post("/api/products/:id", updateProduct);
app.get("/api/products/filter", getProductByFilter);
app.post("/api/signup", signup);
app.post("/api/login", login);//----
app.get("/api/profile", verifyToken,profile);

// insert order
app.post("/api/orders", insertOrder);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
