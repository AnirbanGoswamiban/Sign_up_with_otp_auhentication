const express=require("express")
const bodyparser=require("body-parser")
const app=express()
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static("public"))
const nodemailer=require("nodemailer")
let otp=""
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"your email id",
        pass:"your pass key "
    }
})

function genotp() {
    let a=Math.floor(Math.random()*9).toString()
    a=a+Math.floor(Math.random()*9)
    a=a+Math.floor(Math.random()*9)
    a=a+Math.floor(Math.random()*9)
    return a
 }


app.listen(3000,()=>{
    console.log("Listening at 3000");
})

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/pages/index.html")
})

app.post("/send",(req,res)=>{
    let mail_address=req.body.email
    console.log(mail_address);
      otp=genotp().toString()
      console.log(otp);
    let details={
        from:"your email id",
        to:mail_address,
        subject:"OTP",
        text:otp
    }
    transporter.sendMail(details,((err,info)=>{
        if(err){
            console.log(err);
        }else{
            console.log("sent"+info.response);
        }
    }))
    res.sendFile(__dirname+"/pages/verify.html")
})

app.post("/verify",(req,res)=>{
    let user_input_otp=req.body.otp.toString()
    console.log(user_input_otp);
    if(user_input_otp===otp){
       res.sendFile(__dirname+"/pages/home.html")
    }else{
       res.sendFile(__dirname+"/pages/verify")
    }
    
})