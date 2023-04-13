const express = require("express")

const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const app= express();
const PORT = 3000;

// const userLogsModel= require('./models/userLogsModels')


const cors = require('cors');

app.use("/giftBoxImages" , express.static("giftBoxImages"))
app.use("/userImages" , express.static("userImages"))
app.use("/adminImages" , express.static("adminImages"))
app.use("/suggestionImages" , express.static("suggestionImages"))
app.use("/categoryImages" , express.static("categoryImages"))
app.use("/giftTypeImages" , express.static("giftTypeImages"))
app.use("/sendGiftImages" , express.static("sendGiftImages"))
app.use("/cardHeaderImages" , express.static("cardHeaderImages"))







app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

require('dotenv').config()


//connect to db
mongoose.connect(
    process.env.DB_CONNECTION, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => console.log("Connected to DB")
);

//middleware
app.use(express.json());



//routes

app.use("/user" , require("./routes/userRoute"))
app.use("/admin" , require("./routes/adminRoute"))
app.use("/forgetPassword" , require("./routes/userForgetRoute"))
app.use("/privacyPolicy" , require("./routes/privacyPolicyRoute"))
app.use("/category" , require("./routes/categoryRoute"))
app.use("/faq" , require("./routes/faqRoute"))
app.use("/terms_conditions" , require("./routes/term&conditionRoute"))
app.use("/giftBox" , require("./routes/giftBoxRoute"))
app.use("/subscription" , require("./routes/subscriptionRoute"))
app.use("/sendAndReceiveGift" , require("./routes/receivedGiftRoute"))
app.use("/giftType" , require("./routes/giftTypeRoute"))
app.use("/comments" , require("./routes/commentsRoute"))
app.use("/subscriptionHistory" , require("./routes/subscriptionHistoryRoute"))
// app.use("/aboutUs" , require("./routes/aboutUsRoute"))
app.use("/imageSuggestions" , require("./routes/imageSuggestionRoute"))
app.use("/notification" , require("./routes/notificationRoute"))
app.use("/card_header" , require("./routes/card_headerImagesRoute"))







// app.post("/user/logout",(req,res)=>
// {
//   const userId= req.body.userId;
  
//   const userLog= new userLogsModel({
//     _id:mongoose.Types.ObjectId(),
//     user_id:userId,
//     ip:req.body.ip,
//     country:req.body.country,
//     logType:"logout"
//   })

//   userLog.save(function(err,result){
//     if(result){
//       res.json({
//         message: "user Logout record maintained",
//         result:result,
//         message: "after calling this api delete user jwt token stored in cookies ,local storage from front end"
//       })
//     }
//     else{
//       console.log("Error in saving logs")
//     }
//   })

 
// })

// // const cloudinary = require("./utils/cloudinary")




const server= app.listen(3000, function () {
    console.log("server started on port 3000")
})


