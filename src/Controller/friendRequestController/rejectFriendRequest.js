const FriendRequest=require('../../Models/friendrequest');
function rejectFriendRequest(){
    return{
        async reject(res,req){
            try {
                const { requestId } = req.body;
            
                const friendRequest = await FriendRequest.findById(requestId);
            
                if (!friendRequest || friendRequest.status !== 'pending') {
                  return res.status(404).json({ message: 'Friend request not found or already handled' });
                }
            
                friendRequest.status = 'rejected';
                await friendRequest.save();
            
                return res.status(200).json({ message: 'Friend request rejected' });
              } catch (error) {
                return res.status(500).json({ message: 'Error rejecting friend request', error });
              }
        }
    }
}

module.exports=rejectFriendRequest;

