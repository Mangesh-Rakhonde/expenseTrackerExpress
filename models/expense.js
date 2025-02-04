
const mongoose = require('mongoose');

class Expense {
  constructor() {
    const expenseSchema = new mongoose.Schema({
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      title: { type: String, required: true },
      amount: { type: Number, required: true },
      category: { type: String, enum: ['Food', 'Travel', 'Bills','EMI','Rent','Shopping', 'Others'], required: true },
      date: { type: Date, default: Date.now }
     
    });

    this.model = mongoose.model('Expense', expenseSchema);
  }

  async addExpense(expenseData) {
    return await this.model.create(expenseData);
  }

  async getUserExpenses(userId) {
    return await this.model.find({ user: userId });
  }

  async updateExpense(expenseId, updatedExpenseData) {
    return await this.model.findByIdAndUpdate(expenseId, updatedExpenseData, { new: true });
  }
  async deleteExpense(expenseId) {
    return await this.model.findByIdAndDelete(expenseId);
  }
}

module.exports = new Expense();

