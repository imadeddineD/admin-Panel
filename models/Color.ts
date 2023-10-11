import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
    name : {
        type : String , 
        require : true 
    } ,
    value : {
        type : String , 
        require : true 
    } ,
} , 
{
    timestamps : true 
})

const Color = mongoose.models.Color || mongoose.model('Color' , colorSchema)

export default Color