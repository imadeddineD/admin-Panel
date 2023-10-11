import mongoose from "mongoose";

const catSchema = new mongoose.Schema({
    name : {
        type : String , 
        require : true 
    } ,
} , 
{
    timestamps : true 
})

const Category = mongoose.models.Category || mongoose.model('Category' , catSchema)

export default Category