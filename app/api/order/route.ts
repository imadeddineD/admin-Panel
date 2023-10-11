
import connectMongo from "@/lib/mongoDB";
import {  NextResponse } from "next/server";
import Order from "@/models/Order";


export const GET = async () => {
    try {
        await connectMongo()
        const order = await Order.find()
        return new NextResponse(JSON.stringify(order) , {status : 200} )
    } catch (error) {
        return new NextResponse('database error' , {status : 500} )
    }
}