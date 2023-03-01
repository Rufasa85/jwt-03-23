const express = require('express');
const router = express.Router();
const {User} = require('../models');

router.post("/login",(req,res)=>{
    //TODO: sign jwt
    res.json("login route")
})

router.post("/",(req,res)=>{
    //TODO:create user, sign jwt
    res.json("create user route")
})

router.get("/profile",(req,res)=>{
    //TODO: get userdata from jwt, verify jwt
    res.json("profile route")
})

module.exports = router;