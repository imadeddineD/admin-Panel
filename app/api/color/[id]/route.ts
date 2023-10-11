import Color from "@/models/Color";
import connectMongo from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req : NextRequest , {params} : any) => {
  try {
      const {id} = params
      await connectMongo()
      const color = await Color.findById(id)
      return new NextResponse(JSON.stringify(color) , {status : 200} )
  } catch (error) {
      return new NextResponse('database error' , {status : 500} )
  }
}

export const PUT = async (req : NextRequest, { params } : any) => {
    try {
      const { name , value } = await req.json(); // Use req.body to access request data
      const { id } = params;
      await connectMongo();
  
      // Update the product and get the updated document
      const updatedProduct = await Color.findOneAndUpdate(
        { _id: id },
        { name , value },
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