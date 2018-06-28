const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const path = require('path');

var users = require('../models/users');

const salt = 10;

module.exports = {
    userSignup: (req, res) => {

        users.find({ email: req.body.email })
            .exec((err, result) => {
                if(err){
                    res.status(400).send(err);
                }
                else if(result != ''){
                    console.log(result);
                    console.log(req.body);
                    
                    
                    res.status(400).json({ message:  'email already exists! Please try another'})
                }
                else{
                    var user = new users();
        
                    user.fname = req.body.fname;
                    user.lname = req.body.lname;
                    user.email = req.body.email;
                    user.phone = req.body.phone;
                    user.address = req.body.address;
                    bcrypt.hash(req.body.pwd, salt, function(err, hash) {
                        if(err){
                            res.status(400).json({ message: 'Error!! Could not store information' })
                        }
                        else{
                            user.password = hash
                            user.save((err, result) => {
                                if(err){
                                    res.status(500).send(err);
                                }
                                else{
                                    res.status(200).json({ result: result, message: 'Successfully signed up!!!'});
                                }
                            })
                        }
                    });

                    
                }
            })   
    },
    updateDp: (req, res) => {
        // Set The Storage Engine
        var storage = multer.diskStorage({
            
            destination: './public/uploads/' + req.params.userId,
            // destination: function(req, file, cb){
            //     let id = req.params.userId;
            //     cb(null, './public/uploads/' + id);
            // },
            filename: function(req, file, cb){
                cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
            }
        });
        
        // Init Upload
        var upload = multer({
            storage: storage,
            limits:{fileSize: 1000000},
            fileFilter: function(req, file, cb){
                checkFileType(file, cb);
            }
        }).single('myFile');

        //check file type
        function checkFileType(file, cb){
            // Allowed ext
            var filetypes = /jpeg|jpg|png|gif/;
            // Check ext
            var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
            // Check mime
            var mimetype = filetypes.test(file.mimetype);
        
            if(mimetype && extname){
            return cb(null,true);
            } else {
            cb('Error: Images Only!');
            }
        }
        upload(req, res, (err) => {
            if(err){
                res.status(400).send(err);
            } 
            else {
                if(req.file == undefined){
                    res.status(400).json({ message: 'Error: No File Selected!'});
                } 
                else {
                    res.status(200).json({ message: 'File Uploaded!' });
                }
            }
        }); 
    },
    login: (req, res) => {
        passport.authenticate('local', function(err, user, info){
            var token;
            if (err) {
              res.status(404).json(err);
              return;
            }
            if(user){
              token = user.generateJwt();
              res.status(200).json({ "token" : token });
            } 
            else{
              res.status(401).json(info);
            }
        })(req, res);
    }
    // bcrypt.compare(myPlaintextPassword, hash, function(err, res) {  // to compare password
    //     // res == true
    // });
} 