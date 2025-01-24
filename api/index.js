const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Transaction = require("./models/Transaction");
const mongoose = require("mongoose");
const app = express();


app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.send({ body: "tesing successfull" });
});

// app.post("/api/transaction", async (req, res) => {
//   await mongoose.connect(process.env.MONGO_URL);
//   const { name, description, dateTime, price } = req.body;
//   const transaction = await Transaction.create({
//     name,
//     description,
//     dateTime,
//     price,
//   });

//   res.json(transaction);
// });

app.post("/api/transaction", async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const { name, description, dateTime, price } = req.body;
  
    if (!name || !description || !price) {
      return res.status(400).json({ error: "Name, description, and price are required." });
    }
  
    try {
      const transaction = await Transaction.create({
        name,
        description,
        dateTime,
        price,
      });
      res.json(transaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

app.get("/api/transaction", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const transactions = await Transaction.find();
  res.json(transactions);
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3001");
});