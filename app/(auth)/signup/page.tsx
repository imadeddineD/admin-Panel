"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {useForm} from 'react-hook-form'
import { useRouter } from "next/navigation"
 
import { Button  } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel, 
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"

// this is the schema of our form it gives you informations about each item of your form as : type "string for example" ,
// min | max caracter "number of caracters required in each item and if there is an exeeded or a weakness"  
const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters .",
    }),
    email: z.string().min(5, {
      message: "Invalid email .",
    }),
    password: z.string().min(6, {
      message: "Passsword must be at least 6 caracter .",
    }),
    confirmPassword: z.string().min(6, {
      message: "Confirmation of password don't match .",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password do not match',
  });

const signup = () => {
    const router = useRouter() // to make the 'push' or 'refresh' methods when the logic ends "onSubmit function for example"
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          email : "" , 
          password : "" , 
          confirmPassword : ""
        },
      })

    async function onSubmit(values: z.infer<typeof formSchema>   , e :any ) {
        e.preventDefault() // // Prevent : the default form submission behavior | page Reload
        const username = values.username 
        const  email = values.email 
        const  password  =  values.password
        try {
        const res = await fetch('/api/user/signup' , 
        {
            method : 'POST' ,  
            headers : {'Content-type' : 'application/json'} , 
            body : JSON.stringify({userName : username , email , password})
        })
        const response = await res.json()
        console.log(response)
        router.refresh()
        if(res.ok) router.push('/login')
    } catch (error) {
        console.log('error on fetching the data ')
    }
    
      }
    
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="username" // this should be identical to the property of the defaultvalues of our form
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="Your Name ..." {...field}  />
            </FormControl>
            <FormDescription>
              This is your public display name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="example@email.com" {...field} />
            </FormControl>
            <FormDescription>
            Enter Your Email Here.
            </FormDescription>
            <FormMessage />
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
              <Input placeholder="complex password" type="password" {...field} />
            </FormControl>
            <FormDescription>
            Passsword must be at least 6 caracters .
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input placeholder="confirm pw" type="password" {...field} />
            </FormControl>
            <FormDescription>
              This is password confirm.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button  type="submit">Sign Up</Button>
    </form>
    <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
        or
      </div>
      <p className='text-center text-sm text-gray-600 mt-2'>
        If you have an account, please&nbsp;
        <Link className='text-[#731963] font-bold hover:underline' href='/login'>
          Log In
        </Link>
      </p>
  </Form>
  )
}

export default signup