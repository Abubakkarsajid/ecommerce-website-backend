const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const cors = require("cors");

// connect db
mongoose.connect(process.env.MONGO_ClINT_URL)
  .then(() => {
    console.log(
      `Database connected successfully with ${mongoose.connection.host}`
    );
  })
  .catch((err) => {
    console.log("DB CONNECTION ERROR", err);
  });

//   create a schema
const userSchema = new mongoose.Schema({
    id:Number,
    name: String,
    phone: Number,
    email: String,
    address: String,
    city:String,
    productName: String,
  });

  // create a model
  const order = mongoose.model("create-order-client", userSchema);
  app.use(express.json());
  app.use(cors());



  // create a new order
  app.post("/create-order", async (req, res) => {
    const create_Order = new order({
        id: req.body.id,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        city: req.body.city,
        productName: req.body.productName
    });
    await create_Order.save();
    res.send(create_Order);
    console.log(create_Order);
    
  });


  app.get("/", async (req, res) => {
    const data = await order.find({});
    
    res.send(data);
  });


app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
