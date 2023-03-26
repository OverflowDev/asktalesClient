import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div>
        <div className="">
            <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
                <div className="overflow-hidden sm:rounded-lg pb-8">
                    <div className="text-center pt-8">
                        <h1 className="text-9xl font-bold text-blue-400">404</h1>
                        <h1 className="text-6xl font-medium py-8">oops! Page not found</h1>
                        <p className="text-2xl pb-8 px-12 font-medium">Oops! The page you are looking for does not exist. It might have been moved or deleted.</p>
                        <Link to='/' className="bg-blue-700 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md mr-6">
                            HOME
                        </Link>
                        <Link to='/contact' className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-md">
                            CONTACT US
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NotFound