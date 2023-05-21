//for the logic of the applicatio just like services in typescript nestjs
//

const asyncHandler=require('express-async-handler')
const Contact =require("../models/contactmodels")


const getcontact=asyncHandler(async(req,res)=>{
    const contacts= await Contact.find({user_id:req.user.id})
    res.status(200).json(contacts)
})



const getonecontact=asyncHandler(async(req,res)=>{
    const contact= await Contact.findById(req.params.id)
    if (!contact){
        res.status(404)
        throw new Error("contact not found please recheck the id and try again")
    }
    if (contact.user_id.toString() != req.user.id){
        res.status(403)
        throw new Error("you are forbidde from doing this, only authorized users can")
    }
    res.status(200).json(contact)
})



const postcontact=asyncHandler(async (req,res)=>{
    console.log(req.body)
    const {name, email,phone}=req.body
    if (!name || !email || !phone){
        res.status(404)
        throw new Error("all fields are required")
    }
    const contact = await Contact.create({name,email,phone,user_id:req.user.id})
    res.status(201).json(contact)
})



const updatecontact=asyncHandler(async(req,res)=>{
    const contact= await Contact.findById(req.params.id)
    if (!contact){
        res.status(404)
        throw new Error("contact not found please recheck the id and try again")
    }
    if (contact.user_id.toString() != req.user.id){
        res.status(403)
        throw new Error("you are forbidden from doing this, only authorized users can")
    }
    const updatatedcontact=await Contact.findByIdAndUpdate(req.params.id, req.body, {new:true})

    res.status(200).json(updatatedcontact)
})



const deletecontact= asyncHandler(async (req,res)=>{
    const contact= await Contact.findById(req.params.id)
    if (!contact){
        res.status(404)
        throw new Error("contact not found please recheck the id and try again")
    }
    if (contact.user_id.toString() != req.user.id){
        res.status(403)
        throw new Error("you are forbidde from doing this, only authorized users can")
    }
    await Contact.deleteOne()
    
    res.status(200).json(contact)
})

module.exports ={getcontact,getonecontact,postcontact,updatecontact,deletecontact}