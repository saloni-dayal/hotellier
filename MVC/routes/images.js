const express =require('express')
const app = express();
const routes= express.Router()
const cors=require("cors")
routes.use(cors())
app.use(cors())
const multer=require('multer')

const imageDetail = require('../controllers/images')

routes.post('/reg',imageDetail.upload ,imageDetail.imageRegistrationController)
routes.get('/reg', imageDetail.imageDataFetching)
routes.post('/login',imageDetail.imageLogin)
routes.get('/validate',imageDetail.imageValidate)
routes.post('/logout',imageDetail.imageLogout)

module.exports = routes