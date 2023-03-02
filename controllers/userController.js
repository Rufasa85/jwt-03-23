const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const {User} = require('../models');
const jwt =require("jsonwebtoken")

router.post("/login",(req,res)=>{
    //TODO: sign jwt
    User.findOne({
        where:{
            username:req.body.username
        }
    }).then(foundUser=>{
        if(!foundUser){
            return res.status(401).json({msg:"invalid credentials"})
        } else if(!bcrypt.compareSync(req.body.password,foundUser.password)){
            return res.status(401).json({msg:"invalid credentials"})
        } else {
            const token = jwt.sign({
                id:foundUser.id,
                username:foundUser.username
            },process.env.JWT_SECRET,{
                expiresIn:"2h"
            })
            console.log(token)
            return res.json({
                token:token,
                user:foundUser
            })
        }
    })
})

router.post("/",(req,res)=>{
    //TODO:create user, sign jwt
    res.json("create user route")
})

router.get("/profile",(req,res)=>{
    //TODO: get userdata from jwt, verify jwt
    const token = req.headers?.authorization?.split(" ")[1]
    console.log(req.headers)
    console.log(token)
    if(!token){
        return res.status(403).json({msg:"invalid or missing token"})
    }
    try {
        const data = jwt.verify(token,process.env.JWT_SECRET)
        console.log(data);
        User.findByPk(data.id).then(foundUser=>{

            return res.json(foundUser)
        })
    } catch (err) {
        console.log(err);
        return res.status(403).json({msg:"invalid or missing token"})
    }
})

module.exports = router;