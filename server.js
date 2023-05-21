const express =require("express")
const errorhandler = require("./middleware/errorhandler")
const {connect} =require("./middleware/database")
const dotenv =require("dotenv").config()
const mongoose = require("mongoose");
const validateToken = require("./middleware/validateTokenHandler");

const app =express()
const port =process.env.PORT||5000

connect() //connecting to the db

//this would provide a parser that would eable use accept a body from the request
app.use(express.json())

//registering all the routes for the api endpoints
app.use('/api/contact',require("./routes/contactRoutes")) //middleware 
app.use('/api/user',require("./routes/userRoutes"))
app.use(errorhandler)
app.use('/api/user/currentuser',validateToken)





app.listen(port,()=>{
    console.log(`sever runing on ${port}` )
})