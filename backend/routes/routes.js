const express = require('express')
const passport = require('../config/passport')
const userController = require('../controllers/userController')
const houseController = require('../controllers/houseController')
const router =express.Router()


router.route('/users')
.get(userController.getUser)
.post(userController.validateUser, userController.uploadUser)

router.route('/users/:id')
.delete(userController.deleteUser)

router.route('/userById')
.get(passport.authenticate('jwt', {session: false}), userController.getUserById)
.put(userController.modifyUser)

router.route('/login')
.post(userController.logUser)

router.route('/getUser')
.post(userController.getUsersExist)

router.route('/validateToken')
.get(passport.authenticate('jwt', {session: false}), userController.validateToken)

router.route('/houses')
.get(houseController.getHouse)
.post(/* passport.authenticate('jwt', {session: false}), */ houseController.uploadHouse)


router.route('/house/:id')
.get(houseController.getHouseById)
.put(houseController.modifyHouse)
.delete(houseController.deleteHouse)

module.exports = router