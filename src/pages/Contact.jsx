import React from 'react'

function Contact() {
  return (
    <div className=''>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl tracking-wider font-bold mb-8 underline underline-offset-8">Contact Us</h1>
        <div className="flex flex-col md:flex-row justify-center md:space-x-16 space-y-8 md:space-y-0">
          <div className="flex flex-col items-center">
            <i className='mb-4'>
              <ion-icon name="school" size='large' ></ion-icon>
            </i>
            <p className="text-lg font-medium text-gray-600">Robert Gordon University </p>
          </div>
          <div className="flex flex-col items-center">
            <i className='mb-4'>
              <ion-icon name="location" size='large'></ion-icon>
            </i>
            <p className="text-lg font-medium text-gray-600">AB10 7QB, Garthdee road, Aberdeen Scotland</p>
          </div>
          <div className="flex flex-col items-center">
            <i className='mb-4'>
              <ion-icon name="call" size='large'></ion-icon>
            </i>
            <p className="text-lg font-medium text-gray-600">07771064803</p>
          </div>
          <div className="flex flex-col items-center">
            <i className='mb-4'>
              <ion-icon name="mail" size='large' ></ion-icon>
            </i>
            <p className="text-lg font-medium text-gray-600">r.muhammed@rgu.ac.uk</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Contact