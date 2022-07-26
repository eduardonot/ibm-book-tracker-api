module.exports = {
  checkUserId: (req, res, next) => {
    const userId = req.params.userid
    if (!userId) { return res.status(400).json({ message: 'param \'userid\' is mandatory' }) }
    next()
  },

  checkBookId: (req, res, next) => {
    const bookId = req.params.bookid
    if (!bookId) { return res.status(400).json({ message: 'param \'bookid\' is mandatory' }) }
    next()
  }
}
