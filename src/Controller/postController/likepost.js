function likePost() {
    return {
      async like(req, res) {
        try {
          const { postId } = req.body;
          const userId = req.user._id; 
  
          const post = await Post.findById(postId);
  
          if (!post) {
            return res.status(404).json({ message: "Post may be deleted" });
          }
  
          const likeExists = await like.findOne({ userId: userId, postId: postId });
          if (likeExists) {
            return res.status(201).json({ message: "You already liked this post" });
          }
  
          const likedata = new like({
            userId: userId,
            postId: postId,
          });
  
          await likedata.save();
  
          return res.status(200).json({ message: "You liked the post" });
        } catch (error) {
          return res.status(400).json({ message: error.message });
        }
      },
    };
  }
  
  module.exports = likePost;
  