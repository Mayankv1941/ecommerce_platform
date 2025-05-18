const documentModal = require('../modals/DocumentModal')
const customerModal = require('../modals/CustomerModal')
const ProductModal = require('../modals/ProductModal')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv');
dotenv.config({ path: "./config/config.env" })

const uploadDocument = async (req, res) => {
    const { customer_id } = req.body

    const upload_doc = req.file.path
    console.log(upload_doc)
    console.log(customer_id)
    try {
        const uploaddata = new documentModal({
            upload_doc: `http://localhost:${process.env.PORTNO}/` + upload_doc,
            customer_id: customer_id
        })
        const data = await uploaddata.save()
        return res.status(200).json({
            success: true,
            post: data
        })
    } catch (error) {
        return res.status(200).json({
            success: false,
            msg: "Image Not Uploaded!!"
        })
    }
}

const customerRecord = async (req, res) => {
    const { customer_id } = req.query
    console.log(customer_id)
    try {
        var record = await customerModal.findOne({ _id: customer_id })
        return res.status(200).json({
            success: true,
            customer_record: record
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            error: error,
            msg: "Customer Record Not Found"
        })
    }
}

const profilePic = async (req, res) => {
    const { customer_id } = req.query
    console.log(customer_id)
    try {
        var profilepic = await documentModal.findOne({ customer_id })
        return res.status(200).json({
            success: true,
            profilepic: profilepic
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            error: error,
            msg: "Customer Record Not Found"
        })
    }

}

const increQuantity = async (req, res) => {
    const { product_id } = req.query
    console.log(product_id)
    try {
        var prod = await ProductModal.findById({ _id: product_id })
        console.log(prod)

        var newprod = await ProductModal.findByIdAndUpdate({
            _id: product_id
        }, {
            $set: {
                product_quantity: prod.product_quantity + 1
            }
        },
            {
                new: true,
                useFindAndModify: false
            }
        )
        return res.status(200).json({
            status: true,
            updateprod: newprod
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            msg: "Quantity not Updated",
            error: error
        })
    }

}
const decreQuantity = async (req, res) => {
    const { product_id } = req.query
    console.log(product_id)
    try {
        var prod = await ProductModal.findById({ _id: product_id })
        console.log(prod)

        var newprod = await ProductModal.findByIdAndUpdate({
            _id: product_id
        }, {
            $set: {
                product_quantity: prod.product_quantity - 1
            }
        },
            {
                new: true,
                useFindAndModify: false
            }
        )
        return res.status(200).json({
            status: true,
            updateprod: newprod
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            msg: "Quantity not Updated",
            error: error
        })
    }

}

const editProfile = async (req, res) => {
    const { customer_id } = req.query
    console.log(customer_id)
    const { name, mobile, state, city, pincode, gender } = req.body

    try {
        await customerModal.findByIdAndUpdate({
            _id: customer_id
        }, {
            $set: {
                name,
                mobile,
                address: {
                    state,
                    city,
                    pincode
                },
                gender
            }
        },
            {
                new: true,
                newFindAndModify: false
            }
        )
        return res.status(200).json({
            status: true,
            msg: "Customer Record Updated Successfully!!"
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            msg: "Customer Record Not Updated!!"
        })
    }
}

const changePassword = async (req, res) => {
    const { id } = req.query
    const { oldPass, newPass, conPass } = req.body
    console.log(id, oldPass, newPass, conPass)
    try {
        const customer = await customerModal.findById({ _id: id })
        console.log(customer)
        const oldHashPass = customer.password
        console.log(oldHashPass)
        const checkPass = await bcrypt.compare(oldPass, oldHashPass)
        console.log(checkPass)

        if (oldPass && newPass && conPass) {
            if (checkPass) {
                if (newPass && conPass) {
                    if (newPass === conPass) {
                        const newHashPass = await bcrypt.hash(newPass, 10)
                        const updatedCustomer = await customerModal.findByIdAndUpdate(
                            {
                                _id: customer._id
                            },
                            {
                                $set: {
                                    password: newHashPass
                                }
                            },
                            {
                                new: true,
                                useFindAndModify: false
                            }
                        )
                        console.log(updatedCustomer)
                        console.log("Password changed successfully")
                        return res.status(200).json({
                            status: true,
                            msg: "Password changed successfully",
                            record: customer
                        })
                    } else {
                        return res.status(400).json({
                            status: false,
                            msg: "New password or confirm password doesn't match",
                        })
                    }
                } else {
                    return res.status(400).json({
                        status: false,
                        msg: "All fields are required",
                    })
                }
            } else {
                return res.status(400).json({
                    status: false,
                    msg: "Old password doesn't match",
                })
            }
        } else {
            return res.status(400).json({
                status: false,
                msg: "All fields are required",
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            msg: "Something went wrong",
            error: error
        })
    }
}



module.exports = {
    uploadDocument,
    customerRecord,
    profilePic,
    increQuantity,
    decreQuantity,
    editProfile,
    changePassword
}