import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div>
        <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 ">
            <div className="relative z-10 max-w-screen-xl px-4 pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
                <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto">
                    <h2 className="text-4xl font-bold sm:text-5xl">
                        Read a Good Story
                        <span className="hidden sm:block text-xl">
                            on AskTales
                        </span>
                    </h2>
                    <Link to='about' className="inline-flex text-white items-center px-6 py-3 font-medium bg-blue-500 rounded-lg hover:opacity-75" href="https://twitter.com/sahilnetic">
                        <ion-icon name="information-outline"></ion-icon>
                        &nbsp;  Learn More
                    </Link>
                </div>
            </div>
    
            <div className="absolute inset-0 w-full sm:my-8 sm:pt-0 pt-12 h-full ">
                <img className="w-96" 
                src='https://i.ibb.co/5BCcDYB/Remote2.png'
                alt='imagetest' />
            </div>
        </aside>
        <div className="grid place-items-center sm:mt-2">
            <img className="sm:w-96 w-48" src="https://img.freepik.com/free-vector/blogging-concept-illustration_114360-1038.jpg?w=740&t=st=1679015844~exp=1679016444~hmac=01927f12494755a7dc433fd2242be4136fc96931147cda4a4118c8b0cbca3293" alt='imagetest'  />
        </div>
    
        <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium tracking-widest">Stories</h1>

    </div>
  )
}

export default Landing