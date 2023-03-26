import {useContext} from 'react'

import Landing from '../layouts/Landing';
import Stories from '../components/Stories';

import AuthContext from '../context/AuthContext'

import {FETCH_USER_QUERY} from '../graphql/users'
import { useQuery } from '@apollo/client'

function Home() {

  const {user} = useContext(AuthContext)

  const usrId = user?.id

  const {data, error} = useQuery(FETCH_USER_QUERY,{
      variables: {
          userId: usrId
      }
  })

  const usr = data?.getUser

  return (
    <div className=''>
      <Landing />
    <div className='md:px-24 px-6 mt-4'>
    
      <div className='w-full'>
        <Stories usr={usr} />
      </div>
      
    </div>
    </div>
  )
}

export default Home