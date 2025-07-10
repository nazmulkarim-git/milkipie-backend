const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/milkipie";

async function seed() {
  await mongoose.connect(MONGODB_URI);
  const admins = [
    { username: "admin", password: "supersecret", role: "admin" },
    { username: "nazmul", password: "nazmul", role: "admin" },
    { username: "karim", password: "karim", role: "manager" }
  ];
  for (let u of admins) {
    const exists = await User.findOne({ username: u.username });
    if (!exists) {
      const hashed = await bcrypt.hash(u.password, 10);
      await User.create({ ...u, password: hashed });
      console.log(`Seeded user: ${u.username}`);
    }
  }
  await mongoose.disconnect();
  console.log('Done.');
}

seed();
