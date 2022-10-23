const Group = require('../models/Group.model')

module.exports = {
  // Groups page
  getGroups: async (req, res) => {
    const active = ['mid', 'mid', 'mid', 'active', 'mid']

    const ownedGroups = await Group.find({
      owner: req.user.id,
    }).lean()
    const memberGroups = await Group.find({
      // both expressions need to be satisfied
      $and: [
        // owner not equal ($ne) to user.id
        { owner: { $ne: req.user.id } },
        // members equal ($eq) to user.id, same as { members: req.user.id },
        { members: { $eq: req.user.id } },
      ],
    }).lean()

    res.render('groups.ejs', { active, ownedGroups, memberGroups })
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
