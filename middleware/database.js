const mongoose= require("mongoose")
const connect =async ()=>{
    try {
        
        const connection = await mongoose.connect("mongodb://localhost:27017/contactsApp", {
            useNewUrlParser: true,
            useUnifiedTopology: true
         });

         if (connection) {
            console.log("database is connected successfully")
            console.log(connection.connection.host, connection.connection.name,connection.connection.port)
         }
         
        
    } catch (error) {
        console.log("error while connecting to the database")
        console.log(error)
        
    }
}

module.exports= {connect}