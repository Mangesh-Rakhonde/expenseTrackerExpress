const express = require('express');
//const { registerUser, loginUser } = require('../controller/UserController');
const UserController = require('../controller/UserController');
const router = express.Router();


router.post('/register',(req,res)=>UserController.register(req,res));
router.post('/login',(req,res)=>UserController.login(req,res));

//router.post('/register', registerUser);
//router.post('/login', loginUser);

module.exports = router;
