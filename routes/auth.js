const express = require('express');

const AuthMiddleware = require('../middleware/authMiddleware');
const { authMe } = require('../controller/UserController');

const router = express.Router();

router.get('/me',(req,res)=>{AuthMiddleware.authenticate(req,res,()=>{authMe(req,res)})})

module.exports = router;