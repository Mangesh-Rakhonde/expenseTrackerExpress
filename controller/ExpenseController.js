
const Expense = require('../models/Expense');

class ExpenseController {
  async addExpense(req, res) {
    try {
      const { title, amount, category,date, note } = req.body;
      const expense = await Expense.addExpense({
        user: req.user._id,
        title,
        amount,
        category,
        date,
        note,
      });
      res.status(201).json({ message: 'Expense added successfully', expense });
    } catch (error) {
      res.status(400).json({ message: 'Error adding expense', error: error.message });
    }
  }

  async getExpenses(req, res) {
    try {
      const expenses = await Expense.getUserExpenses(req.user._id);
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching expenses', error: error.message });
    }
  }

  async updateExpense(req, res) {
    const { title, amount, category, date, note } = req.body;
    const id = req.params.id;
    try {
      const updatedExpense = await Expense.updateExpense(id, { title, amount, category, date, note });
      res.status(200).json({ message: 'Expense updated successfully', expense: updatedExpense });
    } catch (error) {
      res.status(400).json({ message: 'Error updating expense', error: error.message });
    }
  }
  async deleteExpenses(req,res){
    const id=req.params.id;
    try {
      await Expense.deleteExpense(id);
      res.status(200).json({ message: 'All expenses deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting expenses', error: error.message });
    }

  }
}

module.exports = new ExpenseController();
