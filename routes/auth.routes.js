const { Router } = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')

const router = Router()

// /api/auth/signup
router.post(
  '/signup',
  [
    check('email', 'Некорректный e-mail').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации'
        })
      }

      const { email, password } = req.body

      const candidate = await User.findOne({ email })
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'Пользователь с таким e-mail уже существует' })
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const user = new User({ email, password: hashedPassword })
      await user.save()

      res.status(201).json({ message: 'Пользователь зарегистрирован' })
    } catch (e) {
      res.status(500).json({ message: 'Ошибка сервера, попробуйте снова' })
    }
  }
)

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Некорректный e-mail')
      .normalizeEmail()
      .isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при попытке входа'
        })
      }

      const { email, password } = req.body

      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }

      const isMatch = bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль' })
      }

      const token = jwt.sign({ userId: user.id }, config.get('jwtSecretKey'), {
        expiresIn: '1h'
      })

      res.json({ token, userId: user.id })
    } catch (e) {
      res.status(500).json({ message: 'Ошибка сервера, попробуйте снова' })
    }
  }
)

module.exports = router
