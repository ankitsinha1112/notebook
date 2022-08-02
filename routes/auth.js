const express = require("express");
const User = require("../models/User")
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const res = require("express/lib/response");
const JWT_SECRET = 'dhomyaisagoodboy';
var fetchuser = require('../middleware/fetchuser');

//Route1: creating user using a post request no login required "/api/auth/createuser"
router.post('/createuser' , [
    
    body('name',"enter valid name").isLength({ min: 3 }),
    body('email',"enter valid email").isEmail(),
    body('password',"enter valid password").isLength({ min: 5 }),

],

   async(req,res)=>{
    let success = false;
     //If there are errors return bad request
     const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    //to check if user has same email or not
    try {
      
    
    let user = await User.findOne({email: req.body.email})
    if(user)
    {
      return res.status(400).json({error:"Sorry user email already exist"})
    }

    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(req.body.password,salt);



    //creating a user

    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
        })

        const data = {
          user : {
            id: user.id
          }
        }

        const authtoken = jwt.sign(data,JWT_SECRET);
        success=true;

        res.json({success,authtoken});
      } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured");
      
      }
        
        // .then(user => res.json(user));
}
)


//Route2: authenticate user using a post request no login required "/api/auth/login"
// Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [ 
  body('email', 'Enter a valid email').isEmail(), 
  body('password', 'Password cannot be empty').exists(), 
], async (req, res) => {
  let success = false;

  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if(!user){
      success = false;
      return res.status(400).json({error: "Please try to login with correct credentials"});
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      return res.status(400).json({success,error: "Please try to login with correct credentials"});
    }

    const data = {
      user:{
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success,authtoken})

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


module.exports = router;