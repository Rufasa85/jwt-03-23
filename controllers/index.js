const express = require('express');
const router = express.Router();
const {User} = require('../models');

router.get("/",(req,res)=>{
    res.send("home")
})

const userRoutes = require("./userController");
router.use("/api/users",userRoutes)

module.exports = router;