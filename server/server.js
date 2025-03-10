require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router/auth-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const productRoute= require("./router/details-router")
const cardRoute = require("./router/card-router");
const adminRoute = require("./router/admin-router");
const bodyParser = require('body-parser');
const detailsRouter = require("./router/details-router");
const optimizePrice = require('./router/optimizerPrice');
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
// to get the json data in express app.
app.use(express.json());
app.use(bodyParser.json());
app.use(detailsRouter);
// Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix
app.use("/api/auth", router);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/cd", cardRoute);
app.use("/api/card", productRoute)
//admin Route
app.use("/api/admin", adminRoute);
app.use('/api', optimizePrice);
app.use(errorMiddleware);

const PORT = 5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});