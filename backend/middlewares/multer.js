const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + "--" + Math.random() + "--" + file.originalname);
    }
})

const upload = multer({ storage: fileStorageEngine, limits: { fileSize: 100000000 } }).single('aadhaar')
module.exports = { upload }