const { Router } = require('express')
const config = require('config')
const shortId = require('shortid')
const Link = require('../models/Link')
const authMiddleware = require('../middleware/auth.middleware')

const router = Router()

// /api/links/generate – create a new link
router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const baseURL = config.get('baseURL')
    const { from } = req.body

    const code = shortId.generate()

    const isExists = await Link.findOne({ from })
    if (isExists) {
      return res.json({ link: isExists })
    }

    const to = baseURL + '/t/' + code
    const link = new Link({ from, to, code, owner: req.user.userId })
    await link.save()
    res.status(201).json({ link })
  } catch (e) {
    res.status(500).json({ message: 'Ошибка сервера, попробуйте снова' })
  }
})

// /api/links/ – get all links of a user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId })
    res.json(links)
  } catch (e) {
    res.status(500).json({ message: 'Ошибка сервера, попробуйте снова' })
  }
})

// /api/links/:id – get an exact link
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id)
    res.json(link)
  } catch (e) {
    res.status(500).json({ message: 'Ошибка сервера, попробуйте снова' })
  }
})

module.exports = router
