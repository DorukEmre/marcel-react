const Group = require('../models/Group.model')
const User = require('../models/User.model')

module.exports = {
  // Groups page
  getGroups: async (req, res) => {
    try {
      const foundUser = await User.findOne({ email: req.user })

      const ownedGroups = await Group.find({
        owner: foundUser.id,
      }).lean()

      const memberGroups = await Group.find({
        // both expressions need to be satisfied
        $and: [
          // owner not equal ($ne) to user.id
          { owner: { $ne: foundUser.id } },
          // members equal ($eq) to user.id, same as { members: req.user.id },
          { members: { $eq: foundUser.id } },
        ],
      }).lean()

      res.json({ ownedGroups, memberGroups })
    } catch (err) {
      console.log(err)
    }
  },
  // Individual group page
  getGroup: (req, res) => {
    const active = ['mid', 'mid', 'mid', 'active', 'mid']
    res.render('group.ejs', { active })
  },
  createGroup: async (req, res) => {
    try {
      await Group.create({
        groupName: req.body['create-group-name'],
        owner: req.user.id,
        members: [req.user.id],
      })

      const group = await Group.find({
        groupName: req.body['create-group-name'],
      }).lean()
      const string = encodeURIComponent(group[0].groupName)

      res.redirect('/groups/?newgroup=' + string)
    } catch (err) {
      console.log(err)
    }
  },
}
