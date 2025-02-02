
const express = require('express');

const ExpenseController=require('../controller/ExpenseController');
const AuthMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', (req, res) => {AuthMiddleware.authenticate(req, res, () => ExpenseController.addExpense(req, res))});
router.get('/', (req, res) =>{AuthMiddleware.authenticate(req, res, () => ExpenseController.getExpenses(req, res))});

router.delete("/:id",(req,res)=>{AuthMiddleware.authenticate(req, res, () =>ExpenseController.deleteExpenses(req, res))});

module.exports = router;
