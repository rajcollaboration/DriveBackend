const express = require("express") ;
const  Router = require("express");
let router = Router();
const multer  = require('multer');
const upload = multer({ dest: './public/data/uploads/'});
const usrcontroller = require('../constractor/addUser');
const uploadConstructor = require('../constractor/uploadFile');

router.post('/register',usrcontroller.addUser);
router.post('/login',usrcontroller.login);
router.post('/upload/:userid',upload.array('photos', 12),uploadConstructor.uploaddile);
router.get('/allfiles/:userid',uploadConstructor.allfiles);
router.get('/singlefile/:id',uploadConstructor.singlePost);
router.get('/deletefile/:filename',uploadConstructor.deletefile);
module.exports = router;
