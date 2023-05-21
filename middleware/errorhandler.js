const {constants}=require('../constants')
const errorhandler=(err,req,res,next)=>{


    const statuscode=res.ststuscode?res.ststuscode:500

    switch (statuscode) {
        case constants.VALIDATION_ERROR:
            res.json({title:"Validation Failed",message:err.message,stackTrace:err.stack})
            
            break;
        case constants.NOT_FOUND:
            res.json({title:"Not Found",message:err.message,stackTrace:err.stack})
            break;
        case constants.FORBIDDEN:
            res.json({title:"forbidden to access this route ",message:err.message,stackTrace:err.stack})
            break;
        case constants.UNAUTHORIZED:
            res.json({title:"unauthorized access",message:err.message, stackTrace:err.stack})

            break;
        case constants.SERVER_ERROR:
            res.json({title:"server error",message:err.message, stackTrace:err.stack})

        

    
        default:
            console.log("no error all good!")
            break;
    }
    
   
}

module.exports = errorhandler;