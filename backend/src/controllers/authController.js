import { login } from '../services/authService.js'

const auth = async (req, res) => {
  try {
    console.log(req.body)

    const user = await login(req.body)
    console.log(user)
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error auth', error })
  }
}

export { auth }
