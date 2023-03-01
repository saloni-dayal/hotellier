const express =require('express')
const app = express();
const routes= express.Router()
const cors=require("cors")
routes.use(cors())
app.use(cors())

const choosehotelDetail = require('../controllers/choosehotels')

routes.post('/reg', choosehotelDetail.choosehotelRegistrationController)
routes.get('/reg', choosehotelDetail.choosehotelDataFetching)
// routes.post('/updates',hotelDetail.hotelDataUpdating)
// routes.post('/updatesreg',hotelDetail.hotelDataUpdatingreg)

module.exports = routes