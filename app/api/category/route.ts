import Category from "@/models/Category";
import connectMongo from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request : NextRequest) => {
    try {
          const {name} = await request.json();
          await connectMongo();
          await Category.create({name})
          return NextResponse.json({message : 'Category created successfully ... ' })
      } catch (error) {
          return NextResponse.json({message : "error : " + error})
      }
  
  }

  export const GET = async () => {
    try {
        await connectMongo()
        const categories = await Category.find()
        return new NextResponse(JSON.stringify(categories) , {status : 200} )
    } catch (error) {
        return new NextResponse('database error' , {status : 500} )
    }
}

export const DELETE =  async (req : NextRequest) => {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongo();
    await Category.findByIdAndDelete(id);
    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
  }