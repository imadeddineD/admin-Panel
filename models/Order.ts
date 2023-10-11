import {model, models, Schema} from "mongoose";

const OrderSchema = new Schema({
  line_items:{
    type :Object , 
    required : true},
  name:{
    type :String , 
    required : true},
  email:{
    type :String , 
    required : true},
  city:{
    type :String , 
    required : true},
  postalCode:{
    type :String , 
    required : true},
  streetAddress:{
    type :String , 
    required : true},
  country:{
    type :String , 
    required : true},
  isPaid:{
    type :Boolean , 
    required : true},
}, {
  timestamps: true,
});

const Order = models?.Order || model('Order', OrderSchema);


export default Order