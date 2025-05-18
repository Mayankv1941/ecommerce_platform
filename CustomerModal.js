const mongoose = require('mongoose')
var customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        maxlength: 100,
        minlength: 5
    },
    mobile: {
        type: String,
        required: [true, "Mobile Number is required"],
        trim: true,
        maxlength: 10,
        minlength: 10
    },
    address: {
        type: Object,
        state: {
            type: String,
            required: [true, "State is required"],
            trim: true,
        },
        city: {
            type: String,
            required: [true, "City is required"],
            trim: true
        },
        pincode: {
            type: Number,
            required: [true, "Pincode is required"],
        }
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
        trim: true
    },
    role:{
        type: String,
        default:"customer"
    },
    status:{
        type: Number,
        default: 0
    },
    info: {
       type: String,
       default:Date()
    },
})
var customerModal = mongoose.model("Customer",customerSchema)
module.exports = customerModal

