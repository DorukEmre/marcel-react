// const Post = require("../models/Post.model");

module.exports = {
  getExplore: (req, res) => {
    const active = ['mid', 'active', 'mid', 'mid', 'mid']
    res.render('explore.ejs', { active })
  },
}
