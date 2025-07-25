
import mongoose from "mongoose";
const userSchema = mongoose.Schema({

   
    username:{
        type:String,
        required:[true,"please enter username"]
    },
     email:{
        type:String,
        required:[true,"please enter your email"]
    },
     password:{
        type:String,
        required:[true,"please enter the password"]
    },
    
  avatar :{
        Type:String
    },   
},
{
    timestamps:true
}
)

export default mongoose.model("user",userSchema);