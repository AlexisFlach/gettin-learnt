const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const config = require('config')
const usersRoute = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username })
    if (user) {
      return res
        .status(400)
        .json({ errors: [ { msg: 'User already exists' } ] });
    }
    user = new User({
      username,
      password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt)

    await user.save()
    const payload = {
      user: {
        id: user.id
      }
    }
    jwt.sign(payload, config.get('jwtSecret'),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ token })
      })
  } catch (e) {
    console.error(e.message)
  }
}

module.exports = { usersRoute } 