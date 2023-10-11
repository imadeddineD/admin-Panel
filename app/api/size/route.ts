
import connectMongo from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import Size from "@/models/Size";

export const POST = async (request : NextRequest) => {
    try {
          const {name } = await request.json();
          await connectMongo();
          await Size.create({name })
          return NextResponse.json({message : 'Size created successfully ... ' })
      } catch (error) {
          return NextResponse.json({message : "error : " + error})
      }
  
  }

  export const GET = async () => {
    try {
        await connectMongo()
        const size = await Size.find()
        return new NextResponse(JSON.stringify(size) , {status : 200} )
    } catch (error) {
        return new NextResponse('database error' , {status : 500} )
    }
}

export const DELETE =  async (req : NextRequest) => {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongo();
    await Size.findByIdAndDelete(id);
    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
  }