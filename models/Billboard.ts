import mongoose from "mongoose";

const billboardSchema = new mongoose.Schema({
    category : {
        type : String , 
        require : true 
    } , 
    image : {
        
        type: String,
        required: true,
    } , 
    label : {
        type : String , 
        require : true , 
        min : 6
    } , 
} , 
{
    timestamps : true 
})

const Billboard = mongoose.models.Billboard || mongoose.model('Billboard' , billboardSchema)

export default Billboard 