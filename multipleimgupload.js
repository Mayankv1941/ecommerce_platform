const multer = require('multer')
var storage_engine = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './productimages')
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "_" + file.originalname)
    }
})
// Create function to delete file
// const deleteFile = (file) => {
//     fs.unlink(file.path, (err) => {
//         if (err) {
//             console.error(err);
//             throw new Error("Failed to delete file");
//         }
//     });
// };

var multipleimgupload = multer({ storage: storage_engine })
module.exports = multipleimgupload
