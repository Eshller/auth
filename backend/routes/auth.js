const express = require('express');
const router = express.Router();
const { register, login, docup } = require('../controllers/authController');
const {upload} = require('../middlewares/multer')
// Register user
router.post('/register', register);

// Login user
router.post('/login', login);
// document upload
router.post('/docup',(req,res)=>{
    upload(req, res, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: err });
         }
        if (!req.file) {
           return res.status(400).json({ error: 'Please send file' });
         }
         console.log(req.file);
         res.send('File uploaded!  '+res.req.file.filename);
     });
   
}


,docup);
module.exports = router;
