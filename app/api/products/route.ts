import Products from "@/models/Products";
import connectMongo from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request : NextRequest) => {
  try {
        const { title, description, price , category , image  , color , size} = await request.json();
        await connectMongo();
        await Products.create({ title, description, price , category , image , color , size })
        return NextResponse.json({message : 'Product created successfully ... ' })
    } catch (error) {
        return NextResponse.json({message : "error : " + error})
    }

}

export const GET = async () => {
    try {
        await connectMongo()
        const posts = await Products.find()
        return new NextResponse(JSON.stringify(posts) , {status : 200} )
    } catch (error) {
        return new NextResponse('database error' , {status : 500} )
    }
}

export const DELETE =  async (req : NextRequest) => {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongo();
    await Products.findByIdAndDelete(id);
    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
  }