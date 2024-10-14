const User = require('../../Models/authmodel');
const post=require('../../Models/postmodel');


function createpost(){
    return {
        async post(req,res)
        {
         try{

             const {title ,content, location, author}=req.body;

             const authorexits=await User.findOne({_id:author});
            //  console.log(authorexits);
             if(!authorexits){
                 return res.status(400).json({message:"User is not exist"});
             }
             const newpost=await post.create({title,author,location,content});
 
             return res.status(201).json(newpost);
         }catch(error){
            return res.status(400).json({message:"Error occurs",error})
         }

        }
    }
}


module.exports=createpost;