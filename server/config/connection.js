const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://adilrasheed139:xnXZY8yTMkrhTbxI@aiflashcard.dbeyt.mongodb.net/?retryWrites=true&w=majority&appName=aiflashcard";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connectToDatabase() {
  try {
    // Connect the client to the server
    await client.connect();
    db = client.db('aiflashcard');  // Replace 'aiflashcard' with your database name
    console.log("Connected successfully to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Export the db variable to use in other parts of the application
function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized. Call connectToDatabase first.');
  }
  return db;
}

module.exports = {
  connectToDatabase,
  getDatabase,
};
