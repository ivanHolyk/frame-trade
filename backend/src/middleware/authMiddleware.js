// middlewares/authMiddleware.js
import { jwtVerify as verify } from 'jose'

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1] // Expecting Bearer token

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' })
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET) // Verify token with your secret
    req.user = decoded // Attach user payload to request object
    next()
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.' })
  }
}

export { authMiddleware }
