const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');  //firstParameter is error, second is destination folder
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname);    //first is error, second is fileName stored in server
    }
});

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(png|jpeg|jpg|gif)$/)){
        return cb(new Error('You can upload only image files!', false));    //secondParameter is set to false
    }
    cb(null, true);
};

const upload = multer({storage: storage, fileFilter: imageFileFilter});

const uploadRouter = express.Router();
uploadRouter.use(bodyParser.json());

uploadRouter.route('/') 
.get(authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /imageUpload');
})
.post(authenticate.verifyUser,authenticate.verifyAdmin, upload.single('imageFile'),(req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    // req.file object from the server back to client
    // will contain the path to file in there
    // that path can be used by client to configure any place where it needs to know location of image file
    res.json(req.file);
})
.put(authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /imageUpload');
})
.delete(authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /imageUpload');
});

module.exports = uploadRouter;