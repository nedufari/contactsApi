const express =require("express")
const router =express.Router();
const {getcontact,getonecontact,postcontact,updatecontact,deletecontact}=require('../controller/contactcontroller');
const validateToken = require("../middleware/validateTokenHandler");


router.use(validateToken) //protect all the routes so only logged in users can access it
router.route('/all').get(getcontact)

router.route('/one/:id').get(getonecontact)

router.route('/post').post(postcontact)

router.route('/update/:id').put(updatecontact)

router.route('/delete/:id').delete(deletecontact)

module.exports=router