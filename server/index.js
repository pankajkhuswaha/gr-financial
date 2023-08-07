const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const dbConnect = require("./config/dbConnect");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
const PORT = 7002;
const authRouter = require("./routes/authRoute");
const imageRouter = require("./routes/imguploadroute");
const customerRouter = require("./routes/customerRoute");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");

mongoose.set("strictQuery", true);
dbConnect();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/user", authRouter);
app.use("/api/upload", imageRouter);
app.use("/api/customer", customerRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server listening on http://127.0.0.1:${PORT}`);
});
