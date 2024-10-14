const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    createdAt: { type: Date, default: Date.now }
});

const Like = mongoose.model('Like', LikeSchema);
module.exports = Like;
