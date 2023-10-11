import connectMongo from "@/lib/mongoDB";
import User from "@/models/Admin";
import { NextRequest, NextResponse } from "next/server";
import {hash } from 'bcrypt'

export async function POST(req : NextRequest) {
    try {
        await connectMongo()
        const {userName , email , password } = await req.json()
        const existingEmail = await User.findOne({email }) ; 
    if(existingEmail) {
        return NextResponse.json({message : "the email that you provided is already exist "} , {status : 409})
    }
    const existingName = await User.findOne({userName}) ; 
    if(existingName) {
        return NextResponse.json({message : "the name that you provided is already exist "} , {status : 409})
    }
    const hashPassword = await hash(password , 10)
    await User.create({userName , email  , password : hashPassword})
    return NextResponse.json({message : 'user created successfully ... ' , data : {userName , email }})
    } catch (error) {
        return NextResponse.json({message : "error : " + error})
    }
}