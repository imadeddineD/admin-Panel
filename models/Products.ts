import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: [{
      url : {type: String,
        required: true,}
    }],
    category: {
      type:String ,
      require : true 
    },
    color: {
      type:String ,
      require : true 
    },
    size: {
      type:String ,
      require : true 
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

//If the User collection does not exist create a new one.
export default mongoose.models.Product || mongoose.model("Product", productSchema);