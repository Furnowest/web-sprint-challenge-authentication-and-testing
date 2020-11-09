const router = require('express').Router();
const bcrypt = require('bcrypt')
const Users = require('../models/users')



router.post('/register', async(req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password,10)
  user.password= hash
  Users.add(user)
  .then((saved) =>{
    res.status(201).json(saved)
  })
  .catch((err)=>{
    res.status(500).json(err)
  })
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
