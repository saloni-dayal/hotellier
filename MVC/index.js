const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());
let cookieParser = require('cookie-parser')
app.use(cookieParser());
app.use(express.static("../"))
const routes= express.Router()
const cors=require("cors")
routes.use(cors())
app.use(cors())
const jwt = require('jsonwebtoken'); 
const dotenv=require('dotenv')
dotenv.config()
// app.use(express.static('routes'));
const userRoutes = require('./routes/users')

app.use('/users', userRoutes)

const queryRoutes = require('./routes/queries')

app.use('/queries', queryRoutes)

const serviceRoutes = require('./routes/services')

app.use('/services', serviceRoutes)

const placeRoutes = require('./routes/places')

app.use('/places', placeRoutes)

const projectRoutes = require('./routes/projects')

app.use('/projects', projectRoutes)

const hotelRoutes = require('./routes/hotels')

app.use('/hotels', hotelRoutes)

const vendorRoutes = require('./routes/vendors')

app.use('/vendors', vendorRoutes)

const imageRoutes = require('./routes/images')
// console.log(imageRoutes)
app.use('/images', imageRoutes)

const blogRoutes = require('./routes/blogs')

app.use('/blogs', blogRoutes)

const pageRoutes = require('./routes/pages')

app.use('/pages', pageRoutes)

const pracRoutes = require('./routes/practice')

app.use('/practice', pracRoutes)

const choosehotelRoutes = require('./routes/choosehotels')

app.use('/choosehotels', choosehotelRoutes)


// console.log("hotelRoutes")
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport');

app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());


// app.get('/', (req, res) => {
// 	res.send("<button><a href='/auth'>Login With Google</a></button>")
//});

// Auth
app.get('/auth', passport.authenticate('google', {
  scope:
    ['email', 'profile']
}));

// Auth Callback
app.get('/auth/callback',
  passport.authenticate('google', {
    successRedirect: '/auth/callback/success',
    failureRedirect: '/auth/callback/failure'
  }));

const googleModelCtrl = require("./models/imagemodel")
global.email="reddylikitha201@gmail.com"
app.get('/auth/callback/success', (req, res) => {
  
  if (!req.user)
    res.redirect('/auth/callback/failure');
  else {
    console.log(req.user)
    googleModelCtrl.imageModel.find({ email: req.user.email }).then((resp) => {
      global.email=req.user.email
      if (resp.length != 0) {
        console.log(resp)
      } else {
        let imageData = googleModelCtrl.imageModel({
          name: req.user.displayName,
          email: req.user.email,
          password: '',
          phno: '',
          img: req.user.picture,
        });


        imageData.save((err, result) => {
          if (err) {
            console.log("something went wrong")
          }
          else {
            console.log("image saved successfully")
          }
        })


      }
      let data = {
        time: Date(),
        email:req.user.email
    }
      const token = jwt.sign(data, "secret")
      res.cookie("jwttoken",token);
      res.redirect("http://127.0.0.1:3007/");
    })

    
  }

});

// failure
app.get('/auth/callback/failure', (req, res) => {
  res.send("Error");
})
app.listen(3007, () => {
  console.log("running on port number 3007")
})