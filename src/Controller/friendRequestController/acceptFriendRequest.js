const friendrequest = require("../../Models/friendrequest");

function acceptFriendRequest() {
    return {
        async accept(req, res) {

            try {
                const { requestId } = req.body;
                const friendRequest = await friendrequest.findById(requestId).populate('sender receiver');

                if (!friendRequest || friendRequest.status !== 'pending') {
                    return res.status(404).json({ message: 'Friend request not found or already handled' });
                }

                friendRequest.status = 'accepted';
                await friendRequest.save();

                friendRequest.sender.friends.push(friendRequest.receiver._id);
                friendRequest.receiver.friends.push(friendRequest.sender._id);

                await friendRequest.sender.save();
                await friendRequest.receiver.save();

                return res.status(200).json({ message: 'Friend request accepted' });
            } catch (error) {
                return res.status(500).json({ message: 'Error accepting friend request', error });
            }



        }
    }
}

module.exports=acceptFriendRequest;
