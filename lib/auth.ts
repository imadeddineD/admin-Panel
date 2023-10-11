import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import connectMongo from "./mongoDB";
import User from "@/models/Admin";
import bcrypt from 'bcryptjs'

const adminEmail = ["abc@abc.com"]

export const authOptions : NextAuthOptions = {
    // adapter : MongoDBAdapter(connectMongo) , 
    session : {
        strategy : 'jwt'
    } , 
    secret : process.env.NEXTAUTH_SECRET , 
    pages : {
        signIn : "/login" , 
        error : '/login'
    } , 
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "email", placeholder: "example@mail.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            if(!credentials?.email || !credentials?.password) return null 

            const user = await User.findOne({
                email: credentials.email,
              });
            if(!user) {
                return null 
            }
            const isPasswordCorrect = await bcrypt.compare(
                credentials.password,
                user.password
              );
              if (isPasswordCorrect) {
                return user;
              } else {
                throw new Error("Wrong Credentials!");
              }
          }
        })
      ] , 
      callbacks : {
        async jwt({ token, user}) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (user) {
              return {
                ...token , 
                username : user.userName ,
                email : user.email
              }
            }
            return token 
          } , 
          async session({ session, token }) : Promise<any> {
            // Send properties to the client, like an access_token and user id from a provider.
            if (session?.user?.email) {

              if (adminEmail.includes(session.user.email))
              {
                return {
                  ...session , 
                  user : {
                      ...session.user , 
                      username : token.username
                  }
              }
              } 
            }
            else {
              return false 
            }
            
          }
      }
}