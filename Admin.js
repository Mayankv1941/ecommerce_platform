const express = require('express');
const router = express.Router()
const AdminController = require('../controllers/AdminController')
const multipleimgupload = require('../modals/multipleimgupload')

router.get("/customers",AdminController.customers)
router.get("/profilepics",AdminController.customers_profpic)
router.post("/addproduct",multipleimgupload.array("product_imageurl",12),AdminController.addproduct)
router.delete("/deleteproduct",AdminController.deleteproduct)
router.get("/managecustomer",AdminController.managecustomer)

module.exports = router