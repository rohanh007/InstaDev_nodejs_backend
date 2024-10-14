const Post = require('../../Models/postmodel');

function updatePost() {
  return {
    async update(req, res) {
      try {
        const { postId } = req.params;  
        const { title, content, location } = req.body;  

      
        const post = await Post.findById(postId);

        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }

      
        if (title) post.title = title;
        if (content) post.content = content;
        // if (location) post.location = location;

        const updatedPost = await post.save();

    
        return res.status(200).json({
          message: 'Post updated successfully',
          post: updatedPost,
        });

      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
  };
}

module.exports = updatePost;
