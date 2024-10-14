const Post = require("../../Models/postmodel");

function getcomment(){
    return {
        async comment(req,res){
            try{
                const {postid}=req.params;
                const post=await Post.findById(postid)
                .populate({
                    path:'comments',
                    populate:{path:'author',select:'name'}
                }).exec();
                console.log(post); 
                res.status(201).json({message:"Commets are ready"})
            }catch(error){
                res.status(400).json({error:error.message});
            }
        }
    }
}

module.exports=getcomment;