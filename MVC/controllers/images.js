const imageModelCtrl = require('../models/imagemodel')

const express = require('express')
const { S3Client } = require('@aws-sdk/client-s3');

const dotenv = require('dotenv')
const path = require('path')
const multer = require('multer')
const multerS3 = require('multer-s3')

dotenv.config()
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
let cookieParser = require('cookie-parser')
app.use(cookieParser());
app.use(bodyParser.json())


let s3 = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: "your access id",
        secretAccessKey: "secret access key",
    },
    sslEnabled: false,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "hotelsbookings",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + path.parse(file.originalname).name + path.extname(file.originalname))
        }
    })
}).single("pic")




async function imageRegistrationController(req, res) {


    let imageData = imageModelCtrl.imageModel({
        name: req.body.fname,
        email: req.body.email,
        password: req.body.pwd,
        phno: req.body.phno,
        img: req.file.location,
    });
    imageModelCtrl.imageModel.find({ email: req.body.email }).then((resp) => {
        if (resp.length != 0) {
            res.send("1")
        }
        else {
            imageData.save((err, result) => {
                if (err) {
                    res.send("something went wrong")
                }
                else {
                    res.send("image saved succesfully")
                }
            })
        }
    })


}

async function imageDataFetching(req, res) {
    imageModelCtrl.imageModel.find({}, (err, docs) => {
        if (err) {
            res.send("Something went wrong!");
        }
        else {
            res.send(docs)
        }
    })

}

const jwtSecretKey = "secret"

async function imageLogin(req, res) {
    const email = req.body.mail
    const password = req.body.passwd
    console.log(req.body)
    imageModelCtrl.imageModel.find({ email: email, password: password }, (err, docs) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(docs[0]._id)
            if (docs.length == 1) {
                let data = {
                    time: Date(),
                    email:docs[0].email,
                    userId: docs[0]._id
                }

                const token = jwt.sign(data, jwtSecretKey)
                res.cookie("jwttoken",token);
                res.send(token);

            }
            else {

                res.send("Wrong Credentials")
            }
        }
    })

}
function imageValidate(req, res) {
    console.log(req.header)
    const token = req.header.authorization;
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
        res.send("Successfully Verified");
    }
    else {
        res.send("Not verified");
    }

}
function imageLogout(req,res){
    let data = {
        time: Date(),
        email:"1"
    }
    console.log(data)
    const token = jwt.sign(data, jwtSecretKey)
    res.cookie("jwttoken",token);
    // res.redirect("http://127.0.0.1:3007/")

}
module.exports = { imageRegistrationController,imageLogout, imageDataFetching, upload, imageLogin, imageValidate }
