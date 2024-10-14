const like=require('../../Models/likeSchema');
const User=require('../../Models/authmodel');
const Post=require('../../Models/postmodel');
function likePost(){
    return{
        async like(req,res){
            try{
                const {userId,postId}=req.body;

                const post=await Post.findById(postId);
                const user=await User.findById(userId);

                if(!post){
                    return res.status(404).json({message:"Post may be deleted"})
                }
                if(!user){
                    return res.status(400).json({message:"Need to login "});
                }
                const likeexits=await like.findOne({userId:userId, postId:postId});
                if(likeexits){
                    return res.status(201).json({message:"you liked photo already"})
                }

                const likedata= new like({
                    userId:userId,
                    postId:postId
                })

                likedata.save();
               
                return res.status(200).json({message:"you like post "})
             

            }catch(error){
                return res.status(400).json({message:error.message});
            }
        }
    }
}

module.exports=likePost;