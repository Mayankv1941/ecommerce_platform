const mongoose = require('mongoose')
const productSchema = mongoose.Schema({

    product_brand: {
        type: String,
        required: [true, "Product Brand is required"],
        trim: true
    },
    product_variant_name: {
        type: String,
        required: [true, "Product Variant Name is required"],
        trim: true
    },
    product_description: {
        type: String,
        required: [true, "Product Description is required"],
        trim: true
    },
    product_category: {
        type: String,
        required: [true, "Product Category is required"],
        trim: true
    },
    product_max_retailprice: {
        type: Number,
        required: [true, "Product Maximum Retail Price  is required"],
    },
    product_sellingprice: {
        type: Number,
        required: [true, "Product Selling Price  is required"],
    },
    product_discount_percentage: {
        type: Number,
        required: [true, "Product Discount is required"]
    },
    product_size: {
        type: String,
        required: [true, "Product Size is required"],
        trim: true
    },
    product_quantity: {
        type: Number,
        required: [true, "Product Quantity is required"],
        default: 1
    },
    product_availability: {
        type: String,
        required: [true, "Product Availability is required"],
        trim:true
    },
    product_imageurl: {
        type: Array,
        required: [true, "Product Image URL is required"],
        default:
            [
                {
                    name: {
                        type: String,
                        required: [true, "originalname is required"],
                        trim: true,
                    },
                    mimetype: {
                        type: String,
                        required: [true, "mimetype is required"],
                        trim: true,
                    },
                    path: {
                        type: String,
                        required: [true, "path is required"],
                        trim: true,
                    },
                    size: {
                        type: Number,
                        required: [true, "size is required"],
                    }
                }
            ]
    },
})
const productmodal = mongoose.model("product", productSchema)
module.exports = productmodal
