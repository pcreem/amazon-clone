const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HiDUkD2kqY8mgtx5OxdXNJMjUgYIoYppvmcqDPeya2DAqNBMm59a3sDyI4Zd09KnHEg7399P5brXA3FaaNJ5QFt00xqMu6zWr");

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/challenge-4b2b2/us-central1/api
