const express = require('express');
const router = express.Router()
const IndexController = require('../controllers/IndexController')

router.get("/",(req,res)=>{
    res.send("Hello World")
})
router.post("/register",IndexController.register)
router.post("/login",IndexController.login)
router.get("/productlist",IndexController.productlist)
router.post("/searchproduct",IndexController.searchproduct)
router.post('/senduserpasswordresetemail',IndexController.senduserpasswordresetemail)
router.post('/userpasswordreset',IndexController.userpasswordreset)
router.get("/singleproduct",IndexController.singleproduct)

module.exports = router