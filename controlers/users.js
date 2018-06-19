const mongoose = require('mongoose');
const multer = require('multer');

var users = require('../models/users');

module.exports = {
    userSignup: (req, res) => {
        var user = new users();
        // Set The Storage Engine
        const storage = multer.diskStorage({
            destination: './public/uploads/',
            filename: function(req, file, cb){
            cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
            }
        });
        
        // Init Upload
        const upload = multer({
            storage: storage,
            limits:{fileSize: 1000000},
            fileFilter: function(req, file, cb){
            checkFileType(file, cb);
            }
        }).single('myImage');
        
        // Check File Type
        // function checkFileType(file, cb){
        //     // Allowed ext
        //     const filetypes = /jpeg|jpg|png|gif/;
        //     // Check ext
        //     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        //     // Check mime
        //     const mimetype = filetypes.test(file.mimetype);
        
        //     if(mimetype && extname){
        //     return cb(null,true);
        //     } else {
        //     cb('Error: Images Only!');
        //     }
        // }
        // if(req.body.dp){
        //     upload(req, res, (err) => {
        //         if(err){
        //           res.send(err);
        //         } else {
        //           if(req.file == undefined){
        //             res.send('Error: No File Selected!');
        //           } else {
        //             // res.render('index', {
        //             //     msg: 'File Uploaded!',
        //             //     file: `uploads/${req.file.filename}`
        //             //   });
        //             res.send('File Uploaded!');
        //           }
        //         }
        //     });
        // }
        user.fname = req.body.fname;
        user.lname = req.body.lname;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.address = req.body.address;
        console.log(user);
        console.log(req.body);
        
        
        res.status(200).send(user);
        // user.save((err, result) => {
        //     if(err){
        //         res.status(500).send(err);
        //     }
        //     else{
        //         res.status(200).send(result);
        //     }
        // })

    }
} 