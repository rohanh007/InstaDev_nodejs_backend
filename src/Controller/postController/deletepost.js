const Post = require('../../Models/postmodel'); 
const Comment = require('../../Models/commentmodel'); 

function deletePost() {
  return {
    async remove(req, res) {
      try {
        const { postId } = req.params;  
        const post = await Post.findById(postId);

        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }

        await Comment.deleteMany({ post: postId });

        await post.remove();

        return res.status(200).json({ message: 'Post deleted successfully' });

      } catch (error) { 
        return res.status(500).json({ error: error.message });
      }
    }
  };
}

module.exports = deletePost;
