// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   budget: { type: Number, default: 0 }
// });

// // Hash password before saving
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// const User = mongoose.model('User', userSchema);
// module.exports = {User};

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

class User {
  constructor() {
    const userSchema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
    });

    userSchema.pre('save', async function (next) {
      if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
      }
      next();
    });

    this.model = mongoose.model('User', userSchema);
  }

  async createUser(userData) {
    return await this.model.create(userData);
  }

  async findUserByEmail(email) {
    return await this.model.findOne({ email });
  }

  async validatePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

module.exports = new User();
