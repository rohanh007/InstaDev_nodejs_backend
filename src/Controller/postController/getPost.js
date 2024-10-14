const Post = require("../../Models/postmodel");
// this ap for explore 
function getpost(){
    return {
        async post(req,res){
            try {
                const allPosts = await Post.find()
                  .populate('author', 'fullname username').populate({path:'comments', select:'content',populate:{path:'author',select:'fullname'}})  
                  .exec();
            
                res.status(200).json(allPosts);
              } catch (err) {
                res.status(500).json({ error: 'Failed to retrieve posts' });
              }
        }
    }
}

module.exports=getpost;