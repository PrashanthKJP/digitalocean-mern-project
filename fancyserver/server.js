const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

//middleware has been updated
app.use(express.json());
app.use(express.static("static"));
app.use(cors());

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Prashanth:FancyNumber@fancynumber.ipudrdg.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("DATA-BASE CONNECTION SUCCESSFULLY");
  } catch (error) {
    console.log(error, "DATA BASE not connected");
  }
};
//database connection
connectDB();

//route's
app.use("/api", require("./routes/userRoute"));
app.use("/api", require("./routes/numberRoutes"));
app.use("/api", require("./routes/orderRoute"));
app.use("/api", require("./routes/filterRoute"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "static/index.html"));
});

app.listen(1337, () => {
  console.log(`server is running on port ${1337}`);
});
