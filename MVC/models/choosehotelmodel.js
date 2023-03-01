const db=require('./conn').db
const mongoose=require('./conn').mongoose

const choosehotelSchema=mongoose.Schema({

    name:{
        type:String
    },
    location:{
        type:String
    },
    img:{
        type:String
    },
    rooms:[
        {
            types:{type:String},
            number:{type:Number},
            cost:{type:Number},
            image:{type:String},
            people:{type:Number}
        }
    ],
    stars:
    {
        type:String
    },
    months:{
        type:[Number]
    },
    amenities:{
        type:[String]
    },
    gps:{
        type:String
    },
    about:{
        type:String
    },
    question:{
        type:Array,"default":[]
    },
    reviews:{
        type:Array,"default":[]
    }
})

let choosehotelModel=mongoose.model('choosehotels',choosehotelSchema)
module.exports={choosehotelModel}