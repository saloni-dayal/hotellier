const choosehotelModelCtrl=require('../models/choosehotelmodel')

async function choosehotelRegistrationController(req,res){
    console.log(req.body)
    let choosehotelData=choosehotelModelCtrl.choosehotelModel({
        name:req.body.name,
        location:req.body.location,
        img:req.body.img,
        rooms:req.body.rooms,
        stars:req.body.stars,
        months:req.body.months,
        amenities:req.body.amenities,
        gps:req.body.gps,
        about:req.body.about,
        questions:req.body.questions,
        reviews:req.body.reviews
    });
    choosehotelData.save((err,result)=>{
        if(err){
            res.send("Error")
        }
        else{
            res.send("hotel sent Successfully")
        }
    })
}

async function choosehotelDataFetching(req,res){
    choosehotelModelCtrl.choosehotelModel.find({},(err,docs)=>{
        if(err){
            res.send("Something went wrong!");
        }
        else{
            res.send(docs)
        }
    })

}

module.exports={ choosehotelRegistrationController , choosehotelDataFetching }