const User = require("../../Models/authmodel");
const commentmodal=require("../../Models/commentmodel");
const Post = require("../../Models/postmodel");

function createcomment(){
    return {
        async comment(req,res){
            try{

                const {post,content,author}=req.body;
                
                
                const authorexits= await User.findOne({_id:author});
                const postexits=await Post.findById(post);
                // console.log(postexits);
    
                if(!authorexits){
                  return res.status(400).json({message:"Need to login"});
                }
                if(!postexits){
                    return res.status(400).json({message:"post deleted"})
                }
              const newcomment=await commentmodal.create({post:post,content,author});
            //    console.log(newcomment._id);
            //    console.log(postexits);
               postexits.comments.push(newcomment._id);
              await postexits.save();
    
              return res.status(201).json(newcomment);
            }catch(error){
               return  res.status(400).json({error:error.message});
            }

        }
    }
}

module.exports=createcomment;