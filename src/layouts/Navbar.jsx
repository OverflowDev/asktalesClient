import {useState, useContext} from 'react'
import { Link } from 'react-router-dom'

import { toast } from 'react-hot-toast'

import AuthContext from '../context/AuthContext'

import {FETCH_USER_QUERY} from '../graphql/users'
import { useQuery } from '@apollo/client'


function Navbar() {

    const [open, setOpen] = useState(false)
    const closeMenu = () => setOpen(false)

    const {user, logout} = useContext(AuthContext)

    const usrId = user?.id

    const {data, error} = useQuery(FETCH_USER_QUERY,{
        variables: {
            userId: usrId
        }
    })
  
    const usr = data?.getUser

    const handleLogout = () => {
        logout();
        toast.success("Logged out successfully!");
    }

  return (
    <div className=''>
        <nav className="bg-blue-100 py-2 ">
            <div className="md:px-14 px-4 flex items-center justify-between text-sm ">
                
                {/*  Menu  */}
                <div className='z-50 lg:w-auto w-full flex items-center justify-between '>
                    <Link to='/' onClick={closeMenu}>
                        <div className='flex items-center'>
                            
                            <img src='data:image/png;base64,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' alt="Logo" className='bg-cover h-12' />
                            {/* <img src={Ask} alt="Logo" className='bg-cover h-12' />
                            <img src={Tales} alt="Logo" className='bg-cover h-12 ' /> */}
                            {/* <h2 className='tracking-wider text-md font-bold'>AskTales</h2> */}
                        </div>
                    </Link>
                    <div className='flex items-center space-x-2 lg:hidden'>
                        <div className='text-3xl px-1 rounded-md flex' onClick={() => setOpen(!open)}>
                            <ion-icon name={`${open ? 'close-outline' : 'grid-outline'}`}></ion-icon>
                        </div>
                    </div>
                </div>

                {/* Large screen  */}
                <ul className='lg:flex py-2 text-lg hidden items-center gap-8'>
                    <Link to='/' className='inline-block uppercase font-semibold tracking-wide hover:text-blue-800'>
                        Home
                    </Link>
                    <Link to='story' className='inline-block uppercase font-semibold tracking-wide hover:text-blue-800'>
                        Stories
                    </Link>
                    <Link to='about' className='inline-block uppercase font-semibold tracking-wide hover:text-blue-800'>
                        About Us
                    </Link>
                    <Link to='contact' className='inline-block uppercase font-semibold tracking-wide hover:text-blue-800'>
                        Contact Us
                    </Link>
                    {!(usr?.isAdmin) ? (
                            <div></div>
                        ) : (
                            <Link to='dashboard' className='inline-block uppercase font-semibold tracking-wider' onClick={closeMenu}>
                                Dashboard
                            </Link>
                    )}
                </ul>

                {!user ? (
                    <ul className='lg:flex hidden uppercase items-center space-x-4'>
                        {/* auth  */}
                        <Link to='/login' className='py-2 flex items-center rounded-md px-4 bg-blue-200 hover:bg-blue-400 shadow-inner'>
                            <h1 className='tracking-wider font-semibold'>LOGIN</h1>
                        </Link>
                        <Link to='/register' className='py-2 flex items-center px-4 rounded-md text-white bg-blue-600 hover:text-black hover:bg-gray-200 shadow-inner'>
                            <h1 className='tracking-wider font-semibold'>REGISTER</h1>
                        </Link>
                    </ul>
                ) : (
                    <ul className='lg:flex hidden uppercase items-center space-x-4'>
                        {/* auth  */}
                        {/* <div className='py-2 flex items-center justify-center h-12 w-12 rounded-full border-2 px-4 bg-blue-300'> */}
                            <Link to='profile'>
                                {/* <h1 className='tracking-wider font-semibold'>{user.username}</h1> */}
                                <img src="https://www.pngkey.com/png/full/72-729716_user-avatar-png-graphic-free-download-icon.png" className="h-10 w-10 rounded-full mr-2 object-cover" alt='img' />
                            </Link>
                        {/* </div> */}
                        <button 
                            onClick={handleLogout}
                            className='py-2 px-3 flex items-center rounded-md text-white bg-red-500 hover:text-black hover:bg-red-200 shadow-inner'>
                            <ion-icon name="log-out-outline"></ion-icon>
                        </button>
                    </ul>
                )}
                {/* Large screen ends */}

                {/* Mobile Menu  */}
                <ul className={`
                dark:text-white text-dark lg:hidden dark:bg-dark bg-white absolute bottom-0 w-full h-screen py-24 px-12
                    delay-100 duration-500 z-30 ${open ? 'left-0' : 'left-[-100%]'}
                `}>
                    <div className='flex py-4 flex-col'>
                        <Link to='contact' className='py-3 text-center px-3 text-2xl uppercase font-semibold' onClick={closeMenu}>
                            Contact Us
                        </Link>
                        <Link to='about' className='py-3 text-center px-3 text-2xl uppercase font-semibold' onClick={closeMenu}>
                            About Us
                        </Link>
                        <Link to='profile' className='py-3 text-center px-3 text-2xl uppercase font-semibold' onClick={closeMenu}>
                            Profile
                        </Link>
                        {/* <Link to='story' className='py-3 text-center px-3 text-2xl uppercase font-semibold' onClick={closeMenu}>
                            Stories
                        </Link> */}
                        {!(usr?.isAdmin) ? (
                            <div></div>
                        ) : (
                            <Link to='dashboard' className='py-3 text-center px-3 text-2xl uppercase font-semibold border' onClick={closeMenu}>
                                Dashboard
                            </Link>
                        )}
                    </div>
                
                    <li className='flex items-center space-x-3 justify-center py-3' onClick={closeMenu}>
                        {!user ? (
                            <div className='space-y-4'>
                                <Link to='/login' className='py-2 flex items-center px-6 rounded-md bg-gray-200 hover:bg-gray-400 shadow-inner'>
                                    Log In
                                </Link>
                            
                                <Link to='/register' className='py-2 flex items-center px-6 border-2 rounded-md bg-gray-400 hover:bg-gray-400 shadow-inner'>
                                    Sign Up
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <h1 className='font-semibold uppercase tracking-widest'>{user.username}</h1>
                                <button 
                                    onClick={handleLogout}
                                    className='py-2 px-6 w-full flex items-center rounded-md text-white bg-red-300 hover:text-black hover:bg-gray-200 shadow-inner'>
                                    Log Out
                                </button>
                            </div>
                        )}
                    </li>
                    
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar