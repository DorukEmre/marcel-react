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
    res.sendStatus(401)
  },
  createGroup: async (req, res) => {
    try {
      const foundUser = await User.findOne({ email: req.user })
      console.log('req.body.submitData', req.body.submitData)
      await Group.create({
        groupName: req.body.submitData,
        owner: foundUser.id,
        members: [foundUser.id],
      })

      // const group = await Group.find({
      //   groupName: req.body.submitData,
      // }).lean()
      // const string = encodeURIComponent(group[0].groupName)

      // res.redirect('/groups/?newgroup=' + string)

      const ownedGroups = await Group.find({
        owner: foundUser.id,
      }).lean()

      const memberGroups = await Group.find({
        $and: [
          { owner: { $ne: foundUser.id } },
          { members: { $eq: foundUser.id } },
        ],
      }).lean()

      console.log('ownedGroups, memberGroups', ownedGroups, memberGroups)
      res.json({ ownedGroups, memberGroups })
    } catch (err) {
      console.log(err)
    }
  },

  joinGroup: async (req, res) => {
    try {
      console.log('welcome to join group')
      const foundUser = await User.findOne({ email: req.user })

      const groupToJoin = await Group.findOne({
        groupName: req.body.submitData,
      }).lean()
      console.log('groupToJoin', groupToJoin)
      console.log('groupToJoin._id', groupToJoin._id)
      console.log('foundUser.id', foundUser.id)

      if (!groupToJoin)
        return res.status(400).json({ message: 'Please check the group code' })

      if (
        !groupToJoin.members.find((x) => x == foundUser.id) &&
        !groupToJoin.membersToApprove.find((x) => x == foundUser.id)
      ) {
        let pushGroup = await Group.findOneAndUpdate(
          { _id: groupToJoin._id },
          { $push: { membersToApprove: foundUser.id } },
        )
        console.log('pushGroup', pushGroup)
        console.log('Request to join sent to group admin')
        return res
          .status(201)
          .json({ message: 'Request to join sent to group admin' })
      } else {
        console.log('Already member or requested')
        return res.status(400).json({ message: 'Already member or requested' })
      }

      const ownedGroups = await Group.find({
        owner: foundUser.id,
      }).lean()

      const memberGroups = await Group.find({
        $and: [
          { owner: { $ne: foundUser.id } },
          { members: { $eq: foundUser.id } },
        ],
      }).lean()

      console.log('ownedGroups, memberGroups', ownedGroups, memberGroups)
      res.json({ ownedGroups, memberGroups })
    } catch (err) {
      console.log(err)
    }
  },
}
