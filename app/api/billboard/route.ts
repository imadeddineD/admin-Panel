import Billboard from "@/models/Billboard";
import connectMongo from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request : NextRequest) => {
    try {
          const {label , image , category} = await request.json();
          await connectMongo();
          await Billboard.create({label , image , category} )
          return NextResponse.json({message : 'Billboard created successfully ... ' })
      } catch (error) {
          return NextResponse.json({message : "error : " + error})
      }
  
  }

  export const GET = async () => {
    try {
        await connectMongo()
        const billboard = await Billboard.find()
        return new NextResponse(JSON.stringify(billboard) , {status : 200} )
    } catch (error) {
        return new NextResponse('database error' , {status : 500} )
    }
}

export const DELETE =  async (req : NextRequest) => {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongo();
    await Billboard.findByIdAndDelete(id);
    return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
  }