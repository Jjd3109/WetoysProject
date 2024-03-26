/*
  This example requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Navigate } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const navigation = {
    categories: [
        {
            id: 'women',
            name: 'Project',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'Basic Tees',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
            ],
            sections: [
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        { name: 'Tops', href: '#' },
                        { name: 'Dresses', href: '#' },
                        { name: 'Pants', href: '#' },
                        { name: 'Denim', href: '#' },
                        { name: 'Sweaters', href: '#' },
                        { name: 'T-Shirts', href: '#' },
                        { name: 'Jackets', href: '#' },
                        { name: 'Activewear', href: '#' },
                        { name: 'Browse All', href: '#' },
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        { name: 'Watches', href: '#' },
                        { name: 'Wallets', href: '#' },
                        { name: 'Bags', href: '#' },
                        { name: 'Sunglasses', href: '#' },
                        { name: 'Hats', href: '#' },
                        { name: 'Belts', href: '#' },
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        { name: 'Full Nelson', href: '#' },
                        { name: 'My Way', href: '#' },
                        { name: 'Re-Arranged', href: '#' },
                        { name: 'Counterfeit', href: '#' },
                        { name: 'Significant Other', href: '#' },
                    ],
                },
            ],
        },
       
    ],
    pages: [
        { name: 'Q&A', href: '/QnA' },
        { name: 'Project', href: '/project' },
    ],
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const [open, setOpen] = useState(false)

    function Logout(){
        localStorage.clear();
        document.location.href = '/project';
        
    }

    return (
        <div className="bg-white" >

            <header className="relative bg-white z-50" style={{ position: "fixed", top: "0", left: "0", right: "0" }}>
    
                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200">
                        <div className="flex h-16 items-center">
                            <button
                                type="button"
                                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                                onClick={() => setOpen(true)}
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>

                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0">
                                <a href="#">
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                        alt=""
                                    />
                                </a>
                            </div>

                            {/* Flyout menus */}
                            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                                <div className="flex h-full space-x-8">
                                    {navigation.categories.map((category) => (
                                        <Popover key={category.name} className="flex">
                                            {({ open }) => (
                                                <>
                                                    <div className="relative flex">
                                                        <Popover.Button
                                                            className={classNames(
                                                                open
                                                                    ? 'border-indigo-600 text-indigo-600'
                                                                    : 'border-transparent text-gray-700 hover:text-gray-800',
                                                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                                            )}
                                                        >
                                                            {category.name}
                                                        </Popover.Button>
                                                    </div>

                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-200"
                                                        enterFrom="opacity-0"
                                                        enterTo="opacity-100"
                                                        leave="transition ease-in duration-150"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                            <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                                            <div className="relative bg-white">
                                                                <div className="mx-auto max-w-7xl px-8">
                                                                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                                                        <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                                                            {category.featured.map((item) => (
                                                                                <div key={item.name} className="group relative text-base sm:text-sm">
                                                                                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                                                        <img
                                                                                            src={item.imageSrc}
                                                                                            alt={item.imageAlt}
                                                                                            className="object-cover object-center"
                                                                                        />
                                                                                    </div>
                                                                                    <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                                                                        <span className="absolute inset-0 z-10" aria-hidden="true" />
                                                                                        {item.name}
                                                                                    </a>
                                                                                    <p aria-hidden="true" className="mt-1">
                                                                                        Shop now
                                                                                    </p>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                        <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                                                            {category.sections.map((section) => (
                                                                                <div key={section.name}>
                                                                                    <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                                                                        {section.name}
                                                                                    </p>
                                                                                    <ul
                                                                                        role="list"
                                                                                        aria-labelledby={`${section.name}-heading`}
                                                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                                    >
                                                                                        {section.items.map((item) => (
                                                                                            <li key={item.name} className="flex">
                                                                                                <a href={item.href} className="hover:text-gray-800">
                                                                                                    {item.name}
                                                                                                </a>
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Popover.Panel>
                                                    </Transition>
                                                </>
                                            )}
                                        </Popover>
                                    ))}

                                    {navigation.pages.map((page) => (
                                        <a
                                            key={page.name}
                                            href={page.href}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                        >
                                            {page.name}
                                        </a>
                                    ))}
                                </div>
                            </Popover.Group>
                            
                            <div className="ml-auto flex items-center">

                                {
                                    localStorage.getItem("accessToken") === null &&  
                                    
                                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    <a href="/Login" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                       Login
                                    </a>
                                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                     </div>
                                }

                                {/* 로그아웃 및 글작성 */}
                                {
                                    localStorage.getItem("accessToken") !== null &&  
                                    
                                
                                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">

                                    
                                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    <button onClick={() => Logout()} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                       Logout
                                    </button>
                                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                     </div>
                                    <a href="/itemcreate" className="ml-5 text-sm font-medium text-gray-700 hover:text-gray-800">
                                       made
                                    </a>
                                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                    <a href="/userinfo" className="ml-5 text-sm font-medium text-gray-700 hover:text-gray-800">
                                       info
                                    </a>
                                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />

                                    </div>
                                }
                               



                                {/* Search */}
                                <div className="flex lg:ml-6">
                                    <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Search</span>
                                        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                    </a>
                                </div>


                              

                            
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}