const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

// Firestore reference
const firestore = admin.firestore();

// Initialize Express
const app = express();
app.use(cors({origin: true}));

// Store user's API Key
app.post("/storeApiKey", async (req, res) => {
  const {userId, apiKey} = req.body;

  // Store the user's API key securely in Firestore
  await firestore.collection("apiKeys").doc(userId).set({apiKey});

  res.status(200).send("API Key stored successfully.");
});

// Retrieve user's API Key
app.get("/getApiKey", async (req, res) => {
  try {
    const userId = req.query.userId;

    // Retrieve the user's API key
    const apiKeyDoc = await firestore.collection("apiKeys").doc(userId).get();

    if (!apiKeyDoc.exists) {
      res.status(404).send({error: "API Key not found."});
      return;
    }

    const apiKeyData = apiKeyDoc.data();

    // Send the user's API key in the response
    res.status(200).send({apiKey: apiKeyData.apiKey});
  } catch (error) {
    console.error("Error retrieving API Key:", error);
    res.status(500).send({error: "Internal Server Error"});
  }
});

exports.api = functions.https.onRequest(app);
