import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/mongoDB";
import Products from "@/models/Products";

export const GET = async (req : NextRequest , {params} : any) => {
  try {
      const {id} = params
      await connectMongo()
      const product = await Products.findById(id)
      return new NextResponse(JSON.stringify(product) , {status : 200} )
  } catch (error) {
      return new NextResponse('database error' , {status : 500} )
  }
}

export const PUT = async (req : NextRequest, { params } : any) => {
    try {
      const { title, description, price , image , color , size } = await req.json(); // Use req.body to access request data
      const { id } = params;
      await connectMongo();
  
      // Update the product and get the updated document
      const updatedProduct = await Products.findOneAndUpdate(
        { _id: id },
        { title, description, price , image , color , size},
        { new: true } // This option returns the updated document
      );
  
      if (updatedProduct) {
        return new NextResponse("Product has been updated", {
          status: 200,
        });
      } else {
        return new NextResponse("Product not found", {
          status: 404,
        });
      }
    } catch (error) {
      return new NextResponse("Database error", { status: 500 });
    }
  };