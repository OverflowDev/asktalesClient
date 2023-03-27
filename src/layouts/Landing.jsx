import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    // <div>
    //     <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 ">
    //         <div className="relative z-10 max-w-screen-xl px-4 pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
    //             <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto">
    //                 <h2 className="text-4xl font-bold sm:text-5xl">
    //                     Read a Good Story
    //                     <span className="hidden sm:block text-xl">
    //                         on AskTales
    //                     </span>
    //                 </h2>
    //                 <Link to='about' className="inline-flex text-white items-center px-6 py-3 font-medium bg-blue-500 rounded-lg hover:opacity-75" href="https://twitter.com/sahilnetic">
    //                     <ion-icon name="information-outline"></ion-icon>
    //                     &nbsp;  Learn More
    //                 </Link>
    //             </div>
    //         </div>
    
    //         <div className="absolute inset-0 w-full sm:my-8 sm:pt-0 pt-12 h-full ">
    //             <img className="w-96" 
    //             src='https://i.ibb.co/5BCcDYB/Remote2.png'
    //             alt='imagetest' />
    //         </div>
    //     </aside>
    //     <div className="grid place-items-center sm:mt-2">
    //         <img className="sm:w-96 w-48" src="https://img.freepik.com/free-vector/blogging-concept-illustration_114360-1038.jpg?w=740&t=st=1679015844~exp=1679016444~hmac=01927f12494755a7dc433fd2242be4136fc96931147cda4a4118c8b0cbca3293" alt='imagetest'  />
    //     </div>
    
    //     <h1 className="text-center text-2xl sm:text-5xl py-10 font-medium tracking-widest">Stories</h1>

    // </div>
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-6xl w-full px-4">
        <h1 className="text-4xl font-bold text-center mb-8 uppercase underline underline-offset-4">Overview of Rome</h1>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="md:w-1/2 mb-4 md:mb-0">
            <img src='https://res.klook.com/image/upload/fl_lossy.progressive,q_85/w_1920,c_fill/cities/n6pfqvaabvory1mhoh3q.webp' alt="Rome" className="w-96 h-96 object-cover rounded-lg shadow-md" />
          </div>
          <div className="md:w-full md:ml-4">
            <p className="text-lg mb-4">
                As people commonly say, when you are in Rome, you behave like a Roman. This statement infers the degree of tourism
                in the city and the unquenching desire to visit for people considering a vacation. Rome
                (<span className="font-medium">41&deg;53'36&quot;N 12&deg;28'58&quot;E</span>) is the capital city of Italy having
                2,860,009 residents in 1,285 km<sup>2</sup> (496.1 sq mi), Rome is the country's most populated comune and the
                third most populous city in the European Union by population. Also, Rome as part of the Metropolitan City of Rome,
                has a population of 4,355,725 residents, and the Metropolitan City of Rome is the most populous metropolitan city
                in Italy. Rome is located in the central-western portion of the Italian Peninsula, within Lazio, along the shores
                of the Tiber. In 2019, Rome was the 14th most visited city in the world, with 8.6 million tourists, the third most
                visited city in the European Union, and the most popular tourist destination in Italy. Below are the spectacular
                locations to pay a visit to once you are in Rome and have a wide experience a touristic heritage, art, and culture
                of the Romans.
            </p>
            <Link to='story' className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-800">
                Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing