const User =require("../models/user")

const {v4:uuidv4} =require("uuid");
const {setUser}= require("../service/auth")


async function handleUserSignup(req,res){
    const {name,email,password}=req.body;

    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}


async function handleUserLogin(req,res){
    const {email,password}=req.body;

 const user = await User.findOne({email, password});
 if(!user) 
    return res.render("login",{
     error:"Invaild Username or Password",
} )
  const sessionId = uuidv4();
  setUser(sessionId,user);
  res.cookie("uid", sessionId, {
    httpOnly: true,        // prevents client-side JS access
    sameSite: "Lax",       // or "None" if cross-site
    secure: false          // true if using HTTPS
});


    return res.redirect("/");
}

module.exports = {
             handleUserSignup,
             handleUserLogin,
}