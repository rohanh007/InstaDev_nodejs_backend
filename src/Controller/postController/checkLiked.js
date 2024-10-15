const Liked=require('../../Models/likeSchema')
function checkLiked() {
    return {
        async isLiked(req, res) {
            const { postId } = req.params;
            // const pid=postId.replace(':','').trim();
            // console.log(pid);
            const userId = req.user.id;
            console.log(postId);
            try {
                const islike=await Liked.findOne({userId:userId ,postId:postId});
                
                // if(!islike){
                //     return res.status(200).json({liked:false});
                // }
                // console.log(isli);

                return res.status(200).json({ islike });
                
            } catch (error) {
                return res.status(400).json({ message: error.message });
            }
        }
    };
}

module.exports = checkLiked;
