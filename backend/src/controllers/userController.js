import { auth as _auth } from '../services/userService.js'

const auth = async (req, res) => {
  try {
    const user = await _auth()
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error auth', error })
  }
}

export { auth }
