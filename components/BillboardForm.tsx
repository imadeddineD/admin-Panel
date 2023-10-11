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
import ImageUpload from "@/components/UploadImage"
import { Select , SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem, } from "@/components/ui/select"

  const formSchema = z.object({
    label: z.string().min(6, {
      message: "Label must be at least 6 characters .",
    }),
    image: z.string().min(1),
    category:z.string().min(1),
  })

  interface Category {
    _id: string;
    name: string;
    // Add any other properties as needed
  }

  interface AddNewProductProps {
    categories: Category[];
  }

const BillboardForm : React.FC<AddNewProductProps> = ({categories}) => {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          label: "",
          image : "" , 
          category : "" ,
        },
      })

      

      async function onSubmit(values: z.infer<typeof formSchema>   , e :any ) {
        e.preventDefault() // // Prevent : the default form submission behavior | page Reload
        const label = values.label 
        const  image  =  values.image
        const category = values.category
         
        try {
        const res = await fetch('/api/billboard' , 
        {
            method : 'POST' ,  
            headers : {'Content-type' : 'application/json'} , 
            body : JSON.stringify({label , image ,category})
        })
        const response = await res.json()
        console.log(response)
        router.refresh()
        router.push(`/billboard?success=Billboardt has been created`);
    } catch (error) {
        console.log('error on fetching the data ')
    } }
      
  return (
    <Form {...form}>
      <p className=" font-bold text-3xl w-4/5 mx-auto mt-6">Add New Billboard</p>
    <form onSubmit={form.handleSubmit(onSubmit)} className=" w-4/5 mx-auto mt-8">
    <FormField
    control={form.control}
    name="category"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Category</FormLabel>
        <Select  onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
        <FormControl>
            <SelectTrigger>
              <SelectValue defaultValue={field.value} placeholder="Select a category" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {categories.map((category : any) => (
              <SelectItem key={category._id} value={category.name}>{category.name}</SelectItem>
            ))}
          </SelectContent>
      </Select>
        <FormMessage />
      </FormItem>
    )}/>
      <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background image</FormLabel>
                  <FormControl>
                    <ImageUpload 
                      value={field.value ? [field.value] : []} 
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange('')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
        />
        <FormField
        control={form.control}
        name="label" // this should be identical to the property of the defaultvalues of our form
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Your Label ..." {...field}  />
            </FormControl>
            <FormDescription>
              This is your public display billboard label.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button  type="submit">Add Billboard</Button>
    </form>
    </Form>
    )
}

export default BillboardForm