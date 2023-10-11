import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
    name : {
        type : String , 
        require : true 
    } ,
} , 
{
    timestamps : true 
})

const Size = mongoose.models.Size || mongoose.model('Size' , sizeSchema)

export default Size