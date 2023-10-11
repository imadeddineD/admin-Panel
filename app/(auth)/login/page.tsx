"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {useForm} from 'react-hook-form'
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    email: z.string().min(5, {
      message: "Invalid email .",
    }),
    password: z.string().min(6, {
      message: "Passsword must be at least 6 caracter .",
    })
  })

const loginPage = () => {
  const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email : "" , 
          password : "" , 
        },
      })

    const onSubmit = async (values: z.infer<typeof formSchema> ) => {
        const signInData = await signIn('credentials' , {
            email : values.email , 
            password : values.password ,
            redirect: false 
        })

        if (signInData?.error) {
          console.log(signInData.error)
        }else {
          router.refresh()
          router.push('/')
        }
        
      }
  return ( 
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="examle@email.com" {...field} />
            </FormControl>
            <FormDescription>
              Enter Your Email Here.
            </FormDescription>
            
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input placeholder="complex pw" type="password" {...field} />
            </FormControl>
            <FormDescription>
            Passsword must be at least 6 caracters .
            </FormDescription>
            
          </FormItem>
        )}
      />
      <Button type="submit">Log In</Button>
    </form>
    <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>
      <p className='text-center text-sm text-gray-600 mt-2'>
        If you don&apos;t have an account, please&nbsp;
        <Link className='text-[#731963] font-bold hover:underline' href='/signup'>
          Sign up
        </Link>
      </p>
  </Form>
  )
}

export default loginPage