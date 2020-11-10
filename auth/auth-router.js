const router = require('express').Router();
const bcrypt = require('bcrypt')
const Users = require('../models/users')
const jwt = require("jsonwebtoken")
const { restrict } = require("./authenticate-middleware")

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await User.findBy({ username }).first()
    if (user) {
      return res.status(409).json({
        message: "Username is Taken"
      })
    }


    const addUser = await User.add({
      username,
      password: await bcrypt.hash(password, 14)
    })


    res.status(201).json(addUser)


  } catch (err) {
    next(err)
  }
});


router.post('/login', async (req, res) => {
  // implement login
  try {
    const { username, password } = req.body
    const user = await User.findBy({ username }).first()


    if (!user) {
      return res.status(401).json({
        message: "Invalid User"
      })
    }
    const validPassword = await bcrypt.compare(password, user.password)


    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid Password"
      })
    }


    const token = jwt.sign({
      userID: user.id,


    },process.env.jWT_SECRET)


    req.cookie("token",token)


    res.json({
      message: `Welcome ${user.username} !!!!`
    })
  } catch (err) {


  }
});


module.exports = router;
