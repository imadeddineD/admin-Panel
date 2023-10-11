"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {motion} from 'framer-motion'

export default function Home() {
  const session = useSession();
  const router = useRouter();
  if (session.status === "loading") {
    return <p className='min-h-screen bg-slate-100 flex-grow p-10 mt-2 mr-2 mb-2 rounded-[5px] text-[#222]'>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/login");
  } 
  const typingContainer = {
    hidden: { opacity: 0},
    show: { 
      opacity: 1,
      transition:{
        staggerChildren: 0.14,
      }}
  }
  const typingText = {
    hidden: { opacity: 0, y:"-20px"},
    show: { 
      opacity: 1, 
      y:"0",
      transition:{
        ease:'easeInOut',
      }
    }
  }
  const explainProduct = {
    hidden: { opacity: 0, y:"-20px"},
    show: { 
      opacity: 1, 
      y:"0", 
      transition:{
        delay:2.2,
        ease:"easeInOut"
      }
    }
  }
  const typingContain = {
    hidden: { opacity: 0},
    show: { 
      opacity: 1,
      transition:{
        staggerChildren: 0.14,
        delay:3
      }}
  }
  const typingTxt = {
    hidden: { opacity: 0, y:"-20px"},
    show: { 
      opacity: 1, 
      y:"0",
      transition:{
        ease:'easeInOut',
        delay:3
      }
    }
  }
  return (
    <div className=" h-full m-auto w-4/5 flex flex-col justify-center items-center ">
      <motion.h1 className=' text-[#0b3c49] text-5xl font-bold mb-6' variants={typingContainer} initial="hidden" animate="show">
            {
              Array.from("Welcome To Your Admin Panel").map((word,i) => (
              <motion.span key={i} variants={typingText}>{word}</motion.span>
              ))
            }
        </motion.h1>
        <div className=' text-[#307486] text-xl font-bold mb-6'>
            <motion.p variants={explainProduct} initial="hidden" animate="show">
              Here you can create  , update , edit and remove : products , category and billboard ... and also you can see all your order and other diffrent stuff 
            </motion.p>
            
          </div>
          <motion.p className='text-center text-[#0d2025] text-2xl font-bold mb-6' variants={typingContain} initial="hidden" animate="show">
            {
              Array.from("ENJOY YOUR BUSSINESS").map((word,i) => (
              <motion.span key={i} variants={typingTxt}>{word}</motion.span>
              ))
            }
        </motion.p>
    </div>
  )
}
