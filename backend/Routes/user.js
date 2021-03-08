const express = require('express')
const { register, login } = require('../controllers/user.controller')
const { registerRules, validator } = require('../middleware/validator')
const isAuth = require ('../middleware/passport-setup');
const Router = express.Router()

Router.post('/register', registerRules(), validator, register);
Router.post ('/login',login)
Router.get('/current',isAuth(),(req,res)=>{
    console.log('req',req)
    res.json(req.user)

})

module.exports = Router;