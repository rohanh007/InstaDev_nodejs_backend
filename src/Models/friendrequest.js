const mongoose=require('mongoose');

const friendRequestSchema=mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum:['pending','rejected','accepted'],
        default:'pending'
    }
},{timestamps:true})

const friendrequest=mongoose.model('friendRequest',friendRequestSchema);

module.exports=friendrequest;