'use client'

import Image from 'next/image'
import Link from 'next/link'
import React  , {useState} from 'react'
import orders from '../public/assets/order.png'
import billboard from '../public/assets/billboard.png'
import products from '../public/assets/products.png'
import dashboard from '../public/assets/dashboard.png'
import categories from '../public/assets/categ.png' 



const Nav = () => {
    const inactiveLink = 'flex gap-1 p-2 pr-4 duration-100 hover:text-[#731963] text-[#0b3c49]'
    const activeLink =inactiveLink + 'h bg-slate-200 rounded-l-lg text-[#731963] font-bold'

    // Use state to manage the active link
    const [activeNavItem, setActiveNavItem] = useState('');

    // Function to handle the click on a navigation item
    const handleNavItemClick = (navItem : any) => {
        setActiveNavItem(navItem);
    };
  return (
    <aside className=' h-full w-[200px] p-4 pr-0'>
        <nav className='flex flex-col gap-6'>
            <Link href={'/dashboard'} 
            className={activeNavItem === 'dashboard' ? activeLink : inactiveLink}
            onClick={() => handleNavItemClick('dashboard')}
            >
                <Image 
                src={dashboard}
                width={22}
                height={22}
                alt="dashboard" />
                <span className=' leading-[22px]'>Dashboard</span>
            </Link>
            <Link href={'/products'}             
            className={activeNavItem === 'products' ? activeLink : inactiveLink}
            onClick={() => handleNavItemClick('products')}>
            <Image 
             src={products}
             width={22}
             height={22}
             alt="products" />
             <span className=' leading-[22px]'>Products</span>
            </Link>
            <Link href={'/categories'}             
            className={activeNavItem === 'categories' ? activeLink : inactiveLink}
            onClick={() => handleNavItemClick('categories')}>
            <Image 
             src={categories}
             width={22}
             height={22}
             alt="categories" />
             <span className=' leading-[22px]'>Categories</span>
            </Link>
            <Link href={'/order'}             
            className={activeNavItem === 'order' ? activeLink : inactiveLink}
            onClick={() => handleNavItemClick('order')}>
            <Image 
             src={orders}
             width={22}
             height={22}
             alt="orders" />
             <span className=' leading-[22px]'>Orders</span>
            </Link>
            <Link href={'/billboard'}             
            className={activeNavItem === 'billboard' ? activeLink : inactiveLink}
            onClick={() => handleNavItemClick('billboard')}>
            <Image 
             src={billboard}
             width={22}
             height={22}
             alt="billboard" />
             <span className=' leading-[22px]'>Billboard</span>
            </Link>
        </nav>
    </aside>
  )
}

export default Nav