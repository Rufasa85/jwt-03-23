const sequelize = require("../config/connection");
const {User} = require("../models")

const seedMe = async ()=>{
    await sequelize.sync({force:true})
    const users = await User.bulkCreate([
        {
            username:"joe",
            password:"password"
        },
        {
            username:"shiva",
            password:"iAmHungry"
        },
        {
            username:"bahamut",
            password:"chirpchirp"
        },
    ],{
        individualHooks:true
    })
    console.log(users);
    process.exit(0)
}

seedMe()