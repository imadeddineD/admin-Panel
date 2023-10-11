import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    userName : {
        type : String , 
        require : true 
    } , 
    email : {
        type : String , 
        require : true ,
        unique : true 
    } , 
    password : {
        type : String , 
        require : true , 
        min : 6
    } , 
} , 
{
    timestamps : true 
})

const Admin = mongoose.models.Admin || mongoose.model('Admin' , adminSchema)

export default Admin