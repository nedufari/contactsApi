//for the logic of the applicatio just like services in typescript nestjs
//

const asyncHandler = require("express-async-handler");
const User = require("../models/usermodels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getuser = asyncHandler(async (req, res) => {
  const user = await User.find();
  res.status(200).json(user);
});

const getoneuser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("contact not found please recheck the id and try again");
  }
  res.status(200).json(user);
});



const Registeruser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  const hashedpassword = await bcrypt.hash(password, 12);

  if (!name || !email || !password) {
    res.status(404);
    throw new Error("all fields are required");
  }
  const existinguser = await User.findOne({ email });
  if (existinguser) {
    res.status(409);
    throw new Error(`email ${email} already exists please use another one`);
  }
  const user = await User.create({ name, email, password: hashedpassword });
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email, name: user.name });
  } else {
    res.status(500).json({ message: "user could not be created" });
  }
});

const updateuser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("contact not found please recheck the id and try again");
  }
  const updatatedcontact = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatatedcontact);
});

const deleteuser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("contact not found please recheck the id and try again");
  }
  await Contact.deleteOne();

  res.status(200).json(contact);
});

const currentuser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});




const Login = asyncHandler(async (req,res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("all fields must be provided");
  }
  //check if user exists 
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({message:"invalid credential provided"})
  }
  const accessToken = jwt.sign(
    {
      user: {
        name: user.name,
        email: user.email,
        id: user.id,
      },
    },
    process.env.SECRET,
    {expiresIn:"20m"}
  );
  //compare the users to know if they matchh
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({ accessToken });
  }else{
    res.status(401)
    throw new Error("invalid credentials provided")
  }
});

module.exports = {
  getuser,
  Registeruser,
  updateuser,
  getoneuser,
  deleteuser,
  Login,
  currentuser,
};
