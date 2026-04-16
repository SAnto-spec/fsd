// index-test-mongoose.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');


async function testIndexes() {
  await mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME
  });


  console.log("Connected to DB");


  // Clear old data
  await User.deleteMany({});


  // Insert sample data
  await User.insertMany([
    { name: "Alice", email: "alice@example.com", age: 25, hobbies: ["reading", "gaming"], bio: "Full-stack developer", userId: "u001" },
    { name: "Bob", email: "bob@example.com", age: 30, hobbies: ["gaming"], bio: "Graphic designer", userId: "u002" },
    { name: "Charlie", email: "charlie@example.com", age: 25, hobbies: ["reading"], bio: "Backend developer", userId: "u003" },
    { name: "TempUser", email: "temp@example.com", createdAt: new Date(), userId: "u004" }
  ]);


  console.log("Sample data inserted");


  // 🔍 Improved index detection
  function detectIndex(stage) {
    if (!stage) return 'N/A';


    if (stage.stage === 'IXSCAN') {
      return stage.indexName || 'index used';
    }


    if (stage.stage === 'TEXT_MATCH') {
      return 'text index';
    }


    return (
      detectIndex(stage.inputStage) ||
      detectIndex(stage.innerStage) ||
      'N/A'
    );
  }


  // 🚀 Final test function (DATA + PERFORMANCE)
  async function runTest(query, description) {
    console.log(`\n=== ${description} ===`);


    // 1. Actual Data
    const data = await User.find(query);
    console.log("📦 Returned Data:");
    console.log(data);


    // 2. Explain stats
    const start = Date.now();


    const explain = await User.collection
      .find(query)
      .explain("executionStats");


    const end = Date.now();


    console.log("⚙️ Execution Stats:");
    console.log({
      nReturned: explain.executionStats.nReturned,
      keysExamined: explain.executionStats.totalKeysExamined,
      docsExamined: explain.executionStats.totalDocsExamined,
      indexUsed: detectIndex(explain.executionStages),
      executionTimeMs: end - start
    });
  }


  // Run all tests
  await runTest({ name: "Alice" }, "Single Field Index (name)");
  await runTest({ email: "alice@example.com", age: 25 }, "Compound Index (email + age)");
  await runTest({ hobbies: "gaming" }, "Multikey Index (hobbies)");
  await runTest({ $text: { $search: "developer" } }, "Text Index (bio)");
  await runTest({ userId: "u002" }, "Hashed Index (userId)");
  await runTest({ name: "TempUser" }, "TTL Index (createdAt)");


  await mongoose.disconnect();
  console.log("\n✅ Index test completed.");
}


testIndexes().catch(console.error);

