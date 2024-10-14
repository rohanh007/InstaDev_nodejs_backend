const User=require('../../Models/authmodel');
const friendrequest = require('../../Models/friendrequest');
function sendFriendRequest(){
    return {
        async send(req,res){
              try{
                const {senderId,receiverId}=req.body;
                const sender=await User.findById(senderId);
                const receiver=await User.findById(receiverId);
                console.log(sender);
                console.log(receiver);
                if(!sender || !receiver){
                    return res.status(404).json({message:"User not found "});
                }

                const existrequest=await friendrequest.findOne({sender:sender ,receive:receiver ,status:"pending"});
                console.log(existrequest);
                if(existrequest){
                    return res.status(400).json({message:"Already Friends "})
                }

                const friendRequest=new friendrequest({
                    sender:senderId,
                    receiver:receiverId,
                    status:"pending"
                })

                await friendRequest.save();
                return res.status(200).json({message:"Friend Request Send Successfully "})

              }catch(error){
                    return res.status(400).json({message:error.message})
              }
        }
    }
}


module.exports=sendFriendRequest;