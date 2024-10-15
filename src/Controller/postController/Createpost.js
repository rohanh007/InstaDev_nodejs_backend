const User = require('../../Models/authmodel');
const Post = require('../../Models/postmodel');

function createpost() {
  return {
    async post(req, res) {
      try {
        const { title, content, location } = req.body;
        const authorid = req.user.id; 
        const authorexists = await User.findOne({ _id: authorid });
        if (!authorexists) {
          return res.status(400).json({ message: "User does not exist" });
        }

        const newPost = await Post.create({
          title,
          content,
          location,
          author: authorid, 
        });

        return res.status(201).json(newPost); // Return the created post
      } catch (error) {
        return res.status(400).json({ message: "Error occurred", error });
      }
    }
  };
}

module.exports = createpost;
