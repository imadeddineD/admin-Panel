import Navbar from '@/components/Navbar'
import Auth from '@/components/Provider'
import Nav from '@/components/Sidbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return ( 
    <Auth>
        <div className=' min-h-screen flex flex-col ' >
        <Navbar/>
        <div className=' h-screen mx-auto xl:w-[1200px] w-[90%] flex gap-1'>
            <Nav/>
            <div className='flex-grow'>
                {children}
            </div>
            </div>
        </div>
    </Auth>
      

  )
}