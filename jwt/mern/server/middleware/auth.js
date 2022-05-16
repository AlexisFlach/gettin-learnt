const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
  const token = req.header('authorization')

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))

    req.user = decoded.user;

    next()
  } catch (e) {
    res.status(401).json({ msg: 'Token is not valid' })
  }
}