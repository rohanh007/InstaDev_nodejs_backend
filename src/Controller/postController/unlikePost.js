const Like=require('../../Models/likeSchema');
const Post=require('../../Models/postmodel');
const User=require('../../Models/authmodel');
function unlikePost(){
    return{
        async unlike(req,res){
            try {
                const { userId, postId } = req.body; 

                const post = await Post.findById(postId);
                const user = await User.findById(userId);

                if (!post) {
                    return res.status(404).json({ message: "Post may be deleted" });
                }
                if (!user) {
                    return res.status(400).json({ message: "Need to login" });
                }

                const likeExists = await Like.findOne({ userId: userId, postId: postId });
                if (!likeExists) {
                    return res.status(400).json({ message: "You have not liked this post yet" });
                }

                await Like.deleteOne({ userId: userId, postId: postId });
                
                return res.status(200).json({ message: "You unliked the post" });

            } catch (error) {
                return res.status(400).json({ message: error.message });
            }
        }
    }
}
module.exports=unlikePost;