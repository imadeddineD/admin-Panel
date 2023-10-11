
import connectMongo from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import Color from "@/models/Color";

export const POST = async (request : NextRequest) => {
    try {
          const {name , value} = await request.json();
          await connectMongo();
          await Color.create({name , value})
          return NextResponse.json({message : 'Color created successfully ... ' })
      } catch (error) {
          return NextResponse.json({message : "error : " + error})
      }
  
  }

  export const GET = async () => {
    try {
        await connectMongo()
        const color = await Color.find()
        return new NextResponse(JSON.stringify(color) , {status : 200} )
    } catch (error) {
        return new NextResponse('database error' , {status : 500} )
    }
}

export const DELETE =  async (req : NextRequest) => {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongo();
    await Color.findByIdAndDelete(id);
    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
  }