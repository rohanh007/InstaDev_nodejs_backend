const User=require('../../Models/authmodel');
const bcrypt = require('bcrypt');
function Signincontroller(){
    return {
      async Create(req,res){

        try{
            const {password , ...otherdetails} = req.body;
            const saltpoint=10;

            const hashpassword=await bcrypt.hash(password ,saltpoint);


            console.log(req.body);
            const newuser=new User({
              ...otherdetails ,
              password:hashpassword
            });
            
            await newuser.save();
            return res.status(201).json({message:'Data store successfully'});      
        }catch(error){
              return res.status(501).json({message:error.message});
        }
      }
    }

}

module.exports=Signincontroller;
