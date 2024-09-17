import { jwtVerify } from 'jose'
import { createSecretKey } from 'crypto'
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns
 */
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' })
  }

  try {
    const decoded = await jwtVerify(token, createSecretKey(process.env.JWT_ACCESS_SECRET), 'utf-8')

    req.user = decoded
    next()
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.' })
  }
}

export { authMiddleware }
