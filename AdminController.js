const CustomerModal = require('../modals/CustomerModal')
const DocumentModal = require('../modals/DocumentModal')
const ProductModal = require('../modals/ProductModal')
const fs = require('fs')
const dotenv = require('dotenv');
dotenv.config({ path: "./config/config.env" })



const customers = async (req, res) => {
    try {
        var custlist = await CustomerModal.find()
        return res.status(200).json({
            success: true,
            customerlist: custlist
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            error: error,
        })
    }
}
const customers_profpic = async (req, res) => {
    try {
        var profpics = await DocumentModal.find()
        return res.status(200).json({
            success: true,
            profpics: profpics
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            error: error,
        })
    }
}
const addproduct = async (req, res) => {
    console.log(req.body)
    const { product_brand, product_category, product_variant_name, product_description, product_max_retailprice, product_sellingprice, product_discount_percentage, product_size, product_quantity, product_availability } = req.body
    const productimage = req.files
    console.log(productimage)

    var newprodimg = productimage.map((data) => {
        return {
            type: data.mimetype,
            name: data.filename,
            path: `http://localhost:${process.env.PORTNO}/` + data.path,
            size: data.size
        }
    })
    console.log("=======================================")
    console.log(newprodimg)

    try {
        var prodobj = new ProductModal({
            product_brand,
            product_category,
            product_variant_name,
            product_description,
            product_max_retailprice: parseFloat(product_max_retailprice),
            product_sellingprice: parseFloat(product_sellingprice),
            product_discount_percentage: parseInt(product_discount_percentage),
            product_size,
            product_quantity: parseInt(product_quantity),
            product_availability,
            product_imageurl: newprodimg
        }
        )
        console.log(prodobj)
        var uploadproduct = await prodobj.save()
        return res.status(200).json({
            success: true,
            products: uploadproduct
        })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            error: error
        })
    }
}

const deleteproduct = async (req, res) => {
    const { product_id } = req.query
    console.log(product_id)
    try {
        var data = await ProductModal.findByIdAndDelete({ _id: product_id })
        // console.log(data.product_imageurl[0])        
        // var name = data.product_imageurl[0].name
        // console.log(name)
        for (const obj of data.product_imageurl) {
             fs.unlink(`./productimages/${obj.name}`,(err)=>{
                if (err) {
                    console.log("File is not deleted:",err)
                } else {
                    console.log("File delete successfully")
                }
            });
        }
        return res.status(200).json({
            status: true,
            msg: "Product Deleted Successfully",
        })
    } catch (error) {
        return res.status(400).json({
            status: false,
            msg: "Product not Deleted",
            err: error
        })
    }

}

const managecustomer = async (req,res)=>{
    const { id, s } = req.query
    console.log("get id:===>", id,s)
    if (s == "block") {
        const result = await CustomerModal.findByIdAndUpdate({
            _id: id
        }, {
            $set: {
                status: 0
            }
        }, {
            new: true,
            useFindAndModify: false
        })
        res.status(200).json({
            success: true,
            msg: result,
        })
    }
    else if (s == "verify") {
        const result = await CustomerModal.findByIdAndUpdate({
            _id: id
        }, {
            $set: {
                status: 1
            }
        }, {
            new: true,
            useFindAndModify: false
        })
        res.status(200).json({
            success: true,
            msg: result,
        })
    }else{
        await CustomerModal.findByIdAndDelete({
            _id: id
        },{
            new: true,
            useFindAndModify: false
        })
        res.status(200).json({
            success: true,
            msg: "Record Delete Successfully!!",
        })
    }
}


module.exports = {
    customers,
    customers_profpic,
    addproduct,
    deleteproduct,
    managecustomer
}