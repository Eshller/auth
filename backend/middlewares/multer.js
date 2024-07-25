const multer = require('multer');
const path = require('path');
//destination and file name type 
//TODO: to be changed in production
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + "--" + Math.random() + "--" + file.originalname);
    }
})

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images only! (jpeg, jpg, png, pdf)');
    }
}

const upload = multer({
    storage: fileStorageEngine,
    limits: { fileSize: 100000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('aadhaar')
module.exports = { upload }