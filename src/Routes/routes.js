const express = require('express');
const router = express.Router();

const logincontroller=require('../Controller/authController/LoginController');
const signcontroller=require('../Controller/authController/SignupController');
const createpost=require('../Controller/postController/Createpost');
const createcomment = require('../Controller/commentController/comment');
const getpost = require('../Controller/postController/getPost');
const getcomment = require('../Controller/commentController/getcomment');
const updatePost = require('../Controller/postController/updatepost');
const deletePost = require('../Controller/postController/deletepost');
const sendFriendRequest = require('../Controller/friendRequestController/sendFriendRequest');
const acceptFriendRequest = require('../Controller/friendRequestController/acceptFriendRequest');
const rejectFriendRequest = require('../Controller/friendRequestController/rejectFriendRequest');
const authjwt=require('../Middlewares/Authroutes')
const getFriendPost = require('../Controller/postController/getFriendspost');
const likePost = require('../Controller/postController/likepost');
const unlikePost = require('../Controller/postController/unlikePost');
const checkLiked=require('../Controller/postController/checkLiked');

// auth 
router.post('/api/loginauth',logincontroller().loginauth);
router.post('/api/signauth',signcontroller().Create);

// create 
router.post('/api/createpost',authjwt,createpost().post);
router.post('/api/comment',createcomment().comment);

// Get posts 
router.get('/api/friendspost', authjwt ,getFriendPost().getfriendpost)
router.get('/api/posts',getpost().post);
// router.get('/api/post/:postid/comments',getcomment().comment);

// Put 
router.put('/api/posts/:postId',updatePost().update);

// delete 
router.delete('/api/posts/:postId',deletePost().remove);


// Api's for friends

router.post('/api/friendrequest/send',sendFriendRequest().send);
router.post('/api/friendrequest/accept',acceptFriendRequest().accept);
router.post('/api/friendrequest/reject',rejectFriendRequest().reject);


//api on like post 

router.post('/api/like',authjwt,likePost().like);
router.get('/api/likestatus/:postId',authjwt,checkLiked().isLiked);
router.delete('/api/unlike',authjwt,unlikePost().unlike);

module.exports = router;  
