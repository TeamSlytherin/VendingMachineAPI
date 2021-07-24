const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const adminRoute = require("./routes/admin");
const jwt = require("jsonwebtoken");
const app = express();

const productRoute = require("./routes/products");

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Handling CORS error
app.use(cors({ credentials: true, origin: true }));

//Routes
app.use("/admin", adminRoute);
app.use("/products", productRoute);



const PORT = process.env.PORT || 4000;

const connectServer = async (PORT) => {
  await connectDB();

  app.listen(PORT, () =>
    console.log(`Server started on http://localhost:${PORT}`)
  );
};

connectServer(PORT);
