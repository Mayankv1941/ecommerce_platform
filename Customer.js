const express = require('express');
const router = express.Router()
const imgUpload = require('../modals/ImgUpload')
const CustomerController = require('../controllers/CustomerController')

const authMiddleware = require('../middleware/auth-middleware')

//middleware
router.use('/editprofile',authMiddleware)




router.post('/uploaddocument',imgUpload.single("upload_doc"),CustomerController.uploadDocument)
router.get('/record',CustomerController.customerRecord)
router.get('/profilepic',CustomerController.profilePic)
router.put('/increquantity',CustomerController.increQuantity)
router.put('/decrequantity',CustomerController.decreQuantity)
//routing
router.put('/editprofile', CustomerController.editProfile)
router.put('/changepassword',CustomerController.changePassword)

module.exports = router