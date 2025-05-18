const CustomerModal = require('../modals/CustomerModal')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const ProductModal = require('../modals/ProductModal')
const dotenv = require('dotenv');
dotenv.config({ path: "./config/config.env" })
const transporter = require('../modals/EmailConfig')

const register = async (req, res) => {

    try {
        console.log(req.body)
        //Destructuring
        const { name, email, password, mobile, state, city, pincode, gender } = req.body

        var isExist = await CustomerModal.findOne({ email })
        if (isExist) {
            return res.status(400).json({
                status: false,
                "msg": "Email Already Exists"
            })
        }

        //logic for creating hash password
        var hashpassword = await bcrypt.hash(password, 10)
        console.log(hashpassword)

        var customer = new CustomerModal({
            name,
            email,
            "password": hashpassword,
            mobile,
            "address": {
                state,
                city,
                pincode
            },
            gender
        })

        console.log("Customer Object:", customer)
        await customer.save()
        return res.status(200).json({
            status: true,
            "record": customer,
            "msg": "Customer Register Successfully"
        })
    }
    catch (error) {
        return res.status(400).json({
            status: false,
            "error": error,
            "msg": "Customer Not Register"
        })
    }
}

const login = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    try {
        var customer = await CustomerModal.findOne({ email })
        console.log(customer)
        if (customer != null) {
            var isMatch = await bcrypt.compare(password, customer.password)
            console.log(isMatch)
            if (customer.email === email && isMatch) {
                const token = jwt.sign({ customer_id: customer._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                return res.status(200).json({
                    status: true,
                    record: customer,
                    msg: "Login Successfully",
                    token: token
                })
            } else {
                return res.status(400).json({
                    status: false,
                    "msg": "Email or Password is inValid",
                })
            }
        } else {
            return res.status(400).json({
                status: false,
                "msg": "Email Not Registered, Please register your email",
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            error: error,
        })
    }
}

const productlist = async (req, res) => {
    try {
        var prodlist = await ProductModal.find()
        return res.status(200).json({
            status: true,
            productlist: prodlist
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            error: error
        })
    }

}

const searchproduct = async (req, res) => {
    const { product_name } = req.body
    console.log(product_name)
    try {
        const products = await ProductModal.find({
            $or: [
                { 'product_brand': product_name },
                { 'product_category': product_name }, { 'product_variant_name': product_name }
            ]
        })
        console.log(products)
        return res.status(200).json({
            status: true,
            searchproduct: products
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            error: error
        })
    }

}

const senduserpasswordresetemail = async (req, res) => {
    console.log("senduserpasswordresetemail")
    const { email } = req.body
    try {
        if (email) {
            var customer = await CustomerModal.findOne({ email })
            console.log(customer)
            if (customer) {
                const secret = customer._id + process.env.JWT_SECRET_KEY
                const token = jwt.sign({ customer_id: customer._id }, secret, { expiresIn: '4d' })
                const link = `http://localhost:3000/forgotpassword`
                console.log("Link:====>", link)

                var mailOptions = {
                    from: process.env.EMAIL_USER, // sender address
                    to: customer.email, // list of receivers
                    subject: "Reset Password", // Subject line
                    text: "Link for Password Reset", // plain text body
                    html: "<h3>Hii " + customer.name + ",Please copy this link <a href=" + link + "> and reset your password</a></h3>"
                }
                let info = await transporter.sendMail(mailOptions)
                return res.status(200).json({
                    success: true,
                    msg: "Password Reset Email Send...Please Check Your Email",
                    "Info": info,
                    id: customer._id,
                    token: token
                })
            } else {
                return res.status(400).json({
                    success: false,
                    msg: "Email does not exists.",
                })
            }
        } else {
            return res.status(400).json({
                success: false,
                msg: "Email Fields are required",
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            msg: "Please enter valid Email Id!!"
        })
    }
}

const userpasswordreset = async (req, res) => {
    console.log("userpasswordreset")
    const { password, confirm_password } = req.body
    const { id, token } = req.query
    console.log(password, confirm_password)
    console.log(id, token)

    try {
        const customer = await CustomerModal.findById({ _id: id })
        const new_secret = customer._id + process.env.JWT_SECRET_KEY
        const { customer_id } = jwt.verify(token, new_secret)
        console.log(customer_id)
        if (password && confirm_password) {
            if (password !== confirm_password) {
                return res.status(400).json({
                    success: false,
                    msg: "New Password and Confirm Password doesn't match",
                })
            } else {
                const newHashPassword = await bcrypt.hash(password, 10)
                console.log(customer._id)
                const data = await CustomerModal.findByIdAndUpdate({ _id: customer._id },
                    {
                        $set:
                            { 
                                password: newHashPassword 
                            }
                    },
                    {
                        new: true,
                        useFindAndModify: false
                    })
                return res.status(200).json({
                    success: true,
                    msg: "Password reset successfully",
                    record: data
                })
            }
        } else {
            return res.status(400).json({
                success: false,
                msg: "All Fields required",
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: "Password not reset!",
            err:error
        })
    }

}
const singleproduct =  async(req,res) =>{
    const { _id } = req.query

    try {
        var prod = await ProductModal.findById({_id})
        return res.status(200).json({
            status: true,
            product: prod
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            error: error
        })
    }
}
module.exports = {
    register,
    login,
    productlist,
    searchproduct,
    senduserpasswordresetemail,
    userpasswordreset,
    singleproduct
}