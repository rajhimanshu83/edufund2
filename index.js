const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRouter = require("./routes/routes");
const entryRouter = require("./routes/entry");
// const logger = require("./middleware/logger");

const mongoose = require('mongoose');
require("dotenv").config();

const path = require('path');
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));
const app = express();

// Init middleware
// app.use(logger);

app.use(cors())
// body-parser (express middleware) that reads a form's input and stores it as a javascript object accessible through req.body
app.use(bodyParser.json());

// API Routes
app.use('/api', apiRouter);
app.use('/', entryRouter);


// Path used by client /*
app.use(express.static(path.join(__dirname, "client2/build")));

const port = Number(process.env.PORT) || 8000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));