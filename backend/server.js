const express = require("express");
const app = express();
const products = require("./data/products");
const cors = require("cors");
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to homepage");
});
app.get("/api/products", (req, res) => {
  res.json(products);
});
app.get("/api/products/:id", (req, res) => {
  const id = req.params.id;
  const singleProduct = products.find((p) => p._id === id);
  res.send(singleProduct);
});

app.listen(5000, () => {
  console.log(`server is listening on port 5000`);
});
