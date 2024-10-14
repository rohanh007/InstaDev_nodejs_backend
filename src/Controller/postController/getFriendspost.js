const Post = require('../../Models/postmodel');
const User = require('../../Models/authmodel');

function getFriendPost(){
    return {
        async getfriendpost(req,res){
            try {
              const currentUserId = req.user._id; // Assuming middleware provides authenticated user ID
          
              const currentUser = await User.findById(currentUserId).populate('friends');
          
              const friendIds = currentUser.friends.map(friend => friend._id);
          
              const friendPosts = await Post.find({ author: { $in: friendIds } })
                .populate('author', 'fullname username')  
                .populate({
                  path: 'comments', 
                  select:'content',                      
                  populate: {                             
                    path: 'author',                       
                    select: 'fullname username'
                  }
                })
                .exec();
          
              res.status(200).json(friendPosts);
            } catch (err) {
              res.status(500).json({ error: 'Failed to retrieve posts with comments' });
            }
        }
    }
}

module.exports=getFriendPost;
