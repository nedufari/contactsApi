const express =require("express")
const router =express.Router();
const {getoneuser,getuser,deleteuser,updateuser, Registeruser,Login,currentuser}=require('../controller/usercontroller');
const validateToken = require("../middleware/validateTokenHandler");


router.route('/all').get(getuser)

router.route('/one/:id').get(getoneuser)

router.route('/register').post(Registeruser)

router.route('/update/:id').put(validateToken,updateuser) //protected

router.route('/delete/:id').delete(validateToken,deleteuser) //protected

router.route('/login').post(Login)

router.get('/currentuser',validateToken, currentuser) //protected route 

module.exports=router