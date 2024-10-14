const User = require("../../Models/authmodel");
const bcrypt =require('bcrypt');
const jwt=require('jsonwebtoken');

function LoginController(){
    return {
        async loginauth(req,res){
               jwt_secret="1234"
             const {username ,password}=req.body;
            try{
                const user = await User.findOne({username});
                if(!user){
                    return res.status(400).json({message:"Invalid password and user name "})
                }
                const ismatch = await bcrypt.compare(password ,user.password);
                if(!ismatch){
                    return res.status(400).json({message:"Invalid password and username"});
                }

                const token =jwt.sign(
                    {id:user._id ,username:user.username} , //payload 
                    jwt_secret,
                    {expiresIn:'1h'}
                )
               
            return res.json({
                token ,
                user:{id:user._id, username:user.username}
            })
            }catch(error){
               return res.status(500).json({message:error.message});
            }
        }
    }
}


module.exports=LoginController;