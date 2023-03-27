import React from 'react'
import Users from './admin/Users'
import Posts from './admin/Posts'

function Dashboard() {
  return (
    <div className='mt-12'>
      <h1 className='text-semibold tracking-wider text-3xl'>Users</h1>
      <Users />
      <div className='mt-8'>
        <h1 className='text-semibold tracking-wider text-3xl'>Posts</h1>
        <Posts />
      </div>
    </div>
  )
}

export default Dashboard